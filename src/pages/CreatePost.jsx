import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StarRating from "../components/StarRating"
import '../components/star.css'
import { getUserToken } from "../utils/authToken"
import UploadImage from "../components/UploadImage"

export default function CreatePost() {
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

    function handleChange(e) {
        const userInput = { ...postForm }
        userInput[e.target.name] = e.target.value
        setPostForm(userInput)
    }

    async function handleSubmit(e) {
        function createTags(str) {
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

    function setImage(newImage) {
        setPostForm((oldPostForm) => {
            const formCopy = { ...oldPostForm }
            formCopy.image = newImage
            return formCopy
        })
    }

    function setWorkoutRating(newRating) {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues }
            copyOfPostForm.rating = newRating
            return copyOfPostForm
        })
    }

    function setDifficultyRating(newRating) {
        setPostForm((oldPostFormValues) => {
            const copyOfPostForm = { ...oldPostFormValues }
            copyOfPostForm.difficulty = newRating
            return copyOfPostForm
        })
    }
    return (
        <section>
            <h2>Create New Post</h2>
            <div className="create-post">
                <UploadImage uploadedImage={setImage} />
                <br />
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
                        <input type="submit" className="submit-button" value="Post" />
                    </div>
                </form>
            </div>
        </section>
    )
}