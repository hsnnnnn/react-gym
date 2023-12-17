


import { useState } from "react";
import close from '../Assets/close.png';
import apple from '../Assets/apple.png';
import google from '../Assets/google.png';
import facebook from '../Assets/facebook.png';
import { useNavigate } from 'react-router-dom';
function App() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      // Tıklama işlemi ile "/about" sayfasına geçiş yap
      navigate('/');
    };
  
    return (
        <div className="w-[100vw] h-[100vh] lgncont">
            <div className="w-full h-full loginpage flex justify-center flex-col items-center">
            <div className="w-full h-[5vh]  flex justify-end items-center">
                    <div className="w-[3vw] h-full flex justify-center items-center cursor-pointer" onClick={handleButtonClick}>
                        <img src={close}></img>
                    </div>
                </div>
                <div className="w-full h-[98vh]  flex justify-center items-center">
                    <div className="w-[27vw] h-[65vh]  logincontainer flex justify-center flex-col items-center gap-[1vw]">
                        <p className="lginheader">Log In</p>
                        <p className="logindesc">Lorem ipsum dolor sit amet.</p>
                        <input id="email" className="w-[18vw] h-[5vh] text-left pl-[1vw]" placeholder="Email"></input>
                        <input id="password" type="password" className="w-[18vw] h-[5vh] text-left pl-[1vw]" placeholder="Password"></input>
                        <div className="w-[18vw] h-[5vh] signupbtn flex justify-center items-center">Log In</div>
                        <div className="othersections w-[18vw] h-[9vh]  flex-col gap-[0.4vw] flex  items-center">
                            <div className="w-full h-[5vh]  signupsection flex justify-center items-center">
                                <div className="w-[3vw]  h-full flex justify-center items-center"><img src={google}></img></div>
                                <div className="w-[10vw] h-full flex  items-center">Log In with Google</div>
                            </div>
                        </div>
                        <div className="w-[18vw] h-[3vh]  flex justify-center items-center haveaccount gap-[0.5vw] cursor-pointer">
                            <p className="underline underline-offset-3">Forgot your password?</p>
                        </div>
                        <div className="w-[18vw] h-[3vh]  flex justify-center items-center haveaccount gap-[0.5vw] cursor-pointer">
                            <p>Already have an account?</p>
                            <p className="underline underline-offset-3 ">Log In</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
  }
  
export default App;