import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../data'
import { useState, useEffect } from 'react'
import './App.css'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Feed from '../Feed/Feed'
import { getUserToken, decodeToken } from '../../utils/authToken'

function App() {
    library.add(faHouse, faCirclePlus, faUser)

    const token = getUserToken()

    const { Provider: UserInfo } = UserContext

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        if(token) {
            getUserToken()
            console.log(decodeToken(token))
            setCurrentUser(decodeToken(token).username)
        }
    }, [])
    console.log(`currentUser:`, currentUser)

    /*
    Two solutions:
    1) useEffect - token ? decode token (modify jwt auth payload to include username) -> set state to user (only sets username to state). current user would NOT be an object.
    ^^^^^^^^^^^^^

    2) have a useEffect and make a fetch request to a yet-to-exist route to a getUser lookup-function (in the backend auth controller)
    */


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