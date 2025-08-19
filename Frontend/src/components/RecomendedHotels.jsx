import React, { useEffect, useState } from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

function RecomendedHotels() {

  const { rooms, searchedCities } = useAppContext();
  const [ recomended, setRecomended ] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city))

    setRecomended(filteredHotels);
  }

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return recomended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 bg-slate-50'>

      <Title title="Recommended Hotels" subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences." align="center" font="font-bold" />
        <div className='flex flex-wrap items-center justify-center gap-10 mt-20'>
            {recomended.slice(0, 4).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index} />
            ))}
        </div>

        <button onClick={() => {navigate('/rooms'); scrollTo(0, 0)}} className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>View All Destinations</button>

    </div>
  )
}

export default RecomendedHotels