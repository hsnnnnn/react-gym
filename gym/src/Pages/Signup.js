import React, { useState, useEffect, useRef } from 'react';
import close from '../Assets/close.png';
import apple from '../Assets/apple.png';
import google from '../Assets/google.png';
import facebook from '../Assets/facebook.png';
import { useNavigate } from 'react-router-dom';
import Loader from "react-js-loader";
import axios from 'axios';



function App() {
    const color = "gray";
    const navigate = useNavigate();
    const [signup, setsignup] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [checkmail, setCheckmail] = useState(false);
    const [counter, setCounter] = useState(0);
    const [time, setTime] = useState('Waiting')
    const [useralready, setUseralready] = useState(false);
    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:3001/register', { email });
        if (response.data) {
          if (response.data.message ) {
            setUseralready(true)
            return
          }
          setCounter(response.data.expiresAt)
          setsignup(false)
        }
      } catch (error) {
        console.log('Hata:', error.response.data);
      }
    };


    const CheckCode = async (fullcode) => {
      try {
        const response = await axios.post('http://localhost:3001/check-verification-code', { email, fullcode });
        if (response.data) {

          if (response.data.isVerified == true) {
            console.log("giris basarili")

          } else {
            console.log("giris basarisiz")
            setCheckmail(false)
          }
          
        }
      } catch (error) {
        console.error('Hata:', error.response.data);
      }
    };


    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));
    const opacityStyle = checkmail ? { opacity: 1 } : { opacity: 0 };
    const opacityStyletext = useralready ? { opacity: 1 } : { opacity: 0 };
    const handleInputChange = (index, e) => {
      const value = e.target.value;
    
      // Eğer değer varsa ve bir karakterden uzunsa, sadece ilk karakteri al
      if (value.length > 0) {
        e.target.value = value.charAt(0);
      }
    
      // Kodu güncelle
      const newCode = [...code];
      newCode[index] = e.target.value;
      setCode(newCode);
    
      // Tüm input alanları dolu mu kontrol et
      const isAllFilled = newCode.every((char) => char !== '');
    
      // Eğer tüm input alanları doluysa, başka bir şey yapabilirsiniz
      if (isAllFilled) {
        setCheckmail(true)
        const concatenatedCode = newCode.join('');
        CheckCode(concatenatedCode)
      } else {
        // Bir sonraki boş inputa odaklan
        const nextEmptyIndex = newCode.findIndex((char) => char === '');
        if (nextEmptyIndex !== -1 && index < newCode.length - 1) {
          inputRefs.current[nextEmptyIndex].current.focus();
        }
      }
    };

          



    const handleButtonClick = () => {
      // Tıklama işlemi ile "/about" sayfasına geçiş yap
      navigate('/');
    };


  



    useEffect(() => {
      const calculateRemainingTime = () => {
        const currentTime = Date.now();
        if (counter == 0) return;
        let remainingTime = counter - currentTime;
        if (remainingTime <= 0) {
          setTime('Waiting')
          navigate('/');
          clearInterval(intervalId);
          return
        }
        setTime(remainingTime);
      };
  
      const intervalId = setInterval(() => {
        calculateRemainingTime();
      }, 1000);
      
      // Komponentin temizlenmesi durumunda interval'i temizle
      return () => clearInterval(intervalId);
    }, [counter]);
  
    const formatTime = () => {
      if (typeof(time) !== 'number') return "Waitin..";
      const minutes = Math.floor(time / 60000);
      const seconds = ((time % 60000) / 1000).toFixed(0);

      return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    };



    const OnChangeMail = (val) => {
      setEmail(val)
      setUseralready(false)
    }







    return (
        <div className="w-[100vw] h-[100vh] lgncont">
          

          <div className="w-full h-full loginpage flex justify-center flex-col items-center  ">
            <div className="w-full h-[5vh]  flex justify-end items-center">
                    <div className="w-[3vw] h-full flex justify-center items-center" onClick={handleButtonClick}>
                        <img src={close}></img>
                    </div>
                </div>
                <div className="w-full h-[98vh]  flex justify-center items-center">
                    <div className="w-[27vw] h-[65vh]  logincontainer flex justify-center flex-col items-center gap-[1vw]">
                    {signup ? (
                        <>
                          <p className="lginheader">Sign Up</p>
                          <p className="logindesc">Lorem ipsum dolor sit amet.</p>
                          <input
                            id="email"
                            className="w-[18vw] h-[5vh] text-left pl-[1vw]"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => OnChangeMail(e.target.value)}
                          ></input>
                          <input
                            id="password"
                            type="password"
                            className="w-[18vw] h-[5vh] text-left pl-[1vw]"
                            placeholder="Password"
                            onChange={(e) => setPass(e.target.value)}
                          ></input>
                          <div
                            className="w-[18vw] h-[5vh] signupbtn flex justify-center items-center"
                            onClick={handleRegister}
                            
                          >
                            Sign Up
                          </div>
                          <p className='remainingtime h-[1vh]' style={opacityStyletext}>This mail already registered.</p>
                          <div className="othersections w-[18vw] h-[20vh]  flex-col gap-[0.4vw] flex justify-center items-center">
                            <div className="w-full h-[5vh]  signupsection flex justify-center items-center">
                              <div className="w-[3vw]  h-full flex justify-center items-center">
                                <img src={google} alt="Google"></img>
                              </div>
                              <div className="w-[10vw] h-full flex  items-center">Sign Up with Google</div>
                            </div>
                            <div className="w-full h-[5vh]  signupsection flex justify-center items-center">
                              <div className="w-[3vw]  h-full flex justify-center items-center">
                                <img src={apple} alt="Apple"></img>
                              </div>
                              <div className="w-[10vw] h-full flex  items-center">Sign Up with Apple</div>
                            </div>
                            <div className="w-full h-[5vh]  signupsection flex justify-center items-center">
                              <div className="w-[3vw]  h-full flex justify-center items-center">
                                <img src={facebook} alt="Facebook"></img>
                              </div>
                              <div className="w-[10vw] h-full flex  items-center">Sign Up with Facebook</div>
                            </div>
                          </div>
                          <div className="w-[18vw] h-[3vh]  flex justify-center items-center haveaccount gap-[0.5vw] ">
                            <p>Already have an account?</p>
                            <p className="underline underline-offset-3 cursor-pointer">Log In</p>
                          </div>
                        </>
                          ) : (
                          <>
                            <p className="lginheader">Verification</p>
                            <div className='w-[18vw] h-[5vh] verificationbg justify-center items-center border-none flex gap-[0.1vw]'>
                              <div
                                id="email"

                                className="w-full h-full text-center codehandler"
                                placeholder="Verification Code"
                                maxLength={4}
                                
                              >
                                Lorem ipsum dolor sit amet.
                              </div>
                            </div>
                            <div className='w-[20vw] h-[6vh]  flex justify-between items-center'>
                            {code.map((value, index) => (
                                <input
                                key={index}
                                ref={inputRefs.current[index]}
                                id={`input-${index}`}
                                type='number'
                                className='w-[3vw] h-full codehandlerinput'
                                value={value}
                                onChange={(e) => handleInputChange(index, e)}
                                maxLength={1}
                                disabled={checkmail}
                                />
                              ))}
                              
                            </div>
                            {!checkmail ? <p className='remainingtime'>{formatTime()}</p> : null}
 
                              <div className='w-full h-[15vh] flex flex-col justify-center items-center gap-[0.1vw] bgemailconf' style={opacityStyle}>
                                <div id="email" className='codehandler text-center'>We are checking your verification code.</div>
                                
                                <Loader type="spinner-default" bgColor={color} color={color} title={""} size={30} />
                                
                            </div>
                                


                          </>
                          )}
                    </div>
                </div>
            </div>

        </div>
    );
  }
  
export default App;