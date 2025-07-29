import { test, expect } from "@playwright/test";

test.describe("入力フォーム", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/form");
  });

  test("FORM-001: フォーム画面表示", async ({ page }) => {
    await expect(page).toHaveTitle("入力フォーム");
    await expect(page.getByRole("heading")).toHaveText("入力フォーム");
    await expect(page.getByRole("button", { name: /シャッフル/ })).toBeVisible();
  });

  test("FORM-002: 正常系: 2名のメンバーをシャッフル", async ({ page }) => {
    await page.getByRole("textbox", { name: /1人目/ }).fill("項羽");
    await page.getByRole("textbox", { name: /2人目/ }).fill("劉邦");
    await page.getByRole("button", { name: /シャッフル/ }).click();
    await expect(page.getByRole('status', {name: /結果/})).toHaveText(/(項羽→劉邦)|(劉邦→項羽)/);
  });

  test.skip("FORM-003: 正常系: 3名以上のメンバーをシャッフル", async ({ page }) => {
    // TODO: アプリケーションに3名以上のシャッフル機能が実装されたらテストを実装する
  });

  test.skip("FORM-004: 異常系: メンバーが1名のみでシャッフル", async ({ page }) => {
    // TODO: アプリケーションにバリデーションが実装されたらテストを実装する
  });

  test.skip("FORM-005: 異常系: メンバー名が未入力でシャッフル", async ({ page }) => {
    // TODO: アプリケーションにバリデーションが実装されたらテストを実装する
  });

  test.skip("FORM-006: 異常系: 同じメンバー名を入力してシャッフル", async ({ page }) => {
    // TODO: アプリケーションにバリデーションが実装されたらテストを実装する
  });
});
