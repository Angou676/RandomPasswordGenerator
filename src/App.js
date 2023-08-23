import React, { useState, useEffect } from 'react';
import './App.css'
import RandomPasswordGenerator from './RandomPasswordGenerator';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Slider from "@mui/material/Slider";

const App = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState([]);
  const [passwordCopied, setPasswordCopied] = useState(false)

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('previousPassword')) || [];
    setPreviousPassword(storedPasswords);
  }, []);

  const onchangeHandler = (event, newValue) => {
    console.log(newValue);
    setPasswordLength(newValue)
  };

  const handleGeneratePassword = () => {
    const password = RandomPasswordGenerator(passwordLength);
    setGeneratedPassword(password);
    setPasswordCopied(false)
    const updatedPreviousPassword = [password, ...previousPassword];
    setPreviousPassword(updatedPreviousPassword);
    localStorage.setItem('previousPassword', JSON.stringify(updatedPreviousPassword));
  };

  const handleCopyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      setPasswordCopied(true)
    }
  };

  return (
    <>
      <div className="container">
        <h2 className='text_align'>Random Password Generator</h2>
        <div >
          <h4 className='text_align d_flexcc'>Password length
            <div className='marginLeft pass_length'> {passwordLength}</div>
          </h4>
          <div className='d_flex'>
            <b>Start 8</b>
            <Slider
              className='slider'
              track={false}
              onChange={onchangeHandler}
              step={1}
              min={8}
              max={15}
            />
            <b>End 15</b>
          </div>
        </div>
        <button onClick={handleGeneratePassword}>
          Generate Password
        </button>
        {
          generatedPassword !== "" &&
          <div className="generated-password d_flexcc">
            Generated password
            <span className='mg'>
              {generatedPassword.slice(0, -5).replace(/./g, '*')}
              {generatedPassword.slice(-5)}
            </span>
            <ContentCopyIcon
              onClick={handleCopyToClipboard}
              className='copy_icon'
            />
            {
              passwordCopied &&
              <span className='copystyle'>
                Copied
              </span>
            }
          </div>
        }
        {/* <div >
          <h3>Previous Passwords:</h3>
          <ul>
            {previousPassword.map((password, index) => (
              <li key={index}>{password}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default App;
