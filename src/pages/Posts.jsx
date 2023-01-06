import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Posts = (props) => {
    const [posts, setPosts] = useState([])

    const BASE_URL = "https://fitness-accountability.herokuapp.com/"

    const getPosts = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allPosts = await response.json()
            setPosts(allPosts)
        } catch (err) {
            console.log(err)
        }
    }

    //currently cannot gain any information, May need to 
    //somehow connect to another page to gain access to information

    const loaded = () => {
        return (
            <>
                {posts?.map((post) => {
                    return (
                        <Link key={post._id} to={`/${post._id}`}>
                            <div className="post-container">
                                <p>user's icon/name will go here</p>
                                <img alt={post.tags} src={post.image} />
                                <p className="post-description">{post.description}</p>
                                <p className="post-tags">
                                    {post.tags?.map((tag) => {return `#${tag} `})}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </>
        )
    }

    const loading = () => (
        <section className="loading">
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
    )
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <section className="feed-container">
            {posts && posts.length ? loaded() : loading()}
        </section>
    )
}

export default Posts
