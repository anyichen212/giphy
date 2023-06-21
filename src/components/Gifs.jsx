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

    //fetch for trend gif and save it in trendList
    useEffect(() => {
        async function fetchTrend(){
            await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
            .then(response => setGifList(response.data.data));

            setTrendList(gifList);
        }

        fetchTrend();
        setIsLoading(false);
      }, [trend]);

    //fetch for search key gif and save it in searchList
    //updates everytime a value is enter in the search bar
    useEffect(() => {
        async function fetchSearch(){
        try {
            //fetch data everytime Search is click, then set it as the gifList array
            await axios.get(`https://api.giphy.com/v1/gifs/search?q=${props.keyWord}&api_key=${api_key}`)
            .then(response => setSearchList(response.data.data));
            setIsLoading(false);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
            }
        }

        fetchSearch();
            
      }, [searchList]);
      
    
    //search onClick that show an array of gif with the search keyword
    const clickSearch = () =>{
        setIsLoading(true);
        setGifList(searchList);
    };

    //trend onClick that shows trendList
    const clickTrend = () => {
        console.log(trendList);
        setIsLoading(true);

        if(trend === false)
            setTrend(true);
        else
            setTrend(false);

        setIsLoading(false);
    };

    //shows when Random is click
    const clickRandom = async() => {
        setIsLoading(true);

        //fetch for 1 random gif
        await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}`)
        .then(response => setGifList([response.data.data]));

        setIsLoading(false);
    };

    const clickFilter = async(e) => {
        setIsLoading(true);

        //fetch for an array of gif from a filter word
        await axios.get(`https://api.giphy.com/v1/gifs/search?q=${e.currentTarget.value}&api_key=${api_key}`)
        .then(response => setGifList(response.data.data));

        setIsLoading(false);
    };
    
    if(isLoading){
        return (
            <div>
                <input className="submit" type="submit" value="Search" onClick={clickSearch}></input>
    
                <div>
                    <button onClick={clickTrend}>Trending</button>
                    <button onClick={clickRandom}>Random Gif</button>
                    <button onClick={clickFilter} value="grumpy-cat">Cats</button>
                    <button onClick={clickFilter} value="dog">Dogs</button>
                    <button onClick={clickFilter} value="red-panda">Pandas</button>
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
                <button onClick={clickFilter} value="grumpy-cat">Cats</button>
                <button onClick={clickFilter} value="dog">Dogs</button>
                <button onClick={clickFilter} value="red-panda">Pandas</button>
            </div>

            <div className="gifs">{gifList.map((gif,index)=>{
                return <GifCards gif={gif} key={index}/>
            })}</div>
        </div>
    );
};

export default Gifs;