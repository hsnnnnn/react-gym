import img from '../Assets/image.png';
function App() {
    return (
      <div className="App w-[100vw] h-[96vh] flex items-center gap-[1vh] justify-center  overflow-y-auto">
            <div className="w-[45vw] h-[50vh]  flex flex-col justify-center items-end gap-[0.4vw]">
                <div className='w-[43vw] h-[4vh]  flex items-center abtheader'>
                    Offers
                </div>
                <div className='w-[43vw] h-[4vh]  flex items-center prsnl'>
                    Personal Training
                </div>
                <div className='w-[43vw] h-[15vh]  flex items-center abtmessage'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                </div>
                <div className='w-[43vw] h-[6vh]  flex items-center '>
                    <div className='w-[6vw] h-full  flex justify-center items-center applybtn cursor-pointer'>Apply</div>
                </div>
            </div>
            <div className="w-[35vw] h-[60vh]  imgcontainer rounded-lg overflow-hidden flex justify-center items-center cursor-pointer">
                <img src={img}></img>
            </div>
      </div>
    );
  }
  
export default App;