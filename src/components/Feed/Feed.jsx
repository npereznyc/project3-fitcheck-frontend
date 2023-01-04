import {Routes, Route} from 'react-router-dom'
import Home from '../../pages/Posts'
import CreatePost from '../../pages/CreatePost'


const Feed = (props) => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path= "/post" element={<CreatePost/>}/>
            </Routes>
        </div>
    )
}

export default Feed