import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";

const Geners = ({data}) => {
    const {genres} = useSelector((state)=>state.home)
    return (
    <div className='genres'>
        {data?.map((g,key)=>{
            if(!genres[g]?.name){
                return
            }
            return(
                <div className="genre" key={key}>
                    {genres[g]?.name}
                </div>
            )
        })
        }
    </div>
  )
}

export default Geners