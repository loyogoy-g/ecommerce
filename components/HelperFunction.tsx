export function imageFromBuffer(imageBuffer: Buffer) {
  const imageData = Buffer.from(imageBuffer).toString("base64");
  return `data:image/png;base64,${imageData}`;
}
