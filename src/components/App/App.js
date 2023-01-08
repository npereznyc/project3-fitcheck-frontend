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

    const { Provider : UserInfo } = UserContext

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

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