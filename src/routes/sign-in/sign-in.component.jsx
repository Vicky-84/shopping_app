import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth'
import {
    auth, 
    SignInWithGooglePopup,
    createUserDocFromAuth,
    SignInWithGoogleRedirect 
} from "../../utils/firebase/firebase.utils"

const SignIn = () => {

    useEffect(() => {
        let getUser = async () => {
            const response = await getRedirectResult(auth);
            console.log(response)
        }
        getUser();
    },[])

    const logGoogleUser = async() => {
        const {user} = await SignInWithGooglePopup();
        createUserDocFromAuth(user);
    }

    return (
        <div>
            <h1>SIGN IN Page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Popup
            </button>
            <button onClick={SignInWithGoogleRedirect}>
                Sign In With Redirect
            </button>
        </div>
    )
}

export default SignIn