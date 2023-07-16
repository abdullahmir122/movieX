 import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImages/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";

import Geners from "../geners/Geners";

const Carousel = ({data , loading , endPoint}) => {

    const {url} = useSelector((state)=> state.home)
    const navigate = useNavigate();
    const containerRef = useRef();

    const navigation = (dir) =>{ 
        const container =  containerRef.current

        const scrollAmount = dir === "left" ?  container.scrollLeft - (container.offsetWidth + 20 ):
        container.scrollLeft + (container.offsetWidth + 20 )

        container.scrollTo({
            left: scrollAmount,
            behaviour : "smooth",
        })
    }
    const skItem = () =>{
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
  return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=> navigation("left")}/>
            <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=> navigation("right")}/>
            {!loading ? 
            (
                <div className="carouselItems" ref={containerRef}>
                    {data?.map((item)=>{
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        return(
                            <div key={item.id} className="carouselItem" onClick={()=> navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                                 <div className="posterBlock">
                                    <Img src={posterUrl}/>
                                    <CircleRating rating={item.vote_average.toFixed(1)}/>
                                    <Geners data={item.genre_ids.slice(0,2)}/>
                                </div>
                                <div className="textBlock text__blokk">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_Date).format("MMM D,YYYY")}
                                    </span>
                                </div>
                            </div>
                            
                        )
                    })

                    }
                </div>
            ) :
            (
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            ) 
            } 
            
        </ContentWrapper>
    </div>
  )
}

export default Carousel