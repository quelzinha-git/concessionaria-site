# Mapa do site — Rota Motores

As sete páginas são arquivos HTML independentes dentro de `site/`. O cabeçalho contém Início, Estoque, Financiamento, Sobre, Contato e Gestão. A ficha é alcançada a partir dos cards e dos links na gestão. O rodapé informa o caráter acadêmico e aponta para Sobre.

| Página | Função | Seções e dados | Ação esperada |
| --- | --- | --- | --- |
| `index.html` | Apresentar a loja fictícia | Apresentação, três veículos mais recentes, convite à simulação | Explorar estoque |
| `estoque.html` | Listar e filtrar o catálogo | Busca, categoria, ordenação, cards com foto, nome, ano, km, câmbio e preço | Ver detalhes |
| `veiculo.html?id=1` | Consultar um registro | Imagem, preço, ano, quilometragem, câmbio, combustível, cor, descrição e aviso quando ausente | Simular este veículo |
| `financiamento.html?id=1` | Calcular estimativa | Seleção do carro, preço, entrada, prazo, parcela e totais. O parâmetro é opcional | Calcular parcelas |
| `sobre.html` | Explicar a proposta acadêmica | Contexto, visitante, demonstração e dados de exemplo | Consultar estoque ou abrir painel |
| `contato.html` | Demonstrar atendimento | Localidade, horário e canal ilustrativos, prévia de mensagem sem envio | Visualizar mensagem |
| `admin.html` | Gerenciar o estoque local | Listagem, formulário de edição com upload e prévia, confirmação de exclusão | Cadastrar, consultar, editar ou excluir |

## Fluxos

- Início → Estoque → Ficha → Simulação com o veículo preenchido.
- Gestão → Novo veículo → Salvar → Ficha ou Estoque → Editar → Excluir.
- Sobre → Estoque ou Gestão. Contato → Estoque.

Componentes compartilhados incluem cabeçalho, rodapé, botões, links, cards, estados vazios, painéis e campos. O layout em duas ou três colunas passa para uma coluna em telas estreitas.
