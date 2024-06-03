#!/bin/bash
CPP_DIR="src/cpp"

OUTPUT_DIR="public/wasm"

mkdir -p $OUTPUT_DIR

for file in $CPP_DIR/*.cpp; do
    filename=$(basename -- "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"

    emcc -O2 -s WASM=1 $file -o $OUTPUT_DIR/$filename.wasm --no-entry -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_malloc']"
done