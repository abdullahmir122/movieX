import React from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'

const Details = () => {
  const {id , media_type} =  useParams();  
  return (
    <div>Details</div>
  )
}

export default Details