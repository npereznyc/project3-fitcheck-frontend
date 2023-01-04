import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    text: "",
  });

  const BASE_URL = "http://localhost:4000/";
  //Base Url suggestion

  const getPosts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const allPosts = await response.json();
      setPosts(allPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const userInput = { ...newForm };
    userInput[e.target.name] = e.target.value;
    setNewForm(userInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...newForm };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      const response = await fetch(BASE_URL, requestOptions);
      const createdPosts = await response.json();
      console.log(createdPosts);
      setPosts([...posts, createdPosts]);
      setNewForm({
        name: "",
        image: "",
        text: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const loaded = () => {
    return (
      <>
        <section className="post-list">
          {posts?.map((post) => {
            return (
              <Link key={post._id} to={`/posts/${posts._id}`}>
                <div className="person-card">
                  <h1>{posts.name}</h1>
                  <img src={posts.image} />
                  <h3>{posts.text}</h3>
                </div>
              </Link>
            );
          })}
        </section>
      </>
    );
  };
};



export default Posts
