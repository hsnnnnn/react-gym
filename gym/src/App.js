








import './App.css';
import React, { useEffect, useState } from 'react';
import MainPage from './Pages/MainPage';
import Aboutus from './Pages/Abtus';
import Contactus from './Pages/Contactus';
import logo from './Assets/logo.png';
import Market from './Pages/Market';
import Footer from './Pages/Footer';
import { useNavigate } from 'react-router-dom';
import active from './Assets/active.png';
import deactive from './Assets/deactive.png';
function App() {
  const [apiResponse, setApiResponse] = useState(false);
  const navigate = useNavigate();



  


  function callApi() {
    fetch("http://localhost:3000/api/checkapi")
      .then(res => res.text())
      .then(res => setApiResponse(true))
      .catch(err => setApiResponse(false));
  }

  useEffect(() => {
    callApi();
    const intervalId = setInterval(callApi, 1000);
    return () => clearInterval(intervalId);
  }, []);


  function handleButtonClick(page) {
    navigate(page);
  }

  return (
<div className="App w-screen h-screen  overflow-y-auto ">
            <div className="header flex justify-center items-center w-full h-[4vw]  ">
                  <div className='w-[47.5vw] h-full  flex items-center '>
                      <img className='' src={logo}></img>
                  </div>
                  <div className='w-[47.5vw] h-full  fontRoboto flex'>
                      <div className='w-[34vw] h-full  flex items-center justify-center gap-[2vw]'>
                          <div className='w-auto h-full  flex justify-center items-center cursor-pointer headeritem'>Home</div>
                          <div className='w-auto h-full  flex justify-center items-center cursor-pointer headeritem'>About Us</div>
                          <div className='w-auto h-full  flex justify-center items-center cursor-pointer headeritem'>Market</div>
                          <div className='w-auto h-full  flex justify-center items-center cursor-pointer headeritem'>Contact Us</div>
                          <div className='w-auto h-full  flex justify-center items-center cursor-pointer headeritem'>FAQ</div>
                          {apiResponse ? (
                            <img src={active} className='cursor-pointer'></img>
                          ) : (
                            <img src={deactive} className='cursor-pointer'></img>
                          )}

                      </div>
                      <div className='w-[14.5vw] h-full  items-center justify-end flex gap-[0.5vw]'>
                          <div className='w-[6vw] h-[2.75vw]  signup flex justify-center items-center cursor-pointer' onClick={() => handleButtonClick('/signup')}>Sign Up</div>
                          <div className='w-[6vw] h-[2.75vw]  bg-black  flex justify-center items-center lgn cursor-pointer' onClick={() => handleButtonClick('/login')}>Log In</div>
                      </div>
                  </div>
            </div>
        <MainPage/>
        <Aboutus/>
        <Market/>
        <Contactus/>
        <Footer/>
      </div>
  );
}

export default App;

