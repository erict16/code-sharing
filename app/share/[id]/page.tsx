"use client"

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "../../page.module.css";
import backImg from "@/public/Hero-Background-notecode@2x.png";
import noteLogo from "@/public/NoteCodeLogo.svg";
import Editor from '@monaco-editor/react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons/faShareNodes';
import axios from 'axios';


export default function ShareCode({params}: any) {

    const [code, SetCode] = useState("");
    const [language, SetLanguage] = useState("html");
    const [lightMode, SetLightMode] = useState("vs-light");
    const [disableButton, SetDisableButton] = useState(true);
  
  
    const handleEditorChange = (newCode: any) => {
        SetDisableButton(false);
        SetCode(newCode);
    }

    useEffect(() => {
      
        axios.post("/api/get_code", {
            id: params.id
        }).then((res) => {
            console.log(res.data);
            SetCode(res.data.code);
            SetLanguage(res.data.language);
        }).catch((err) => {
            console.log(err);
        });
    },[params.id]);

  
    const shareCode = () => {
        axios.post('/api/share_code', {
            id: params.id,
            code: code,
            language: language,
            newCode: false,
        }).then((res)=> {
          console.log(res.data);
          if(res.data.msg === 'Code Saved'){
            alert('Code Saved');
            SetDisableButton(true);
          }
        }).catch((err) => {
          console.log(err);
        })
    }

    const ShareButton = () => {
        if(disableButton){
            return (
                <Button variant="primary" style={{ position: 'absolute', right: '10px', borderRadius: '7%'}} disabled onClick={shareCode}>
                    <span><FontAwesomeIcon icon={faShareNodes} />{'  '}</span>
                    Share
                </Button>
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
            value={code}
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