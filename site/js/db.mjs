/**
 * Camada de Persistência IndexedDB — Rota Motores
 * Armazena registros de veículos e imagens no navegador.
 */

import { FOTOS_PADRAO, VEICULOS_INICIAIS } from "../assets/dados.mjs";

const DB_NAME = "RotaMotoresDB";
const DB_VERSION = 1;
const STORE_NAME = "veiculos";

let dbInstance = null;

const FOTOS_PADRAO_ANTIGAS = new Map(
  Object.values(FOTOS_PADRAO).map(foto => [foto.replace(/\.jpg$/, ".svg"), foto])
);

function atualizarFotoPadrao(veiculo) {
  const foto = FOTOS_PADRAO_ANTIGAS.get(veiculo.imagemUrl);
  if (foto) veiculo.imagemUrl = foto;
  return veiculo;
}

/**
 * Abre a conexão com o banco de dados IndexedDB e inicializa o schema/seed se necessário
 */
export function abrirBanco() {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: false });
        store.createIndex("categoria", "categoria", { unique: false });
        store.createIndex("anoModelo", "anoModelo", { unique: false });
        store.createIndex("dataCadastro", "dataCadastro", { unique: false });
      }
    };

    request.onsuccess = async (event) => {
      dbInstance = event.target.result;
      try {
        await seedSeVazio(dbInstance);
        resolve(dbInstance);
      } catch (err) {
        console.error("Erro no seed inicial do banco:", err);
        resolve(dbInstance);
      }
    };

    request.onerror = (event) => {
      console.error("Erro ao abrir IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Preenche o banco com os 4 veículos padrão se estiver vazio
 */
function seedSeVazio(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const countReq = store.count();

    countReq.onsuccess = () => {
      if (countReq.result === 0) {
        const writeTx = db.transaction([STORE_NAME], "readwrite");
        const writeStore = writeTx.objectStore(STORE_NAME);
        VEICULOS_INICIAIS.forEach((item) => writeStore.put(item));
        writeTx.oncomplete = () => resolve();
        writeTx.onerror = (e) => reject(e.target.error);
      } else {
        resolve();
      }
    };

    countReq.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Retorna todos os veículos cadastrados no banco
 */
export async function listarVeiculos() {
  const db = await abrirBanco();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve((request.result || []).map(atualizarFotoPadrao));
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Retorna um veículo específico pelo ID numérico
 */
export async function obterVeiculoPorId(id) {
  const db = await abrirBanco();
  const idNum = Number(id);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(idNum);

    request.onsuccess = () => {
      resolve(request.result ? atualizarFotoPadrao(request.result) : null);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Cadastra ou atualiza um veículo
 */
export async function salvarVeiculo(dadosVeiculo) {
  const db = await abrirBanco();
  const todos = await listarVeiculos();

  let id = dadosVeiculo.id ? Number(dadosVeiculo.id) : null;
  if (!id) {
    // Gera novo ID sequencial
    const maxId = todos.reduce((max, v) => (v.id > max ? v.id : max), 0);
    id = maxId + 1;
  }

  const registro = {
    ...dadosVeiculo,
    id: id,
    preco: Number(dadosVeiculo.preco) || 0,
    km: Number(dadosVeiculo.km) || 0,
    anoModelo: Number(dadosVeiculo.anoModelo) || parseInt(dadosVeiculo.ano, 10) || new Date().getFullYear(),
    dataCadastro: dadosVeiculo.dataCadastro || new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(registro);

    request.onsuccess = () => {
      resolve(registro);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Exclui um veículo pelo ID
 */
export async function excluirVeiculo(id) {
  const db = await abrirBanco();
  const idNum = Number(id);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(idNum);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Restaura o catálogo para o padrão inicial
 */
export async function restaurarCatalogoPadrao() {
  const db = await abrirBanco();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const clearReq = store.clear();

    clearReq.onsuccess = () => {
      VEICULOS_INICIAIS.forEach((v) => store.put(v));
    };

    transaction.oncomplete = () => {
      resolve(true);
    };

    transaction.onerror = (e) => {
      reject(e.target.error);
    };
  });
}
