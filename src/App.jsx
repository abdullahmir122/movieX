import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api"; 
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration } from "./StoreFolder/HomeSlice"; 

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
    apitesting();
  }, []); 

  const apitesting = () => {
    fetchDataFromApi("/movie/popular").then((res) => { 
      dispatch(getApiConfiguration(res))
    });
  };
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
