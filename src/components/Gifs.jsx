import React,{useEffect, useState} from "react";
import axios from "axios";
import GifCards from "./GifCards";

const Gifs = (props) => {
    const[gifList,setGifList] = useState([]); //hold array of gifs
    const[searchList,setSearchList] = useState([]); //hold array of gifs
    const[trendList, setTrendList] = useState([]); //list of trend
    const[trend, setTrend] = useState(true); //if on trend page
    const[isLoading, setIsLoading] = useState(true);
    const api_key = "XpeDWbQQyyU3qdmUxQVyNxfCq0DHFKA4";

    useEffect(() => {
        async function fetchTrend(){
            await axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
            .then(response => setGifList(response.data.data));

            setTrendList(gifList);
        }

        fetchTrend();
        setIsLoading(false);
      }, [trend]);

    useEffect(() => {
        async function fetchSearch(){
        try {
            //fetch data everytime Search is click, then set it as the gifList array
            await axios.get(`http://api.giphy.com/v1/gifs/search?q=${props.keyWord}&api_key=${api_key}`)
            .then(response => setSearchList(response.data.data));
            setIsLoading(false);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
            }
        }

        fetchSearch();
            
      }, [searchList]);
      
    

    const clickSearch = () =>{
        setIsLoading(true);
        setGifList(searchList);
    };

    const clickTrend = () => {
        console.log(trendList);
        setIsLoading(true);

        if(trend === false)
            setTrend(true);
        else
            setTrend(false);

        setIsLoading(false);
    };

    const clickRandom = async() => {
        setIsLoading(true);

        //
        await axios.get(`http://api.giphy.com/v1/gifs/random?api_key=${api_key}`)
        .then(response => setGifList([response.data.data]));

        setIsLoading(false);
    };
    
    
    if(isLoading){
        return (
            <div>
                <input type="submit" value="Search" onClick={clickSearch}></input>
    
                <div>
                    <button onClick={clickTrend}>Trending</button>
                    <button onClick={clickRandom}>Random Gif</button>
                </div>
    
                <div style={{fontSize: "30px" }}>Loading...</div>
            </div>
        );
    }

    return (
        //map gifList, each iterate value(gif) will be pass to GifCards to be style into their individual gif cards
        <div>
            <input className="submit" type="submit" value="Search" onClick={clickSearch}></input>

            <div>
                <button onClick={clickTrend}>Trending</button>
                <button onClick={clickRandom}>Random Gif</button>
            </div>

            <div className="gifs">{gifList.map((gif,index)=>{
                return <GifCards gif={gif} key={index}/>
            })}</div>
        </div>
    );
};

export default Gifs;