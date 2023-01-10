import { useState, useContext } from "react"
import { UserContext } from "../data"
// import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import StarRating from "../components/StarRating"
import '../components/star.css'
import { getUserToken } from "../utils/authToken"
import UploadImage from "../components/UploadImage"

const CreatePost = (props) => {
    const token = getUserToken()
    const { currentUserName } = useContext(UserContext)

    const [posts, setPosts] = useState([])

    const navigate = useNavigate()
    //form state
    const [postForm, setPostForm] = useState({
        image: "",
        description: "",
        tags: "",
        rating: "",
        difficulty: ""
    })

    const BASE_URL = "https://fitness-accountability.herokuapp.com/post/"

    const handleChange = (e) => {
        const userInput = { ...postForm }
        userInput[e.target.name] = e.target.value
        setPostForm(userInput)
    }

    const handleSubmit = async (e) => {
        const createTags = (str) => {
            let arr = str.split(',')
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][0] === ' ') {
                    arr[i] = arr[i].substring(1, arr[i].length)
                }
            }
            return arr
        }
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        postForm.tags = createTags(postForm.tags)
        const currentState = { ...postForm }
        // check any fields for property data types / truthy value
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState),
            }
            const response = await fetch(BASE_URL, requestOptions)
            // console.log(response)

            const newPost = await response.json()
            // console.log(newPost)

            setPosts([...posts, newPost])
            setPostForm({
                image: "",
                description: "",
                tags: "",
                rating: "",
                difficulty: ""
            })
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }
    
    const setImage = (newImage) => {
        setPostForm((oldPostForm) => {
            const formCopy = {...oldPostForm}
            formCopy.image = newImage
            console.log("Post form is now: ", formCopy)
            return formCopy
        })
    }

    const setWorkoutRating = (newRating) => {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues };
            copyOfPostForm.rating = newRating;
            console.log("Post form is now: ", copyOfPostForm)
            return copyOfPostForm;
        })
    }

    const setDifficultyRating = (newRating) => {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues };
            copyOfPostForm.difficulty = newRating;
            console.log("Post form is now: ", copyOfPostForm)
            return copyOfPostForm;
        })
    }
    return (

        <div>

            <section>
                <h2>Create New Post</h2>
               <UploadImage 
               uploadedImage={setImage}
               />

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <input
                                hidden={true}
                                type="url"
                                id="image"
                                name="image"
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
                            <StarRating
                                setRating={setWorkoutRating}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Workout Difficulty
                            <StarRating setRating={setDifficultyRating} />
                        </label>
                        <br />
                        <input type="submit" value="Post" />
                    </div>

                </form>
            </section>
        </div>
    )
}

export default CreatePost