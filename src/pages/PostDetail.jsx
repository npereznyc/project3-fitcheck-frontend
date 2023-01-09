import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../data'
// import { getUserToken } from '../utils/authToken'
import { useParams } from 'react-router'
import EditPost from './EditPost'
// import { useCallback } from 'react'

const PostDetail = (props) => {
    const { currentUserID } = useContext(UserContext)
    // const token = getUserToken()
    
    const [post, setPost] = useState(null)

    //Show route/GET request
    const { id } = useParams()

    const URL = `https://fitness-accountability.herokuapp.com/post/${id}`

    const getPost = async () => {
        try {
            const response = await fetch(URL)
            const result = await response.json()
            // console.log(result)
            setPost(result)

        } catch (err) {
            console.error(err)
        }
    }

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])
    // Needs empty dependency array, otherwise causes an infinite loop

    const isOwner = currentUserID === post?.owner

    const loaded = () => {
        return (
            <div className="post-container">
                <h4>Posted by user: {post.owner}</h4>
                <img src={post.image} alt={post.description} />
                <div className="details">
                    <p>{post.description}</p>
                    <p>Tagged: {post.tags?.map((tag) => `#${tag} `)}</p>
                    <p>Workout Rating: {post.rating}</p>
                    <p>Workout Difficulty: {post.difficulty}</p>
                </div>
                {isOwner ? <EditPost /> : null}
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
                    alt='loading'
                />
            </span>
        </h1>
    }
    return (
        <section className="PostDetail">
            {post ? loaded() : loading()}
        </section>
    )

}

export default PostDetail