declare global {
  interface String {
    splitToCammelCase(splitter: string): string;
  }
}
declare interface String {
  splitToCammelCase(splitter: string): string;
}
export {};
