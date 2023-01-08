import { useContext } from 'react'
import { UserContext } from '../../data'
import { getUserToken } from '../../utils/authToken'

const Header = (props) => {
    const { currentUser } = useContext(UserContext)
    const token = getUserToken()
    // console.log(token)
    // console.log(currentUser)

    return (
        <div className="header"><h1>Fitness Check</h1>{token ? <p>Logged in {currentUser ? <span className='logged-in'>({currentUser.username})</span> : <span className='logged-in'>(token)</span>}</p> : <p><span className='not-logged-in'>Not logged in</span></p>}</div>
    )
}

export default Header