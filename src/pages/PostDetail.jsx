import {useState, useEffect} from 'react';
import {useParams} from 'react-router'

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
    console.log(`Current post: ${JSON.stringify(post)}`)

    //make a fetch:
    useEffect(() => {
        getPost()
    }, [])

    //Destroy route/DELETE request

    return (
        <div className="post-container">
            <h4>Name</h4> 
            {/* Name will need to be {profile.name}? */}
            {/* <img>Post Image</img> */}
            <div className="details">
                <p>Post Text</p>
                <p>Tags</p>
                <p>Workout Rating</p>
                <p>Workout Difficulty</p>
            </div>
            <button>Edit Post</button>
            <button>Delete Post</button>
        </div>
    )
}

export default PostDetail