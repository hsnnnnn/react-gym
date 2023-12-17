import vector from '../Assets/vector.png';
function App() {
    return (
<div className="App w-[100vw] h-[100vh] flex  gap-[1vh] justify-center  overflow-y-auto ">
            <div className="w-[60vw] h-[96vh]  flex flex-col items-center gap-[0.8vw]">
                <img src={vector}></img>
                <p className='abtusheader'>About Us</p>
                <p className='abtussectiontext'>Medium length section heading</p>
                <div className='w-full h-auto  sectiondesc flex  justify-center right-align'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
                    Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat
                    Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat
                    Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat
                    </div>
                <div className='w-[8vw] h-[3vw]  abtpagesbtn flex justify-center items-center cursor-pointer'>See All</div>
            </div>
      </div>
    );
  }
  
export default App;