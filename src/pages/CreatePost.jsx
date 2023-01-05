import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import StarRating from "../components/StarRating";
import '../components/star.css'

const CreatePost = (props) => {
    
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()
  //form state
  const [postForm, setPostForm] = useState({
    image: "",
    description: "",
    tags: "",
    workout_rating: "",
    workout_difficulty: "",
  });

  const BASE_URL = "https://fitness-accountability.herokuapp.com/post/";

  const handleChange = (e) => {
    const userInput = { ...postForm };
    userInput[e.target.name] = e.target.value;
    console.log(userInput);
    setPostForm(userInput);
  };

  const handleSubmit = async (e) => {
    // 0. prevent default (event object method)
    console.log("handling submit");
    e.preventDefault();
    // 1. capturing our local state
    const currentState = { ...postForm };
    // check any fields for property data types / truthy value
    try {
      console.log("try block");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      const response = await fetch(BASE_URL, requestOptions);
      console.log(response);

      const newPost = await response.json();
      console.log(newPost);

      setPosts([...posts, newPost]);
      setPostForm({
        image: "",
        description: "",
        tags: "",
        workout_rating: "",
        workout_difficulty: "",
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div>
        
      <section>
        <h2>Create New Post</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Image
              <input
                type="text"
                id="image"
                name="image"
                placeholder="image url"
                value={postForm.image}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Description
              <input
                type="text"
                id="description"
                name="description"
                placeholder="description"
                value={postForm.description}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Tags
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="tags"
                value={postForm.tags}
                onChange={handleChange}
              />
            </label>
          </div>
            
          <div>
          
            <label>

              Workout Rating
        <StarRating />

              <input
                // type=??
                // id="rating"
                // name="rating"
                placeholder="workout rating"
                // value={}
                // onChange={}
              />
            </label>
          </div>

          <div>
            <label>
            
              Workout Difficulty
                <StarRating />

              <input
                // type=??
                // id="difficulty"
                // name="difficulty"

                placeholder="workout difficulty"
                // value={}
                // onChange={}
              />
            </label>

            <br />

            <input type="submit" value="Post" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePost