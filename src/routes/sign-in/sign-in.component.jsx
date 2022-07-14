import { SignInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async() => {
        const {user} = await SignInWithGooglePopup();
        createUserDocFromAuth(user);
    }


    return (
        <div>
            <h1>SIGN IN Page</h1>
            <button onClick={logGoogleUser}>
                SignIn
            </button>
        </div>
    )
}

export default SignIn