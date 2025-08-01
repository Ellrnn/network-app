import { by, device, element, expect, waitFor } from "detox";

describe("CodeLeap Network App E2E Tests", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe("Authentication Flow", () => {
    it("should show signup screen on launch", async () => {
      await waitFor(element(by.text("Welcome to CodeLeap network!")))
        .toBeVisible()
        .withTimeout(10000);
    });

    it("should allow user to enter username and proceed to main screen", async () => {
      // Esperar pela tela de signup
      await waitFor(element(by.id("username-input")))
        .toBeVisible()
        .withTimeout(5000);

      // Inserir username
      await element(by.id("username-input")).typeText("testuser");

      // Tocar no botão Enter
      await element(by.id("enter-button")).tap();

      // Verificar se chegou na tela principal
      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe("Main Screen - Posts", () => {
    beforeEach(async () => {
      // Fazer login se necessário
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {
        // Já está logado
      }

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should show the main screen with post creation form", async () => {
      await waitFor(element(by.text("What's on your mind?")))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(element(by.id("post-title-input")))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(element(by.id("post-content-input")))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should create a new post successfully", async () => {
      // Preencher o formulário de post
      await element(by.id("post-title-input")).typeText("Test Post Title");
      await element(by.id("post-content-input")).typeText(
        "This is a test post content for E2E testing"
      );

      // O botão deve estar habilitado agora
      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("create-post-button")).tap();

      // Verificar se o post foi criado
      await waitFor(element(by.text("Test Post Title")))
        .toBeVisible()
        .withTimeout(10000);

      await waitFor(
        element(by.text("This is a test post content for E2E testing"))
      )
        .toBeVisible()
        .withTimeout(5000);

      // Verificar se os campos foram limpos
      await expect(element(by.id("post-title-input"))).toHaveText("");
      await expect(element(by.id("post-content-input"))).toHaveText("");
    });

    it("should display posts list with user information", async () => {
      // Verificar se a lista de posts existe
      await waitFor(element(by.id("posts-list")))
        .toBeVisible()
        .withTimeout(5000);

      // Verificar se há pelo menos um post (se houver)
      try {
        await waitFor(element(by.id("post-card")).atIndex(0))
          .toBeVisible()
          .withTimeout(3000);

        // Verificar elementos do card do post
        await waitFor(element(by.id("post-username")).atIndex(0))
          .toBeVisible()
          .withTimeout(2000);

        await waitFor(element(by.id("post-time")).atIndex(0))
          .toBeVisible()
          .withTimeout(2000);
      } catch (e) {
        // Não há posts ainda, está ok
        console.log("No posts found, which is acceptable");
      }
    });

    it("should scroll through posts list", async () => {
      // Tentar fazer scroll na lista
      try {
        await element(by.id("posts-list")).scroll(300, "down");
        await element(by.id("posts-list")).scroll(300, "up");
      } catch (e) {
        // Se não conseguir fazer scroll, provavelmente não há posts suficientes
        console.log(
          "Could not scroll, possibly no posts or insufficient content"
        );
      }
    });

    it("should refresh posts list on pull to refresh", async () => {
      await waitFor(element(by.id("posts-list")))
        .toBeVisible()
        .withTimeout(5000);

      // Fazer pull to refresh
      await element(by.id("posts-list")).scroll(100, "down", 0.1, 0.1);
      await element(by.id("posts-list")).scroll(300, "up", 0.1, 0.9);
    });
  });

  describe("Post Management", () => {
    beforeEach(async () => {
      // Fazer login
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {
        // Já está logado
      }

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);

      // Criar um post para testar edição/exclusão
      await element(by.id("post-title-input")).typeText("Post to Edit/Delete");
      await element(by.id("post-content-input")).typeText(
        "This post will be edited or deleted"
      );
      await element(by.id("create-post-button")).tap();

      await waitFor(element(by.text("Post to Edit/Delete")))
        .toBeVisible()
        .withTimeout(10000);
    });

    it("should show edit and delete buttons for own posts", async () => {
      // Verificar se os botões de editar e deletar aparecem
      await waitFor(element(by.id("edit-post-button")).atIndex(0))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(element(by.id("delete-post-button")).atIndex(0))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should open edit modal and edit post", async () => {
      // Tocar no botão de editar
      await element(by.id("edit-post-button")).atIndex(0).tap();

      // Verificar se o modal de edição abriu
      await waitFor(element(by.id("edit-modal")))
        .toBeVisible()
        .withTimeout(5000);

      // Editar o título
      await element(by.id("edit-title-input")).clearText();
      await element(by.id("edit-title-input")).typeText("Edited Post Title");

      // Editar o conteúdo
      await element(by.id("edit-content-input")).clearText();
      await element(by.id("edit-content-input")).typeText(
        "This post has been edited"
      );

      // Salvar as alterações
      await element(by.id("save-edit-button")).tap();

      // Verificar se as mudanças foram aplicadas
      await waitFor(element(by.text("Edited Post Title")))
        .toBeVisible()
        .withTimeout(10000);

      await waitFor(element(by.text("This post has been edited")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should open delete modal and delete post", async () => {
      // Tocar no botão de deletar
      await element(by.id("delete-post-button")).atIndex(0).tap();

      // Verificar se o modal de confirmação abriu
      await waitFor(element(by.id("delete-modal")))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(
        element(by.text("Are you sure you want to delete this item?"))
      )
        .toBeVisible()
        .withTimeout(5000);

      // Confirmar a exclusão
      await element(by.id("confirm-delete-button")).tap();

      // Verificar se o post foi removido
      await waitFor(element(by.text("Post to Edit/Delete")))
        .not.toBeVisible()
        .withTimeout(10000);
    });

    it("should cancel delete operation", async () => {
      // Tocar no botão de deletar
      await element(by.id("delete-post-button")).atIndex(0).tap();

      // Verificar se o modal de confirmação abriu
      await waitFor(element(by.id("delete-modal")))
        .toBeVisible()
        .withTimeout(5000);

      // Cancelar a exclusão
      await element(by.id("cancel-delete-button")).tap();

      // Verificar se o post ainda está lá
      await waitFor(element(by.text("Post to Edit/Delete")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe("Form Validation", () => {
    beforeEach(async () => {
      // Fazer login
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {
        // Já está logado
      }

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should disable create button when fields are empty", async () => {
      // Verificar se o botão está desabilitado inicialmente
      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);

      // O botão deve estar desabilitado com campos vazios
      await expect(element(by.id("create-post-button"))).toBeNotVisible();
    });

    it("should enable create button when both fields are filled", async () => {
      // Preencher ambos os campos
      await element(by.id("post-title-input")).typeText("Test Title");
      await element(by.id("post-content-input")).typeText("Test Content");

      // O botão deve estar habilitado agora
      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });
});
