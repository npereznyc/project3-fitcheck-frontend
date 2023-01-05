import React from 'react';
import { FaStar } from "react-icons/fa";
import './star.css'

const StarRating = (props) => {
    return(
        <div className="stars">
            {[ ...Array(5)].map((star) => {
                return( 
                <label>
                <input type="radio" name="rating" />
                <h1><FaStar /></h1>
                </label>
            )})}
        
        </div>
    )
}

export default StarRating                                                                                                                                                