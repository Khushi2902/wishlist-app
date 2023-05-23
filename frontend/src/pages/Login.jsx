import GoogleButton from 'react-google-button'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    return <div className="center">

        <GoogleButton
            onClick={() => {
                signInWithPopup(auth, provider)
                    .then(() => {
                        navigate("/main")
                    });
            }}
        />
    </div>
}


export default Login;