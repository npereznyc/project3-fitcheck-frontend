import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import EditPost from './EditPost';

const PostDetail = (props) => {
    const [post, setPost] = useState(null)

    //Show route/GET request
    const { id } = useParams()

    const URL = `https://fitness-accountability.herokuapp.com/post/${id}`

    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            console.log(result)
            setPost(result)

        } catch (err) {
            console.log(err)
        }
    }
    console.log(`Current post(detail): ${JSON.stringify(post)}`)

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])

    //Destroy route/DELETE request

    const loaded = () => {
        return (
            <div className="post-container">
                <h4>Name</h4>
                {/* Name will need to be {profile.name}? */}
                <img src={post.image} alt={post.description} />
                <div className="details">
                    <p>{post.description}</p>
                    <p>Tags: {post.tags}</p>
                    <p>Workout Rating: {post.rating}</p>
                    <p>Workout Difficulty: {post.difficulty}</p>
                </div>
                <EditPost />
            </div>
        )
    }
    const loading = () => {
        return <h1>
            Loading...
            <span>
                {" "}
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                />
            </span>
        </h1>
    }
    return (
        <section className="ShowPost">
            {post ? loaded() : loading()}
        </section>
    )

}

export default PostDetail