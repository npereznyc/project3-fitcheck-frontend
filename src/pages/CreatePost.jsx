import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StarRating from "../components/StarRating"
import '../components/star.css'
import { getUserToken } from "../utils/authToken"
import UploadImage from "../components/UploadImage"

const CreatePost = (props) => {
    const token = getUserToken()
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
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
        e.preventDefault()
        postForm.tags = createTags(postForm.tags)
        const currentState = { ...postForm }
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
            const newPost = await response.json()
            setPosts([...posts, newPost])
            setPostForm({
                image: "",
                description: "",
                tags: "",
                rating: "",
                difficulty: ""
            })
            navigate("/")
        }
        catch (err) {
            console.error(err)
        }
    }

    const setImage = (newImage) => {
        setPostForm((oldPostForm) => {
            const formCopy = { ...oldPostForm }
            formCopy.image = newImage
            return formCopy
        })
    }

    const setWorkoutRating = (newRating) => {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues }
            copyOfPostForm.rating = newRating
            return copyOfPostForm
        })
    }

    const setDifficultyRating = (newRating) => {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues }
            copyOfPostForm.difficulty = newRating
            return copyOfPostForm
        })
    }
    return (
        <div>
            <section>
                <h2>Create New Post</h2>
                <div className="create-post">
                    <UploadImage uploadedImage={setImage} />
                    <br />
                    <form  onSubmit={handleSubmit}>
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
                        <br />
                        <div>
                            <label>
                                Description
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Enter description"
                                    value={postForm.description}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <br />
                        <div>
                            <label>
                                Tags
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    placeholder="separated by commas"
                                    value={postForm.tags}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <br />
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
                            <input type="submit" value="Post" />
                        </div>

                    </form>
                </div>

            </section>
        </div>
    )
}

export default CreatePost