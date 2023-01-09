import React from "react";  
import {useState} from "react"
import {FaHeart, FaRegHeart} from 'react-icons/fa'

const LikeButton = () => {
    const [likes, setLikes] = useState()
    const [Clicked, setClicked] = useState(false)
    const handleChange = () => {
        if (Clicked){
            setClicked(true)
        }else{
            setClicked(false)
        }
        }
    
    return (
       <button><FaHeart onclick = {handleChange}/></button>
    //    <div>
    //   <FaHeart />
    //   <FaRegHeart />
    // </div>
           
    )      

}