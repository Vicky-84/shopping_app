import SignUpForm from "../../components/sign-up/sign-up.component";
import SignInForm from "../../components/sign-in/sign-in.component";
import './authentication.styles.scss'

const Authentication = () => {

    //For Redirect Purpose

    // useEffect(() => {
    //     let getUser = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response)
    //             createUserDocFromAuth(response.user);
    //     }
    //     getUser();
    // },[])

    return (
        <div className="authentication-container">
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authentication