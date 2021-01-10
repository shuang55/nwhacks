import { logout } from '../repository';
import { Redirect } from 'react-router-dom';


const Logout = () => {
    logout().then(() => {
        localStorage.clear();
    })

    return (<Redirect to="/login" />);
}

export default Logout;