import React,{useState, useEffect} from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const HeroBanner = () => {
  
  const {data , loading} = useFetch('/movie/upcoming') 

  useEffect(()=>{
    const bg = data.results
    // .backdrop_path
  },[data])

  const [query,setQuery] = useState("");
  const [background,setBackground] = useState("")
  const navigate = useNavigate();
 
  const searchQueryHandler = (event) =>{
    if(event.key === 'Enter' && query.length > 0){
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
          <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div>
    </div>
  )
}

export default HeroBanner