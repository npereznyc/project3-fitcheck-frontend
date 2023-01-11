import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../data'
import { useState, useEffect } from 'react'
import { getUserToken, decodeToken } from '../../utils/authToken'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Feed from '../Main/Main'
import './App.css'

function App() {
    library.add(faHouse, faCirclePlus, faUser)

    const { Provider: UserInfo } = UserContext

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUserName, setCurrentUserName] = useState(null)
    const [currentUserID, setCurrentUserID] = useState(null)

    const token = getUserToken()

    useEffect(() => {
        if (token) {
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
                setUser: setCurrentUserName,
                setUserID: setCurrentUserID
            }}>
                <Header />
                <Navbar />
                <Feed />
            </UserInfo>
        </div>
    )
}

export default App