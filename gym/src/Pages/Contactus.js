import { useState, useRef  } from "react";

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'



// Desc: Contact us page
function App() {
  const mapRef = useRef(null);

    const [activeCity, setActiveCity] = useState(1);
    let center = [37.8407428, 27.8371873];
    const cities = [
      { name: 'Sydney', adress : "1600 Amphitheatre Parkway, Mountain View, CA", id: 0 },
      { name: 'Tokyo', adress : "1600 Amphitheatre Parkway, Mountain View, CA", id: 1 },
      { name: 'Paris', adress : "1600 Amphitheatre Parkway, Mountain View, CA", id: 2 },
      { name: 'Aydin', adress : "Aydın, Efeler, Aydın, Ege Bölgesi, 09110, Türkiye", id: 3 },
    ];


  
    const handleCityClick = (id) => {
      console.log(cities[id].adress)
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cities[id].adress)}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            center = [lat, lon];
            mapRef.current.setView(center, 13); // 13, zoom seviyesidir
            setActiveCity(id);
          } else {
            console.error('Koordinatlar alınamadı.');
          }
        })
        .catch(error => console.error('Jeokodlama hatası:', error));

    };
    return (
        <div className="App w-[100vw] h-[100vh] flex  gap-[1vh] justify-center  overflow-y-auto ">
           <div className="w-[80vw] h-[45vw]  flex flex-col gap-[0.8vw] ">
                <p className="contacttag">Tagline</p>
                <p className="contactlocation">Locations</p>
                <p className="contactdesc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <div className="w-full h-[30vw]  flex">
                    <div className="w-1/2 h-full  flex flex-col relative  overflow-auto">

                    {cities.map((city) => (
                    <div
                        key={city.id}
                        onClick={() => handleCityClick(city.id)}
                        
                    >
                            <div  className={activeCity === city.id ? 'w-full h-[7vw]  flex justify-end items-center active cursor-pointer' : 'w-full h-[7vw]  flex justify-end items-center cursor-pointer'}>
                            <div className="w-[97.5%] h-full  flex flex-col">
                                <div className="w-full h-1/3  locationheader flex items-center" >{city.name}</div>
                                <div className="w-full h-1/3  locationinfo flex items-center">{city.adress}</div>
                                <div className="w-full h-1/3  viewmap flex items-end ">View Map</div>
                            </div>
                        </div>
                        </div>
                        ))}


                    </div>
                    <div className="w-1/2 h-full  overflow-hidden mapcontainer">
                    <MapContainer center={center} zoom={13} scrollWheelZoom={false} ref={mapRef} className="w-full h-full "  attributionControl={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={center}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
                    </div>
                </div>
            </div>
      </div>
    );
  }
  
export default App;