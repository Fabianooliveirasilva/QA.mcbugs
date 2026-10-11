import { expect, test, type Page } from "@playwright/test";

const total = "R$ 85,70";

async function clearApplicationState(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

test.describe("CT001 - Jornada completa para comer aqui", () => {
  test("deve concluir um pedido dine-in com pagamento via PIX", async ({ page }) => {
    await page.goto("/");
    await clearApplicationState(page);

    await expect(page.getByRole("heading", { name: "Seja bem-vindo!" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Para comer aqui/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Para levar/ })).toBeVisible();

    await page.getByRole("button", { name: /Para comer aqui/ }).click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByRole("button", { name: "🍔 Lanches" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🍟 Fritas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🥤 Bebidas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "🍦 Sobremesas" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Big Mock" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Big Mock" })).toHaveCount(1);
    await expect(page.getByRole("button", { name: /Big Mock.*R\$ 39,90/ })).toBeVisible();

    const orderType = await page.evaluate(() => localStorage.getItem("mcbugs-order-type"));
    expect(orderType).toBe("dine-in");

    await page.getByRole("button", { name: /Big Mock.*R\$ 39,90/ }).click();
    await expect(page).toHaveURL(/\/product\/big-mock$/);
    await expect(page.getByRole("heading", { name: "Big Mock", exact: true })).toBeVisible();
    await expect(page.getByText("R$ 39,90", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sobre" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ingredientes" })).toBeVisible();
    await expect(page.getByText("Pão com gergelim", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Aumentar quantidade" }).click();
    await expect(page.getByText("2", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Quero • R$ 79,80" })).toBeVisible();
    await page.getByRole("button", { name: "Quero • R$ 79,80" }).click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByText("R$ 79,80", { exact: true })).toBeVisible();
    await expect(page.getByText("/ 2 itens", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "🥤 Bebidas" }).click();
    await expect(page.getByRole("button", { name: /Coca-Crash.*R\$ 5,90/ })).toBeVisible();
    await page.getByRole("button", { name: /Coca-Crash.*R\$ 5,90/ }).click();
    await expect(page).toHaveURL(/\/product\/coca-crash$/);
    await expect(page.getByRole("heading", { name: "Coca-Crash", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Quero • R$ 5,90" }).click();
    await expect(page).toHaveURL(/\/menu$/);
    await expect(page.getByText(total, { exact: true })).toBeVisible();
    await expect(page.getByText("/ 3 itens", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Ver pedido" }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "Big Mock" })).toContainText("Big Mock");
    await expect(page.getByRole("heading", { name: "Coca-Crash" })).toContainText("Coca-Crash");
    await expect(page.getByText("R$ 79,80", { exact: true })).toBeVisible();
    await expect(page.getByText("R$ 5,90", { exact: true })).toBeVisible();
    await expect(page.getByText("Total do pedido")).toBeVisible();
    await expect(page.getByText(total, { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await expect(page.getByRole("dialog", { name: "Finalizar Pedido" })).toBeVisible();
    await expect(page.getByLabel("Seu nome")).toBeVisible();
    await page.getByLabel("Seu nome").fill("João Silva");
    await expect(page.getByLabel("Seu nome")).toHaveValue("João Silva");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();

    await expect(page.getByRole("heading", { name: "enviando a cozinha...." })).toBeVisible();
    await expect(page).toHaveURL(/\/payment$/, { timeout: 15000 });
    await expect(page.getByText("Pedido", { exact: true })).toBeVisible();
    await expect(page.getByText(total, { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /PIX/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cartão de Débito/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Cartão de Crédito/ })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");

    await page.getByRole("button", { name: /PIX/ }).click();
    await expect(page).toHaveURL(/\/payment\/pix\/confirm$/);
    await expect(page.getByText("Pagamento no Balcão")).toBeVisible();
    await expect(page.getByText("João Silva", { exact: true })).toBeVisible();
    await expect(page.getByText("Comer no local", { exact: true })).toBeVisible();
    await expect(page.getByText("PIX", { exact: true })).toHaveCount(2);
    await expect(page.getByText("2x Big Mock", { exact: true })).toBeVisible();
    await expect(page.getByText("1x Coca-Crash", { exact: true })).toBeVisible();
    await expect(page.getByText("Após o pagamento, aguarde ser chamado pelo número do seu pedido.")).toBeVisible();

    await page.getByRole("button", { name: "Fazer Novo Pedido" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { name: "Seja bem-vindo!" })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-order-type"))).resolves.toBeNull();
  });
});
