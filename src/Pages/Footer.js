import mail from '../Assets/mail.png';
import phone from '../Assets/phone.png';
import location from '../Assets/location.png';



function App() {
    return (
      <div className="App w-[100vw] h-[50vh] flex items-center flex-col gap-[1vh] justify-center  overflow-y-auto ">
            <div className='w-full h-[40vh]  footerdesc flex justify-center items-center'>
                <div className='w-[25vw] h-full  flex flex-col justify-center items-center gap-[0.5vw]'>
                    <img src={mail}></img>
                    <p className='footerindex'>Mail</p>
                    <p className='footerindexdec'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className='mail cursor-pointer'>hello@relume.io</p>
                </div>
                <div className='w-[25vw] h-full  flex flex-col justify-center items-center gap-[0.5vw]'>
                    <img src={phone}></img>
                    <p className='footerindex'>Phone</p>
                    <p className='footerindexdec'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className='mail cursor-pointer'>+1 (555) 000-0000</p>
                </div>
                <div className='w-[25vw] h-full  flex flex-col justify-center items-center gap-[0.5vw]'>
                    <img src={location}></img>
                    <p className='footerindex'>Location</p>
                    <p className='footerindexdec'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in ero.</p>
                    <p className='mail cursor-pointer'>123 Sample St, Sydney NSW 2000 AU</p>
                </div>
            </div>
            <div className='w-full h-[5vh]   flex gap-[0.8vw] justify-center items-center'>
                <p className='footeritems'>Twitter</p>
                <p className='footeritems'>Instagram</p>
                <p className='footeritems'>Youtube</p>
                <p className='footeritems'>Discord</p>
            </div>
            <div className='w-full h-[15vh]  flex items-end justify-center'>
                <div className='w-[75.5vw] h-[15vh]  endof flex justify-between items-center'>
                    <p className='arr'>© 2023 HSN INC. All rights reserved.</p>
                    <div className='w-[25vw] h-full  flex items-center justify-end gap-[0.5vw]'>
                         <p className='arrp'>Privacy Policy</p>
                         <p className='arrp'>Terms of Service</p>
                         <p className='arrp'>Cookies Settings</p>
                    </div>
                </div>
            </div>
      </div>
    );
  }
  
export default App;