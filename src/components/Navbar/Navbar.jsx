import {Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar = (props) => {
    return (
        <nav className="nav">
            
            <Link to='/'>
           
            <FontAwesomeIcon icon={solid ('house')} />
                <h1>Home</h1>
            </Link>
            <Link to='/post'>
            <FontAwesomeIcon icon={solid ('circle-plus')}/>
            <h1>Create Post</h1>
            </Link>  
           <Link to='/profile'>
           <FontAwesomeIcon icon={solid ('user')}/>
           <h1>Profile</h1>
           </Link>
           
        </nav>
    )
}

export default Navbar