import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
import StarRating from "../components/StarRating";


const EditPost = (props) => {
  const token = getUserToken();

  //Update route/PUT request
  const [post, setPost] = useState(null);
  const [editForm, setEditForm] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `https://fitness-accountability.herokuapp.com/post/${id}`;

  const getPost = async () => {
    try {
      const response = await fetch(URL);
      const result = await response.json();
      // console.log(result)
      setPost(result);
    } catch (err) {
      console.error(err);
    }
  };
  // console.log(`Current post (edit): ${JSON.stringify(post)}`)

  //make a fetch:
  useEffect(() => {
    getPost();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const updatedPost = { ...editForm };
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      };
      await fetch(URL, requestOptions);
      navigate(`/`);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (e) => {
    try {
      //configure our delete request
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await fetch(URL, options);
      navigate(`/`);
    } catch (err) {
      console.error(err);
      //stretch goal: populate error message on page when delete fails
      //populate some state for 3 seconds, then redirect to a 404 page
    }
  };

  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  const setWorkoutRating = (newRating) => {
    setEditForm((oldEditFormValues) => {
      const copyOfEditForm = { ...oldEditFormValues };
      copyOfEditForm.rating = newRating;
      console.log("Post form is now: ", copyOfEditForm);
      return copyOfEditForm;
    });
  };

  const setDifficultyRating = (newRating) => {
    setEditForm((oldEditFormValues) => {
      const copyOfEditForm = { ...oldEditFormValues };
      copyOfEditForm.difficulty = newRating;
      console.log("Edit form is now: ", copyOfEditForm);
      return copyOfEditForm;
    });
  };

  return (
    <>
      <section className="edit-post">
        <h2>Edit this Post</h2>
        <form onSubmit={updatePost}>
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="update image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.description}
            name="description"
            placeholder="edit description"
            onChange={handleChange}
          />

          <input
            type="text"
            value={editForm.tags}
            name="tags"
            placeholder="edit tags"
            onChange={handleChange}
          />

          <label>
            Workout Rating
            <StarRating setRating={setWorkoutRating} />
          </label>
          <label>
            Workout Difficulty
            <StarRating setRating={setDifficultyRating} />
          </label>
          <input type="submit" value="Edit Post" />
        </form>
      </section>
      <section className="delete-post">
        {/* <h1>{profile.name}</h1> ?? will need authentication in order to detect the user's name */}
        <div>
          <br />
          Delete this Post:
          <button onClick={deletePost}> Delete </button>
        </div>
      </section>
      <br />
      <Link to="/">Back to Home</Link>
    </>
  );
};

export default EditPost;
