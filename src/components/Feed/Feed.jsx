import {Routes, Route} from 'react-router-dom'
import CreatePost from '../../pages/CreatePost'
import Posts from '../../pages/Posts'


const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Posts />}/>
                <Route path= "/post" element={<CreatePost/>}/>
            </Routes>
        </div>
    )
}

export default Feed
