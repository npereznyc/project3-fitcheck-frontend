import { useState, useEffect } from 'react'


const CreatePost = (props) => {

    //form state
    const [newform, setNewForm] = useState({
        image: "",
        description: "",
        tags: "",
        workout_rating: "",
        workout_difficulty: ""
    })

    //handleChange and handleSubmit functions

    return (
        <div>
            <section>
                <h2>Create New Post</h2>
                <form>
                    <div>
                        <label>
                            Image
                            <input
                            // type="text" 
                            // id="image"
                            // name="image" 
                            placeholder="image url" 
                            // value={}
                            // onChange={}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description
                            <input
                            // type="text" 
                            // id="description"
                            // name="description" 
                            placeholder="description" 
                            // value={}
                            // onChange={}
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Tags
                            <input
                            // type="text" 
                            // id="tags"
                            // name="tags" 
                            placeholder="tags" 
                            // value={}
                            // onChange={}
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