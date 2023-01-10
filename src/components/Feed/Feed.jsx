import { Routes, Route } from 'react-router-dom'
import CreatePost from '../../pages/CreatePost'
import PostDetail from '../../pages/PostDetail'
import Posts from '../../pages/Posts'
import Profile from '../../pages/Profile'
import CreateProfile from '../../pages/CreateProfile'
import Auth from '../../pages/Auth'
import { getUserToken } from '../../utils/authToken'
import About from '../../pages/About'
// import { decodeToken } from '../../utils/authToken'
// import { useNavigate } from 'react-router-dom'

const Feed = (props) => {
    const token = getUserToken()

    // const navigate = useNavigate()
    return (
        <section className="feed-container">
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/about" element={<About />} />
                <Route path="/post" element={
                    token ? <CreatePost /> : <Auth />
                } />
                <Route path="/:id" element={<PostDetail />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/profile" element={
                    token ? <CreateProfile /> : <Auth />
                } />
            </Routes>
        </section>
    )
}

export default Feed
