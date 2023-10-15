export type Dir = {
  name: string;
  path: string;
  isDirectory: boolean;
  isFile: boolean;
  dirs?: Dir[];
};
