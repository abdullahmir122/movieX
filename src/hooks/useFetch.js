import React,{useEffect,useState} from 'react' 
import {fetchDataFromApi} from '../utils/api'

const useFetch = (url) => {
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(null)
    const [data,setData] = useState(null)

    useEffect(()=>{
        setLoading("Loading...")
        setError(null)
        setData(null)

        fetchDataFromApi(url)
        .then((res)=>{
            setLoading(false);
            setData(res)
        }).catch((err)=>{
            setLoading(false)
            setError("Some thing wents Wrong")
        })
    },[url])

    return {data,error,loading} 
}

export default useFetch