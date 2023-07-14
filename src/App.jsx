import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api"; 
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./StoreFolder/HomeSlice"; 

import Home from './pages/home/Home'
import ErrorPage from './pages/404/ErrorPage'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResults from './pages/searchResult/SearchResult'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'



function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)
  useEffect(() => {
    fetchApiConfiguration();
    generesCall();
  }, []); 

  const fetchApiConfiguration = () => {
    fetchDataFromApi("/configuration").then((res) => { 
      console.log(res)
      const url =  {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",

      }
      dispatch(getApiConfiguration(url))
    });
  };


  const generesCall = async () =>{
      let promises = []
      let endPoints = ["tv","movie"]
      let allGenres = {}

      endPoints.forEach((url)=>{
         promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })

      const data = await Promise.all(promises)
      console.log(data)
      data.map(({genres})=>{
        return genres.map((items)=> (allGenres[items.id] = items))
      })

      dispatch(getGenres(allGenres))

  }

  return (
    <div> 
      <BrowserRouter>
      <Header/>
          <Routes>
              <Route path="/"  element={<Home/>}  /> 
              <Route path="/:mediaType/:id" element={<Details/>} />
              <Route path="/search/:query" element={<SearchResults/>} />
              <Route path="/explore/:mediaType" element={<Explore/>} />
              <Route path="*" element={<ErrorPage/>} /> 
          </Routes> 
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
