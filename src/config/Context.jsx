import { createContext, useState } from 'react';
import runChat from './gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function (params) {
            setResultData(prev => prev + nextWord);
        }, 75*index)
    }

    // src/config/Context.jsx

const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    
    // Add the input to previous prompts
    setPreviousPrompt(prev => [...prev, input]);
    
    const response = await runChat(input);
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
        }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 1; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
    }
    
    setLoading(false);
    setInput("");
}

const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
}


    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;