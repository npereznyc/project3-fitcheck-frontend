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
    const [currentUserName, setCurrentUserName] = useState(null)
    const [currentUserID, setCurrentUserID] = useState(null)

    useEffect(() => {
        if (token) {
            // getUserToken()
            const { id, username } = decodeToken(token)
            setCurrentUserName(username)
            setCurrentUserID(id)
        }
    }, [token])

    return (
        <div className="App">
            <UserInfo value={{
                isAuthenticated,
                currentUserName,
                currentUserID,
                setAuth: setIsAuthenticated,
                setUser: setCurrentUserName
            }}>
                <Header />
                <Navbar />
                <Feed />
            </UserInfo>
        </div>
    )
}

export default App