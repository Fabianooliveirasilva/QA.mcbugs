import { expect, test, type Locator, type Page } from "@playwright/test";

const total = "R$ 39,50";

async function clearApplicationState(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

function cartItem(page: Page, productName: string): Locator {
  return page.getByRole("heading", { name: productName }).locator("..").locator("..");
}

test.describe("CT002 - Jornada completa para levar", () => {
  test("deve concluir um pedido takeaway com pagamento via cartão de crédito", async ({
    page,
  }) => {
    await page.goto("/");
    await clearApplicationState(page);

    await expect(page.getByRole("heading", { name: "Seja bem-vindo!" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Para comer aqui/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Para levar/ })).toBeVisible();

    // A página inicial usa um botão dentro de outro botão e uma animação de entrada.
    await page.getByRole("button", { name: /Para levar/ }).click({ force: true });
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByRole("button", { name: "🍔 Lanches" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🍟 Fritas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🥤 Bebidas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🍦 Sobremesas" })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-order-type"))).resolves.toBe(
      "takeaway",
    );

    await page.getByRole("button", { name: "🍟 Fritas" }).click();
    await expect(page.getByRole("heading", { name: "Batatas Full Stack" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Batatas Refatoradas" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Batatas Minificadas" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Big Mock" })).toHaveCount(0);

    await page.getByRole("button", { name: /Batatas Full Stack.*R\$ 10,90/ }).click();
    await expect(page).toHaveURL(/\/product\/batatas-fullstack$/);
    await expect(page.getByRole("heading", { name: "Batatas Full Stack", exact: true })).toBeVisible();
    await expect(page.getByText("R$ 10,90", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sobre" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ingredientes" })).toBeVisible();
    await expect(page.getByText("Batatas selecionadas", { exact: true })).toBeVisible();
    await expect(page.getByText("1", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Quero • R$ 10,90" }).click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByText("R$ 10,90", { exact: true })).toBeVisible();
    await expect(page.getByText("/ 1 item", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "🥤 Bebidas" }).click();
    await expect(page.getByRole("heading", { name: "Fanta Warning" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Coca-Crash" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Água Localhost" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Batatas Full Stack" })).toHaveCount(0);

    await page.getByRole("button", { name: /Fanta Warning.*R\$ 5,90/ }).click();
    await expect(page).toHaveURL(/\/product\/fanta-warning$/);
    await expect(page.getByRole("heading", { name: "Fanta Warning", exact: true })).toBeVisible();
    await expect(page.getByText("R$ 5,90", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sobre" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ingredientes" })).toBeVisible();
    await page.getByRole("button", { name: "Aumentar quantidade" }).click();
    await page.getByRole("button", { name: "Aumentar quantidade" }).click();
    await expect(page.getByText("3", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Quero • R$ 17,70" })).toBeVisible();
    await page.getByRole("button", { name: "Quero • R$ 17,70" }).click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByText("/ 4 itens", { exact: true })).toBeVisible();
    await expect(page.getByText("R$ 28,60", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Ver pedido" }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "Batatas Full Stack" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Fanta Warning" })).toBeVisible();
    await expect(page.getByText("R$ 10,90", { exact: true })).toBeVisible();
    await expect(page.getByText("R$ 17,70", { exact: true })).toBeVisible();
    await expect(page.getByText("Total do pedido")).toBeVisible();
    await expect(page.getByText("R$ 28,60", { exact: true })).toBeVisible();

    await cartItem(page, "Batatas Full Stack")
      .getByRole("button", { name: "Aumentar quantidade" })
      .click();
    await expect(cartItem(page, "Batatas Full Stack").getByText("2", { exact: true })).toBeVisible();
    await expect(page.getByText("R$ 21,80", { exact: true })).toBeVisible();
    await expect(page.getByText(total, { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await expect(page.getByRole("dialog", { name: "Finalizar Pedido" })).toBeVisible();
    await page.getByLabel("Seu nome").fill("Maria Santos");
    await expect(page.getByLabel("Seu nome")).toHaveValue("Maria Santos");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();

    await expect(page.getByRole("heading", { name: "enviando a cozinha...." })).toBeVisible();
    await expect(page).toHaveURL(/\/payment$/, { timeout: 15000 });
    await expect(page.getByText("Pedido", { exact: true })).toBeVisible();
    await expect(page.getByText(total, { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /PIX/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cartão de Débito/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cartão de Crédito/ })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");

    await page.getByRole("button", { name: /Cartão de Crédito/ }).click();
    await expect(page).toHaveURL(/\/payment\/credit\/confirm$/);
    await expect(page.getByText("Pagamento no Balcão")).toBeVisible();
    await expect(page.getByText("Maria Santos", { exact: true })).toBeVisible();
    await expect(page.getByText("Para levar", { exact: true })).toBeVisible();
    await expect(page.getByText("Cartão de Crédito", { exact: true })).toHaveCount(2);
    await expect(page.getByText("2x Batatas Full Stack", { exact: true })).toBeVisible();
    await expect(page.getByText("3x Fanta Warning", { exact: true })).toBeVisible();
    await expect(page.getByText(/aguarde ser chamado pelo número/)).toHaveCount(0);

    await page.getByRole("button", { name: "Fazer Novo Pedido" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Seja bem-vindo!" })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-order-type"))).resolves.toBeNull();
  });
});
