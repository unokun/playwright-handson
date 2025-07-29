import { test, expect } from "@playwright/test";

test.describe("トップページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("HOME-001: トップページ表示", async ({ page }) => {
    await expect(page).toHaveTitle("最初のページ");
    await expect(page.getByRole("heading")).toHaveText("Playwrightのハンズオン");
    await expect(page.getByRole("button", { name: "操作ボタン" })).toBeVisible();
  });

  test("HOME-002: フォーム画面への遷移", async ({ page }) => {
    // このテストケースは form.spec.ts にも類似のテストが存在するため、
    // ナビゲーションのコンポーネントが明確になった段階でどちらかに寄せることを推奨します。
    await page.getByRole("link", { name: "入力フォーム" }).click();
    await expect(page).toHaveURL("http://localhost:3000/form");
  });
});
