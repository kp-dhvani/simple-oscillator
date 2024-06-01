import React, { useEffect, useState } from "react";
import loadWasm from "../lib/loadWasm";

const Add = () => {
    const [numberOne, setNumberOne] = useState('');
    const [numberTwo, setNumberTwo] = useState('');
    const [result, setResult] = useState('');

    const [addWasm, setAddWasm] = useState();
    useEffect(() => {
        const loadAddWasm = async () => {
            const addWasm = await loadWasm('add.wasm');
            setAddWasm(addWasm);
        }
        loadAddWasm();
    }, []);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target
        if(name === 'numberOne') {
            setNumberOne(value)
        } else {
            setNumberTwo(value);
        }
    };
    
    const addNums = () => {
        if(!addWasm) return ;
        const wasmResult = addWasm.instance.exports.addNum(parseInt(numberOne), parseInt(numberTwo));
        console.log(wasmResult);
        setResult(wasmResult);
    }

    return(
        <div>
            <input value={numberOne} name="numberOne" type="number" onChange={handleInputChange}/>
            +
            <input value={numberTwo} name="numberTwo" type="number" onChange={handleInputChange}/>
            <button onClick={addNums}>Add</button>
            <p>result: {result}</p>
        </div>
    )
}
export default Add;