export function parseFileName(fileName: string) {
  const pattern = /(\d+)-(.*)/;
  const matchResult = fileName.match(pattern);
  if (!matchResult) {
    throw new Error("文件名格式错误");
  }
  const prefix = matchResult[1];
  const originalFileName = matchResult[2];
  return { prefix, originalFileName };
}
