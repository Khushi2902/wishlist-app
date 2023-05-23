import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from '../firebase'

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            console.log(u);
            setLoading(false);
            if (!u) setUser(null)
            else {
                setUser({
                    username: u.displayName,
                    email: u.email,
                    pfp: u.photoURL,
                    uid: u.uid
                });

            }
        })
        return unsub;
    }, [])
    return {
        user,
        loading
    };
}

export default useAuth;