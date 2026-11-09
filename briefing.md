# Briefing — Rota Motores

Projeto de Desenvolvimento de Aplicações Web do IFPB Campus Sousa. Tema 9 da lista da turma, Concessionária / Loja de Automóveis.

## 1. Negócio e levantamento

A Rota Motores é uma concessionária fictícia de seminovos ambientada em Sousa, PB. A referência de levantamento do PDF é o comércio Solânea Construção. O processo de identificar negócio, oferta, público e ações do visitante foi aplicado ao tema da turma.

| Informação | Decisão e origem |
| --- | --- |
| Tema | Veículos, cards, detalhes e financiamento. |
| Entregas adicionais | CRUD e inserção de imagens solicitados no pedido. |
| Identidade e mercado | Marca fictícia. Vitrine de seminovos voltada a quem compara carros antes da compra. |
| Materiais | PDF didático, imagem da lista de temas e ilustrações vetoriais criadas para a aplicação. |
| Informações comerciais | Modelos como referência e registros, preços, contatos e condições de exemplo. O contato usa um domínio reservado para exemplos. |

## 2. Identidade do négicio
- **Nome Comercial:** Rota Motores.
- **Segmento:** Loja de carros seminovos no modelo de financiamento.
- **Cidade:** Sousa, Paraiba
- **Início das atividades da matriz:** 10 de novembro de 2026
- **Situação Cadastral:** Ativa
- **Instagram:** @rotamotores

## 3. Público e problema

- **Visitante** que quer encontrar um carro dentro do seu orçamento e comparar características sem depender de uma conversa inicial.
- **Responsável pela demonstração** que precisa manter a vitrine atualizada e comprovar as quatro operações do CRUD em sala.
- **Necessidade** de reunir preço, imagem e ficha em uma experiência fácil de navegar e de mostrar o impacto da entrada e do prazo sobre o valor da parcela.

## 4. Objetivos e linguagem

O fluxo principal começa em **Explorar estoque**, passa por **Ver detalhes** e termina em **Simular este veículo**. O fluxo de gestão começa em **Novo veículo** e termina com a conferência do card no catálogo.

A proposta de valor é combinar filtro de estoque, ficha e simulação em uma experiência consistente. A comunicação usa frases curtas, rótulos em português do Brasil e avisos explícitos para valores e contatos fictícios. O projeto roda como Static Site e armazena as alterações e imagens no IndexedDB do navegador.

## 5. Critérios de aceitação

1. Navegar entre páginas independentes em computador e celular.
2. Cadastrar um veículo com foto e encontrá-lo no catálogo após recarregar.
3. Editar campos, manter, substituir ou remover a foto, e excluir com confirmação.
4. Abrir a ficha por ID e levar o veículo selecionado para o simulador.
5. Calcular uma estimativa com entrada, prazo, parcela e total, e avisar quando os valores forem inválidos.
6. Publicar a pasta `site/` pelo fluxo GitHub → Render demonstrado no PDF.
