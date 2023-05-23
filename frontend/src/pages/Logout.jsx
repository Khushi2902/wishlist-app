import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate();

    return <div className="center btnGrp">

        <button onClick={async () => {
            await signOut(auth);
            navigate("/")
        }}>
            LOGOUT
        </button>
    </div>
}

export default Logout;