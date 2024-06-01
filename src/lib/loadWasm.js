const publicUrl = process.env.PUBLIC_URL;
const wasmUrl = `${publicUrl}/wasm`;

const loadWasm = async (filleName, importObject = {}) => {
    try {
        const res = await fetch(`${wasmUrl}/${filleName}`);
        const module = await WebAssembly.instantiateStreaming(res, importObject);
        return module;
    } catch (error) {
        console.log('error in loading wasm file', error);
        throw error;
    }
}

export default loadWasm;