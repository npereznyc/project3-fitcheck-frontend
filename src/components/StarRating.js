import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./star.css";

const StarRating = (props) => {
  const [values, setValues] = useState(null);
  const [hover, setHover] =useState(null)
  const setRating = props.setRating;
  return (
    <div className="stars">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        return (
            <label key={index}> 
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => {setValues(starValue);
            setRating(starValue);}
              
              }
              />
            <FaStar className="star" color={starValue <= (hover || values) ? "#F2F217" : "#DFDFD5"}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
