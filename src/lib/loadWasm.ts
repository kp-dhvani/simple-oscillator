type ImportObject = Record<string, any>; // Define type for importObject

const publicUrl = process.env.PUBLIC_URL;
const wasmUrl = `${publicUrl}/wasm`;

const loadWasm = async (
  fileName: string,
  importObject: ImportObject = {},
): Promise<WebAssembly.Module> => {
  try {
    const res = await fetch(`${wasmUrl}/${fileName}`);
    const module = await WebAssembly.instantiateStreaming(res, importObject);
    return module;
  } catch (error) {
    console.error('Error loading wasm file:', error);
    throw error;
  }
};

export default loadWasm;
