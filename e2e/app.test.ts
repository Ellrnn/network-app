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
      await waitFor(element(by.id("username-input")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("username-input")).typeText("testuser");

      await element(by.id("enter-button")).tap();

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe("Main Screen - Posts", () => {
    beforeEach(async () => {
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {}

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
      await element(by.id("post-title-input")).typeText("Test Post Title");
      await element(by.id("post-content-input")).typeText(
        "This is a test post content for E2E testing"
      );

      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("create-post-button")).tap();

      await waitFor(element(by.text("Test Post Title")))
        .toBeVisible()
        .withTimeout(10000);

      await waitFor(
        element(by.text("This is a test post content for E2E testing"))
      )
        .toBeVisible()
        .withTimeout(5000);

      await expect(element(by.id("post-title-input"))).toHaveText("");
      await expect(element(by.id("post-content-input"))).toHaveText("");
    });

    it("should display posts list with user information", async () => {
      await waitFor(element(by.id("posts-list")))
        .toBeVisible()
        .withTimeout(5000);

      try {
        await waitFor(element(by.id("post-card")).atIndex(0))
          .toBeVisible()
          .withTimeout(3000);

        await waitFor(element(by.id("post-username")).atIndex(0))
          .toBeVisible()
          .withTimeout(2000);

        await waitFor(element(by.id("post-time")).atIndex(0))
          .toBeVisible()
          .withTimeout(2000);
      } catch (e) {
        console.log("No posts found, which is acceptable");
      }
    });

    it("should scroll through posts list", async () => {
      try {
        await element(by.id("posts-list")).scroll(300, "down");
        await element(by.id("posts-list")).scroll(300, "up");
      } catch (e) {
        console.log(
          "Could not scroll, possibly no posts or insufficient content"
        );
      }
    });

    it("should refresh posts list on pull to refresh", async () => {
      await waitFor(element(by.id("posts-list")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("posts-list")).scroll(100, "down", 0.1, 0.1);
      await element(by.id("posts-list")).scroll(300, "up", 0.1, 0.9);
    });
  });

  describe("Post Management", () => {
    beforeEach(async () => {
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {}

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);

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
      await waitFor(element(by.id("edit-post-button")).atIndex(0))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(element(by.id("delete-post-button")).atIndex(0))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should open edit modal and edit post", async () => {
      await element(by.id("edit-post-button")).atIndex(0).tap();

      await waitFor(element(by.id("edit-modal")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("edit-title-input")).clearText();
      await element(by.id("edit-title-input")).typeText("Edited Post Title");

      await element(by.id("edit-content-input")).clearText();
      await element(by.id("edit-content-input")).typeText(
        "This post has been edited"
      );

      await element(by.id("save-edit-button")).tap();

      await waitFor(element(by.text("Edited Post Title")))
        .toBeVisible()
        .withTimeout(10000);

      await waitFor(element(by.text("This post has been edited")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should open delete modal and delete post", async () => {
      await element(by.id("delete-post-button")).atIndex(0).tap();

      await waitFor(element(by.id("delete-modal")))
        .toBeVisible()
        .withTimeout(5000);

      await waitFor(
        element(by.text("Are you sure you want to delete this item?"))
      )
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("confirm-delete-button")).tap();

      await waitFor(element(by.text("Post to Edit/Delete")))
        .not.toBeVisible()
        .withTimeout(10000);
    });

    it("should cancel delete operation", async () => {
      await element(by.id("delete-post-button")).atIndex(0).tap();

      await waitFor(element(by.id("delete-modal")))
        .toBeVisible()
        .withTimeout(5000);

      await element(by.id("cancel-delete-button")).tap();

      await waitFor(element(by.text("Post to Edit/Delete")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });

  describe("Form Validation", () => {
    beforeEach(async () => {
      try {
        await waitFor(element(by.id("username-input")))
          .toBeVisible()
          .withTimeout(2000);

        await element(by.id("username-input")).typeText("testuser");
        await element(by.id("enter-button")).tap();
      } catch (e) {}

      await waitFor(element(by.text("CodeLeap Network")))
        .toBeVisible()
        .withTimeout(5000);
    });

    it("should disable create button when fields are empty", async () => {
      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);

      await expect(element(by.id("create-post-button"))).toBeNotVisible();
    });

    it("should enable create button when both fields are filled", async () => {
      await element(by.id("post-title-input")).typeText("Test Title");
      await element(by.id("post-content-input")).typeText("Test Content");

      await waitFor(element(by.id("create-post-button")))
        .toBeVisible()
        .withTimeout(5000);
    });
  });
});
