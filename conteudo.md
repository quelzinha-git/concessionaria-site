# Conteúdo — Rota Motores

A voz é direta e informativa. Títulos e descrições individuais estão no `<head>` de cada página. A interface usa a moeda brasileira, quilometragem em km e rótulos em português.

| Página | Título na interface | Mensagem e ação |
| --- | --- | --- |
| Início | Seu próximo carro começa aqui. | Encontre um carro para a sua rotina, compare os detalhes e veja como ele caberia no seu orçamento. Ações **Explorar estoque** e **Simular parcelas**. |
| Estoque | Encontre seu próximo carro | Use os filtros para explorar os veículos e abra a ficha do modelo que chamou sua atenção. Cards terminam com **Ver detalhes**. |
| Ficha | Nome do veículo | Preço e ficha técnica, seguidos da descrição. Ações **Voltar ao estoque** e **Simular este veículo**. |
| Financiamento | Simule seu financiamento | Escolha um veículo e compare prazos com taxa fictícia fixa de 1,49% ao mês. Ação **Calcular parcelas**. |
| Sobre | Uma vitrine para explorar | Rota Motores é uma concessionária fictícia criada como projeto acadêmico de Desenvolvimento de Aplicações Web. |
| Contato | Como podemos ajudar? | Experimente o atendimento da concessionária em uma demonstração local. Ação **Visualizar mensagem**. |
| Gestão | Gestão de estoque | Cadastre, edite e exclua veículos. Os registros e fotos ficam neste navegador. Ação **Novo veículo**. |

## Mensagens e dados de exemplo

- Sem resultados no filtro, **Nenhum veículo encontrado.**
- Ao abrir uma ficha excluída ou um link inválido, a interface orienta voltar ao estoque.
- No formulário, os formatos de foto aceitos são JPEG, PNG e WebP de até 5 MB.
- No simulador, **Simulação acadêmica. A estimativa não constitui proposta de crédito e não inclui tarifas, impostos ou seguros.**
- O simulador informa o saldo financiado mínimo fictício de R$ 100,00.
- No contato, a prévia fica na página. O endereço com domínio `.example` e o horário são ilustrativos.
- No rodapé, **Projeto acadêmico · Veículos e valores demonstrativos**.

O estoque inicial contém Toyota Corolla GLi, Jeep Renegade Sport, Fiat Argo Drive e Fiat Strada Endurance. Os registros iniciais estão em `site/assets/dados.mjs` e usam fotos ilustrativas licenciadas, com créditos na página Sobre. Os registros inseridos na gestão podem ter foto própria.
