import Starts from '../Assets/Stars.png'
import item from '../Assets/itembg.png'
function App() {
    return (
      <div className="App w-[100vw] h-[100vh] flex items-center gap-[1vh] justify-center  overflow-y-auto">
            <div className="w-[80vw] h-[45vw]  flex flex-col gap-[1vw]">
                <p className="market-header">Market &#62; Favorites &#62; Creatine Monohydrate</p>
                <div className="w-full h-[75vw]  flex flex-col gap-[0.5vw]">
                    <p className="market-item-header">Creatine Monohydrate</p>
                    <div className="w-full h-[2vw] iteminfo  flex gap-[0.5vw]">
                        <div className="w-[3.5vw] h-full  iteminfo-price flex items-center">
                            $155 
                        </div>
                        <div className='w-[50vw]  h-full flex items-center gap-[0.2vw] stats'>
                            <img src={Starts}></img>
                            <p>(3.5) stars</p>
                        </div>
                    </div>
                    <div className='w-[35vw] itemdescription  h-[10vw] flex  gap-[0.2vw] stats'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                    </div>
                    <div className='w-full h-[21.5vw]  flex'>
                        <div className='w-1/2 h-full  flex  gap-[0.5vw]'>
                            <div className='w-[7.5vw] h-[3.5vw]  buynow flex justify-center items-center cursor-pointer'>Buy Now</div>
                            <div className='w-[7.5vw] h-[3.5vw]  addtocart flex justify-center items-center cursor-pointer'>Add to Cart</div>
                            <div className='w-[7.5vw] h-[3.5vw]  seemore flex justify-center items-center cursor-pointer'>See More &gt;</div>
                        </div>
                        <div className='w-1/2 h-full  overflow-hidden flex justify-center items-center'>
                            <img src={item} className='w-full h-full'></img>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
  
export default App;