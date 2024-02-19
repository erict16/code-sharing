"use client"

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import backImg from "@/public/Hero-Background-notecode@2x.png";
import noteLogo from "@/public/NoteCodeLogo.svg";
import Editor from '@monaco-editor/react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./page.module.css";

//#9b69ee

const defautCode = `
<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>
`;

export default function Home() {

  const [code, SetCode] = useState(defautCode);
  const [language, SetLanguage] = useState("html");
  const [lightMode, SetLightMode] = useState("vs-light");
  const [disableButton, SetDisableButton] = useState(false);
  const [codeLink, SetCodeLink] = useState("");
  
  const handleEditorChange = (newCode: any) => {
      SetCode(newCode);
  }

  const shareCode = () => {
      axios.post('/api/share_code', {
          id: uuidv4(),
          code: code,
          language: language,
          newCode: true
      }).then((res)=> {
        SetDisableButton(true);
        SetCodeLink(res.data.msg);
      }).catch((err) => {
        console.log(err);
      })
  }

  const shortUrl = (x: string) => {
    let short = "..." + x.slice(40, x.length);
    return short;
  }

  const copyLink = () => {
    navigator.clipboard.writeText(codeLink);
  }

  const ShareButton = () => {
    if(disableButton){
        return (
          <div style={{ position: 'absolute', right: '10px' }}>
            <Button variant="link" onClick={copyLink}>
              <span>
                <FontAwesomeIcon icon={faLink} /> {' '}
              </span>
              {shortUrl(codeLink)}
            </Button>
            <Button variant="secondary" style={{ borderRadius: '7%'}} disabled onClick={shareCode}>
                  <span><FontAwesomeIcon icon={faShareNodes} />{'  '}</span>
                  Share
            </Button>
          </div>
            
        )
    } else {
        return (
            <Button variant="primary" style={{ position: 'absolute', right: '10px', borderRadius: '7%'}} active onClick={shareCode}>
                <span><FontAwesomeIcon icon={faShareNodes} />{'  '}</span>
                Share
            </Button>
        )
    }
  }

  return (
    <main>
      <div className={styles.imgBackground}>
        <Image
          src={backImg}
          fill={true}
          alt="Picture of the author"
          priority={true}
        />
      </div>
      
      <div className={styles.title}>
        <p> 
          <Image
            src={noteLogo}
            width={150}
            height={50}
            alt="note share logo"
          />
        </p>
        <h3 style={{ fontSize: '32px', lineHeight: '2%', paddingBottom: '5%'}}>Create & Share</h3>
        <h2 style={{ fontSize: '40px', lineHeight: '2%'}}>Your Code Easily</h2>
      </div>

      <div className={styles.editor_container}>
        <Editor 
          width={"100%"}
          height={"88%"} 
          language={language} 
          theme={lightMode}
          defaultValue={code}
          onChange={handleEditorChange} 
        />
        <div className={styles.button_container}>
          <Dropdown style={{marginLeft: '.5%',paddingRight: '.5%', borderRadius: '7%'}}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {language}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => SetLanguage("html")}>Html</Dropdown.Item>
              <Dropdown.Item onClick={() => SetLanguage("css")}>Css</Dropdown.Item>
              <Dropdown.Item onClick={() => SetLanguage("javascript")}>Javascript</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ borderRadius: '7%'}}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Theme
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => SetLightMode("vs-light")}>Light</Dropdown.Item>
              <Dropdown.Item onClick={() => SetLightMode("vs-dark")}>Dark</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          
          <ShareButton/>

        </div>
      </div> 
    </main>
  );
}

