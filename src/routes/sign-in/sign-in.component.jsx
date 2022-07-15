import { useEffect } from "react";
import {getRedirectResult} from 'firebase/auth'
import {
    auth, 
    SignInWithGooglePopup,
    createUserDocFromAuth,
    SignInWithGoogleRedirect 
} from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up/sign-up.component";

const SignIn = () => {

    useEffect(() => {
        let getUser = async () => {
            const response = await getRedirectResult(auth);
            if(response)
                createUserDocFromAuth(response.user);
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
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn