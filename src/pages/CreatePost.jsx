import { useState, useEffect } from 'react'


const CreatePost = (props) => {

    //form state
    const [postForm, setPostForm] = useState({
        image: "",
        description: "",
        tags: "",
        workout_rating: "",
        workout_difficulty: ""
    })

    const BASE_URL = "http://localhost:4000/"

   
     const handleChange = (e) => {
        const userInput = {...postForm}
        userInput[e.target.name] = e.target.value
        console.log(userInput)
        setPostForm(userInput)
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = {...postForm}
        // check any fields for property data types / truthy value
        try{
            const requestOptions = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            } 
            const response = await fetch(BASE_URL, requestOptions)
            const newPost = await response.json()
            console.log(newPost)

            setPostForm({
                image: "",
                description: "",
                tags: "",
                workout_rating: "",
                workout_difficulty: ""
            })

        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <section>
                <h2>Create New Post</h2>
                <form>
                    <div>
                        <label>
                            Image
                            <input
                            type="text" 
                            id="image"
                            name="image" 
                            placeholder="image url" 
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
                            <input
                            // type=??
                            // id="rating"
                            // name="rating" 
                            placeholder="workout rating" 
                            // value={}
                            // onChange={}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Workout Difficulty
                            <input
                            // type=??
                            // id="difficulty"
                            // name="difficulty" 
                            placeholder="workout difficulty" 
                            // value={}
                            // onChange={}
                            />
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