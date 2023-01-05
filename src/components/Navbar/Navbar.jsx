import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = (props) => {
    return (
        <nav className="nav">
            <Link to='/'>
                <FontAwesomeIcon icon="fa-solid fa-house" size="2x" />
                <h1>Home</h1>
            </Link>
            <Link to='/post'>
                <FontAwesomeIcon icon="fa-solid fa-circle-plus" size="2x" />
                <h1>Create Post</h1>
            </Link> 
            <Link to='/profile'>
                <FontAwesomeIcon icon="fa-solid fa-user" size="2x" />
                <h1>Profile</h1>
            </Link>
        </nav>
    )
}

export default Navbar