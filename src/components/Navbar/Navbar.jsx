import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar = (props) => {
    return (
        <nav className="nav">
            
            <Link to='/'>
            <FontAwesomeIcon icon="fa-solid fa-house" />
                <h1>Home</h1>
            </Link>
            <Link to='/post'>
            <h1>Create Post</h1>
            </Link>  
           <Link to='/profile'>
           <h1>Profile</h1>
           </Link>
        </nav>
    )
}

export default Navbar