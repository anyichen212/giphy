import React from "react";

const GifCards = (props) => {

    //console.log(props);
    //individual gifs
    return (
        <div className="card">
            <img src={props.gif.images.fixed_height.url} alt="gif" />
            <h4>{props.gif.title}</h4>
            <a href={props.gif.embed_url}>URL</a>
            <p>Upload by {props.gif.username}</p>
        </div>

    );
};

export default GifCards;