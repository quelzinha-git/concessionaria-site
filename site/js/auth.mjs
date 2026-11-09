/**
 * Módulo de Autenticação para a Gestão — Rota Motores
 * Credenciais requeridas: admin / admin123
 */

const STORAGE_KEY = "rota_motores_auth_session";
const USUARIO_VALIDO = "admin";
const SENHA_VALIDA = "admin123";

export function estaAutenticado() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const sessao = JSON.parse(raw);
    return sessao && sessao.autenticado === true && sessao.usuario === USUARIO_VALIDO;
  } catch {
    return false;
  }
}

export function fazerLogin(usuario, senha) {
  const userLimpo = (usuario || "").trim();
  const passLimpo = (senha || "").trim();

  if (userLimpo === USUARIO_VALIDO && passLimpo === SENHA_VALIDA) {
    const sessao = {
      autenticado: true,
      usuario: USUARIO_VALIDO,
      horaLogin: new Date().toISOString()
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessao));
    return { sucesso: true };
  }

  return { 
    sucesso: false, 
    erro: "Credenciais inválidas. Verifique o usuário e a senha." 
  };
}

export function fazerLogout() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function protegerRotaAdmin() {
  if (!estaAutenticado()) {
    const paginaAtual = window.location.pathname.split("/").pop() || "admin.html";
    window.location.href = `login.html?redirect=${encodeURIComponent(paginaAtual)}`;
  }
}

export function obterDadosSessao() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
