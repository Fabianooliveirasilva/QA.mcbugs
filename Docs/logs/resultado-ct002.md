# CT002 - Jornada Completa: Pedido "Para levar"

## Status final

✅ PASSOU

## Objetivo

Validar o fluxo completo de um pedido do tipo "Para levar" desde a seleção inicial até a confirmação final do pagamento.

## Pré-condições verificadas

- Sistema acessível em http://localhost:8080
- App em funcionamento
- Banco Supabase conectado e acessível
- localStorage limpo antes da execução

## Execução dos passos

| Passo | Ação | Resultado | Evidência |
|---|---|---|---|
| 1 | Acessar URL raiz (/) | Passou | Página inicial carregada com as opções "Para comer aqui" e "Para levar" |
| 2 | Clicar em "Para levar" | Passou | `orderType` salvo como `takeaway` e redirecionamento para `/menu` |
| 3 | Verificar menu | Passou | Página do menu exibiu as categorias e produtos |
| 4 | Clicar na aba "Fritas" | Passou | Apenas itens da categoria fritas ficaram visíveis |
| 5 | Selecionar "Batatas Full Stack" | Passou | Redirecionamento para `/product/batatas-fullstack` |
| 6 | Verificar detalhes do produto | Passou | Nome, preço, descrição e ingredientes exibidos corretamente |
| 7 | Manter quantidade em 1 | Passou | Quantidade permaneceu em 1 |
| 8 | Adicionar produto ao carrinho | Passou | Item adicionado e retorno para `/menu` |
| 9 | Clicar na aba "Bebidas" | Passou | Apenas produtos da categoria bebidas ficaram visíveis |
| 10 | Selecionar "Fanta Warning" | Passou | Redirecionamento para `/product/fanta-warning` |
| 11 | Aumentar quantidade para 3 | Passou | Quantidade ajustada para 3 e total do produto calculado corretamente |
| 12 | Adicionar ao carrinho | Passou | Produto adicionado com quantidade 3 e retorno para `/menu` |
| 13 | Verificar barra de carrinho | Passou | Total exibido como R$ 28,60 com 4 itens no total |
| 14 | Clicar em "Ver pedido" | Passou | Redirecionamento para `/cart` |
| 15 | Verificar itens do carrinho | Passou | `Batatas Full Stack` e `Fanta Warning` aparecem com quantidades corretas |
| 16 | Finalizar pedido | Passou | Drawer aberto para inserir nome do cliente |
| 17 | Inserir "Maria Santos" | Passou | Nome preenchido corretamente |
| 18 | Clicar em "Finalizar" | Passou | Pedido criado no Supabase com status pending e redirecionamento para `/payment` |
| 19 | Verificar página de pagamento | Passou | Opções PIX, Cartão de Débito e Cartão de Crédito exibidas |
| 20 | Selecionar "Cartão de Crédito" | Passou | Redirecionamento para `/payment/credit/confirm` |
| 21 | Verificar confirmação | Passou | Pedido exibido com número, valor total, método e detalhes completos |
| 22 | Confirmar ausência de mensagem de aguardar | Passou | Mensagem de espera não apareceu para pedido `takeaway` |
| 23 | Validar registro no banco | Passou | Pedido salvo com dados corretos |
| 24 | Clicar em "Fazer Novo Pedido" | Passou | Volta para `/` e limpa o estado local |

## Evidências observadas

- A seleção de "Para levar" gerou `localStorage.mcbugs-order-type = "takeaway"`.
- O carrinho foi montado com:
  - `Batatas Full Stack` x 1
  - `Fanta Warning` x 3
- Total do pedido: R$ 28,60.
- Página de confirmação exibiu "Para levar" como tipo do pedido e não mostrou a mensagem de aguardar ser chamado.
- Validação no banco Supabase:
  - `customer_name`: "Maria Santos"
  - `order_type`: "takeaway"
  - `payment_method`: "credit"
  - `status`: "pending"
  - `total`: 28.6
  - `items`:
    - `Batatas Full Stack` x 1
    - `Fanta Warning` x 3
- Ao finalizar o fluxo, a aplicação voltou para a tela inicial e os dados locais foram limpos.

## Problemas encontrados

Nenhum problema funcional foi identificado no fluxo executado.

## Sugestões de melhoria

- Manter mensagens de feedback mais explícitas durante a criação do pedido e atualização do método de pagamento.
- Considerar reforçar a distinção visual entre pedidos `dine-in` e `takeaway` na tela de confirmação.

## Conclusão

O cenário CT002 foi executado com sucesso, cobrindo a jornada completa de pedido para retirada, incluindo navegação entre categorias, criação do pedido, confirmação de pagamento e limpeza do estado final.
