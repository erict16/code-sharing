"use client"

import React, {useEffect} from 'react';
import MonacoEditor, {monaco} from 'react-monaco-editor';


const MonacoEditorWrapper = ({ value, handleValue, editorStyle}: any) => {

    const options = {
        selectOnLineNumbers: true,
        inlayHintsOptions: {
          includeInlayVariableTypeHints: true,
        },
        useDefaultDataProviders: true,
    };

    const handleMount = () => {
        //console.log(monaco.languages)
    }


    return (
        <MonacoEditor
          editorDidMount={handleMount}
          width='70vw'
          height='70vh'
          theme={editorStyle}
          language='html'
          value={value}
          onChange={handleValue}
          options = {options}
        />
    )
}

export default MonacoEditorWrapper;

