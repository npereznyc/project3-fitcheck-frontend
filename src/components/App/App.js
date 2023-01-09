import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../data'
import { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'

function App() {
    library.add(faHouse, faCirclePlus, faUser)

    const { Provider: UserInfo } = UserContext

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    /*
    Two solutions:
    1) userEffect - token ? decode token (modify jwt auth payload to include username) -> set state to user (only sets username to state). current user would NOT be an object.

    2) have a useEffect and make a fetch request to a yet-to-exist route to a getUser lookup-function (in the backend auth controller)
    */

    // useEffect for

    return (
        <div className="App">
            <UserInfo value={{
                isAuthenticated,
                currentUser,
                setAuth: setIsAuthenticated,
                setUser: setCurrentUser
            }}>
                <Header />
                <Navbar />
                <Feed />
            </UserInfo>
        </div>
    )
}

export default App