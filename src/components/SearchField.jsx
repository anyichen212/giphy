import React,{useEffect, useState} from "react";
import Gifs from "./Gifs";

const SearchField = () => {
    const[search,setSearch] = useState('');
    console.log(search);

    return (
        // (search bar) input search words
        // pass the input words to Gifs.jsx
        <div style={{padding:"5px"}}>
            <label className="inputText" 
            style={{
                color:"whiteSmoke"
                }}
            >Input Your Search :  </label>
            <input className="inputText" type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <Gifs keyWord={search} />
        </div>

    );
};

export default SearchField;