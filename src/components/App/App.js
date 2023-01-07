import './App.css'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
// import CreatePost from '../../pages/CreatePost'
// import Update from '../../pages/EditPost'

function App() {
    library.add(faHouse, faCirclePlus, faUser)
    return (
        <div className="App">
            <Header />
            <Navbar />
            <Feed />
        </div>
    )
}

export default App