# CT001 - Jornada Completa: Pedido "Para comer aqui"

## Status final

✅ PASSOU

## Objetivo

Validar o fluxo completo de um pedido do tipo "Para comer aqui" desde a seleção inicial até a confirmação final do pagamento.

## Pré-condições verificadas

- Sistema acessível em http://localhost:8080
- App em funcionamento
- Banco Supabase conectado e acessível
- localStorage limpo antes da execução

## Execução dos passos

| Passo | Ação | Resultado | Evidência |
|---|---|---|---|
| 1 | Acessar URL raiz (/) | Passou | Página inicial carregada com as opções "Para comer aqui" e "Para levar" |
| 2 | Clicar em "Para comer aqui" | Passou | orderType salvo como "dine-in" e redirecionamento para /menu |
| 3 | Verificar menu | Passou | Página do menu exibiu categorias e produtos |
| 4 | Clicar em Big Mock | Passou | Redirecionamento para /product/big-mock |
| 5 | Verificar detalhes | Passou | Nome, imagem, preço, descrição e ingredientes exibidos corretamente |
| 6 | Aumentar quantidade para 2 | Passou | Quantidade atualizada para 2 e valor total recalculado para R$ 79,80 |
| 7 | Clicar em "Quero • R$ 79,80" | Passou | Produto adicionado ao carrinho e retorno para /menu |
| 8 | Verificar barra do carrinho | Passou | Total e quantidade exibidos corretamente |
| 9 | Clicar em "Ver pedido" | Passou | Redirecionamento para /cart |
| 10 | Verificar itens do carrinho | Passou | Big Mock aparece com quantidade 2 e total correto |
| 11 | Clicar em "Finalizar pedido" | Passou | Drawer de finalização aberto com campo de nome |
| 12 | Inserir "João Silva" | Passou | Nome preenchido corretamente no campo |
| 13 | Clicar em "Finalizar" | Passou | Pedido criado no Supabase com status "pending" e redirecionamento para /payment |
| 14 | Escolher método PIX | Passou | Redirecionamento para /payment/pix/confirm |
| 15 | Verificar confirmação | Passou | Página exibiu número do pedido, total, método PIX e instruções |
| 16 | Verificar pedido no banco | Passou | Registro salvo com customer_name="João Silva", order_type="dine-in", payment_method="pix", status="pending" |
| 17 | Clicar em "Fazer Novo Pedido" | Passou | Volta para / e limpa estado local |

## Evidências observadas

- Menu principal acessado com sucesso e a escolha de "Para comer aqui" gerou `localStorage.mcbugs-order-type = "dine-in"`.
- Carrinho persistiu corretamente com item `Big Mock` em quantidade 2.
- Após finalizar o pedido, a aplicação redirecionou para `/payment` e em seguida para `/payment/pix/confirm`.
- Validação no banco Supabase:
  - `customer_name`: "João Silva"
  - `order_type`: "dine-in"
  - `payment_method`: "pix"
  - `status`: "pending"
  - `total`: 79.8
  - `items`: [{ "productId": "big-mock", "name": "Big Mock", "price": 39.9, "quantity": 2 }]
- Ao clicar em "Fazer Novo Pedido", o estado foi resetado e a aplicação voltou para a tela inicial.

## Problemas encontrados

Nenhum problema funcional foi identificado no fluxo executado.

## Sugestões de melhoria

- Opcionalmente, exibir uma mensagem mais clara de "pedido enviado para a cozinha" em etapas futuras.
- Melhorar a distinção visual dos estados de carregamento/submit durante a criação do pedido.

## Conclusão

O cenário CT001 foi executado com sucesso, cobrindo toda a jornada de pedido para consumo no local, incluindo criação do pedido, atualização de pagamento, confirmação e limpeza do estado final.
