# Detox E2E Testing Setup Guide

This guide will help you set up and run Detox end-to-end tests for your React Native Expo app.

## Prerequisites

### System Requirements

- Node.js (v16 or higher)
- Xcode (for iOS testing) - macOS only
- Android Studio and Android SDK (for Android testing)
- iOS Simulator (for iOS testing) - macOS only
- Android Emulator or physical device (for Android testing)

### iOS Setup (macOS only)

1. Install Xcode from the App Store
2. Install Command Line Tools: `xcode-select --install`
3. Install Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
4. Install required tools:
   ```bash
   brew tap wix/brew
   brew install applesimutils
   ```

### Android Setup

1. Install Android Studio
2. Install Android SDK (API level 31 or higher recommended)
3. Create an Android Virtual Device (AVD) with the name `Pixel_7_API_34` or update the device name in `.detoxrc.js`
4. Add Android SDK tools to your PATH

## Installation

**Note: You need to free up disk space before running these commands.**

1. Install Detox CLI globally:

   ```bash
   npm install -g detox-cli
   ```

2. Install project dependencies:

   ```bash
   npm install --save-dev detox @config-plugins/detox-expo jest
   ```

3. Install CocoaPods (iOS only - macOS):
   ```bash
   sudo gem install cocoapods
   ```

## Configuration Files Created

- `.detoxrc.js` - Main Detox configuration
- `e2e/jest.config.js` - Jest configuration for e2e tests
- `e2e/init.js` - Test environment setup
- `e2e/app.test.js` - Sample test file
- Updated `app.json` - Added Detox plugin
- Updated `package.json` - Added test scripts

## Development Build Setup

Since this is an Expo managed app, you'll need to create development builds:

1. Install Expo CLI if not already installed:

   ```bash
   npm install -g @expo/cli
   ```

2. Create development builds:

   **For iOS:**

   ```bash
   npx expo run:ios --configuration Debug --device-family=simulator
   ```

   **For Android:**

   ```bash
   npx expo run:android --variant debug
   ```

## Running Tests

### iOS Tests

1. Build the app for testing:

   ```bash
   npm run e2e:build:ios
   ```

2. Run the tests:
   ```bash
   npm run e2e:test:ios
   ```

### Android Tests

1. Start your Android emulator or connect a physical device

2. Build the app for testing:

   ```bash
   npm run e2e:build:android
   ```

3. Run the tests:
   ```bash
   npm run e2e:test:android
   ```

## Available Scripts

- `npm run e2e:build:ios` - Build iOS app for testing
- `npm run e2e:test:ios` - Run iOS tests
- `npm run e2e:build:android` - Build Android app for testing
- `npm run e2e:test:android` - Run Android tests
- `npm run e2e:test` - Run tests (defaults to iOS)

## Writing Tests

Tests are located in the `e2e/` directory. The sample test file `e2e/app.test.js` includes examples of:

- Navigation testing
- UI interaction testing
- Form input testing
- List scrolling
- Modal interactions

### Test Structure

```javascript
describe("Feature Name", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should perform action", async () => {
    await waitFor(element(by.text("Some Text")))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.text("Button")).tap();
  });
});
```

### Element Selectors

Detox supports several ways to select elements:

- `by.text('Button Text')` - By text content
- `by.id('element-id')` - By testID prop
- `by.type('RCTScrollView')` - By component type
- `by.traits(['button'])` - By accessibility traits

## Adding Test IDs to Components

To make your components testable, add `testID` props:

```jsx
<TouchableOpacity testID="add-post-button" onPress={handleAddPost}>
  <Text>Add Post</Text>
</TouchableOpacity>

<TextInput
  testID="post-title-input"
  value={title}
  onChangeText={setTitle}
  placeholder="Post title"
/>

<ScrollView testID="posts-list">
  {posts.map(post => (
    <PostCard key={post.id} post={post} />
  ))}
</ScrollView>
```

## Troubleshooting

### Common Issues

1. **App doesn't launch**: Ensure you've built the development build first
2. **Tests timeout**: Increase timeout values or check if elements exist
3. **Element not found**: Verify testID props are correctly set
4. **Android emulator issues**: Ensure emulator is running and accessible via adb

### Debug Mode

Run tests with debug output:

```bash
detox test --configuration ios.sim.debug --loglevel verbose
```

### Logs

- iOS Simulator logs: `~/Library/Logs/CoreSimulator/`
- Android logs: `adb logcat`

## Best Practices

1. **Use testID props** instead of text selectors when possible
2. **Keep tests independent** - each test should work in isolation
3. **Use waitFor()** for async operations
4. **Clean up after tests** - reset app state between tests
5. **Group related tests** in describe blocks
6. **Use meaningful test descriptions**

## CI/CD Integration

For continuous integration, consider:

- Running tests on cloud services like Bitrise or GitHub Actions
- Using headless mode for faster execution
- Parallel test execution
- Test result reporting

## Next Steps

1. Free up disk space and install the dependencies
2. Update the sample tests to match your app's actual UI
3. Add testID props to your components
4. Create development builds
5. Run your first test!

For more information, visit the [Detox documentation](https://github.com/wix/Detox).
