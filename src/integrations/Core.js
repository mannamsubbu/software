// src/integrations/Core.js
export async function UploadFile({ file }) {
  // mock: return a blob url for now
  return { file_url: URL.createObjectURL(file) };
}
