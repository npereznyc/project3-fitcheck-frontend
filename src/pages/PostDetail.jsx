import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../data'
import { useParams } from 'react-router'
import EditPost from './EditPost'
// import { useCallback } from 'react'

const PostDetail = (props) => {
    const { currentUser } = useContext(UserContext)
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
            // console.log(`currentUser._id`, currentUser._id)
            // console.log(`post.owner._id`, post.owner._id)

        } catch (err) {
            console.error(err)
        }
    }

    // This causes the compiler not to warn, but causes an infinite loop?
    // const getPost = useCallback(async () => {
    //     try {
    //         const response = await fetch(URL)
    //         const result = await response.json()
    //         // console.log(result)
    //         setPost(result)
    //         console.log(`currentUser._id`, currentUser._id)
    //         console.log(`post.owner._id`, post.owner._id)

    //     } catch (err) {
    //         console.error(err)
    //     }
    // }, [URL, currentUser._id, post.owner._id])

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])
    // Needs empty dependency array, otherwise causes an infinite loop

    // const isOwner = currentUser?._id === post?.owner?._id
    
    const loaded = () => {
        return (
            <div className="post-container">
                <h4>Posted by user: {post.owner}</h4>
                {/* <p>{isOwner ? `yes` : `nope`}</p> */}
                {/* {isOwner} isn't working? */}
                <img src={post.image} alt={post.description} />
                <div className="details">
                    <p>{post.description}</p>
                    <p>Tagged: {post.tags?.map((tag) => `#${tag} `)}</p>
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
                    alt=''
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