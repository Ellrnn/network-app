import { device } from "detox";

declare global {
  const beforeAll: any;
  const beforeEach: any;
  const afterAll: any;
}

beforeAll(async () => {
  await device.launchApp();
});

beforeEach(async () => {
  await device.reloadReactNative();
});

afterAll(async () => {
  await device.terminateApp();
});
