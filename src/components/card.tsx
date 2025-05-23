
import React from 'react'
import { dataProp } from '../../data'

const Card = ({name}: dataProp) => {

  return (
    <div className='w-fit py-2 px-4 bg-gray-600 rounded-md cursor-pointer hover:bg-gray-700'>
        <h1 className='text-xl'>{name}</h1>
    </div>
  )
}

export default Card