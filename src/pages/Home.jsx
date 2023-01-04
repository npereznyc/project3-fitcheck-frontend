import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const [posts, setPosts] = useState([]);

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

  const loaded = () => {
    return (
      <>
        <section className="post-list">
          {posts?.map((post) => {
            return (
              <Link key={post._id} to={`/posts/${posts._id}`}>
                <div className="person-card">
                  <h1>{posts.name}</h1>
                  <img alt="" src={posts.image} />
                  <h3>{posts.text}</h3>
                </div>
              </Link>
            );
          })}
        </section>
      </>
    );
  };

  const loading = () => (
    <section className="people-list">
      <h1>
        Loading...
        <span>
          {" "}
          <img
            alt="spinner"
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />
        </span>
      </h1>
    </section>
  );
  useEffect(() => {
    getPosts();
  }, []);
};

export default Posts;
