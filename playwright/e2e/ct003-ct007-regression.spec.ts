import { expect, test, type Page } from "@playwright/test";

async function clearApplicationState(page: Page): Promise<void> {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function addBigMock(page: Page): Promise<void> {
  await page.getByRole("button", { name: /Para comer aqui/ }).click({ force: true });
  await page.getByRole("button", { name: /Big Mock.*R\$ 39,90/ }).click();
  await page.getByRole("button", { name: /Quero • R\$ 39,90/ }).click();
}

test.describe("Additional manual regression scenarios", () => {
  test("CT003 - completes a dine-in order with debit card", async ({ page }) => {
    await clearApplicationState(page);
    await addBigMock(page);
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await page.getByLabel("Seu nome").fill("Manual Debit");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();
    await expect(page).toHaveURL(/\/payment$/);
    await page.getByRole("button", { name: /Cartão de Débito/ }).click();
    await expect(page).toHaveURL(/\/payment\/debit\/confirm$/);
    await expect(page.getByText("Manual Debit", { exact: true })).toBeVisible();
    await expect(page.getByText("Comer no local", { exact: true })).toBeVisible();
    await expect(page.getByText("Cartão de Débito", { exact: true })).toHaveCount(2);
    await expect(page.getByText(/aguarde ser chamado pelo número/)).toBeVisible();
  });

  test("CT004 - completes a takeaway order with PIX", async ({ page }) => {
    await clearApplicationState(page);
    await page.getByRole("button", { name: /Para levar/ }).click({ force: true });
    await page.getByRole("button", { name: "🍟 Fritas" }).click();
    await page.getByRole("button", { name: /Batatas Full Stack.*R\$ 10,90/ }).click();
    await page.getByRole("button", { name: /Quero • R\$ 10,90/ }).click();
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await page.getByLabel("Seu nome").fill("Manual PIX Takeaway");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();
    await expect(page).toHaveURL(/\/payment$/);
    await page.getByRole("button", { name: /PIX/ }).click();
    await expect(page).toHaveURL(/\/payment\/pix\/confirm$/);
    await expect(page.getByText("Manual PIX Takeaway", { exact: true })).toBeVisible();
    await expect(page.getByText("Para levar", { exact: true })).toBeVisible();
    await expect(page.getByText("PIX", { exact: true })).toHaveCount(2);
    await expect(page.getByText(/aguarde ser chamado pelo número/)).toHaveCount(0);
  });

  test("CT005 - rejects a whitespace-only customer name", async ({ page }) => {
    await clearApplicationState(page);
    await addBigMock(page);
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    const name = page.getByLabel("Seu nome");
    await name.fill("   ");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("dialog", { name: "Finalizar Pedido" })).toBeVisible();
    await expect(name).toHaveValue("   ");
    await expect(page.getByText("enviando a cozinha....")).toHaveCount(0);
  });

  test("CT006 - preserves cart contents after a page reload", async ({ page }) => {
    await clearApplicationState(page);
    await addBigMock(page);
    await page.reload();
    await expect(page.getByText("/ 1 item", { exact: true })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toContain(
      "big-mock",
    );
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await expect(page).toHaveURL(/\/cart$/);
    await expect(page.getByRole("heading", { name: "Big Mock" })).toBeVisible();
    await expect(page.getByText("R$ 39,90", { exact: true })).toHaveCount(2);
  });

  test("CT007 - cancels a pending order and clears application state", async ({ page }) => {
    await clearApplicationState(page);
    await addBigMock(page);
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await page.getByLabel("Seu nome").fill("Manual Cancel");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();
    await expect(page).toHaveURL(/\/payment$/);
    await page.getByRole("button", { name: "Cancelar Pedido" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-order-type"))).resolves.toBeNull();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-current-order"))).resolves.toBeNull();
  });

  test("CT008 - completes a takeaway order with debit card", async ({ page }) => {
    await clearApplicationState(page);
    await page.getByRole("button", { name: /Para levar/ }).click({ force: true });
    await page.getByRole("button", { name: "🍟 Fritas" }).click();
    await page.getByRole("button", { name: /Batatas Full Stack.*R\$ 10,90/ }).click();
    await page.getByRole("button", { name: /Quero • R\$ 10,90/ }).click();
    await page.getByRole("button", { name: "Ver pedido" }).click();
    await page.getByRole("button", { name: "Finalizar pedido" }).click();
    await page.getByLabel("Seu nome").fill("Manual Takeaway Debit");
    await page.getByRole("button", { name: "Finalizar", exact: true }).click();
    await expect(page).toHaveURL(/\/payment$/);
    await page.getByRole("button", { name: /Cartão de Débito/ }).click();
    await expect(page).toHaveURL(/\/payment\/debit\/confirm$/);
    await expect(page.getByText("Manual Takeaway Debit", { exact: true })).toBeVisible();
    await expect(page.getByText("Para levar", { exact: true })).toBeVisible();
    await expect(page.getByText("Cartão de Débito", { exact: true })).toHaveCount(2);
  });

  test("CT009 - consolidates repeated additions of the same product", async ({ page }) => {
    await clearApplicationState(page);
    await addBigMock(page);
    await page.getByRole("button", { name: /Big Mock.*R\$ 39,90/ }).click();
    await page.getByRole("button", { name: /Quero • R\$ 39,90/ }).click();
    await expect(page.getByText("/ 2 itens", { exact: true })).toBeVisible();
    await expect(page.getByText("R$ 79,80", { exact: true })).toBeVisible();
  });

  test("CT010 - displays the empty-cart state", async ({ page }) => {
    await clearApplicationState(page);
    await page.goto("/cart");
    await expect(page.getByText("Nada Encontrado Aqui", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Ver cardápio" })).toBeVisible();
  });

  test("CT011 - recovers from invalid persisted cart JSON", async ({ page }) => {
    await clearApplicationState(page);
    await page.evaluate(() => {
      localStorage.setItem("mcbugs-cart-items", "invalid-json");
      localStorage.setItem("mcbugs-order-type", "dine-in");
    });
    await page.goto("/menu");
    await page.reload();
    await expect(page.getByRole("button", { name: "🍔 Lanches" })).toBeVisible();
    await expect(page.evaluate(() => localStorage.getItem("mcbugs-cart-items"))).resolves.toBe("[]");
  });
});
