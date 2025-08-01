declare module "detox" {
  export const device: any;
  export const expect: any;
  export const element: any;
  export const by: any;
  export const waitFor: any;
}

declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => Promise<void>): void;
  function beforeEach(fn: () => Promise<void>): void;
  function afterAll(fn: () => Promise<void>): void;
}
