import { Routes, Route } from 'react-router-dom'
import { getUserToken } from '../../utils/authToken'
import Posts from '../../pages/Posts'
import About from '../../pages/About'
import CreatePost from '../../pages/CreatePost'
import PostDetail from '../../pages/PostDetail'
import Profile from '../../pages/Profile'
import Login from '../../pages/Login'
import CreateAccount from '../../pages/CreateAccount'

export default function Feed() {
    const token = getUserToken()

    return (
        <section className="feed-container">
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/about" element={<About />} />
                <Route path="/post" element={
                    token ? <CreatePost /> : <Login />
                } />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/profile/:id" element={
                    token ? <Profile /> : <Login />
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<CreateAccount />} />
            </Routes>
        </section>
    )
}