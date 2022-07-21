import { useState, useContext } from "react"
import {createUserDocFromAuth,SignInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import './sign-in.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const clear = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async() => {
        const {user} = await SignInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    const handleChange = (event) => {
        const {name, value} = event.target 
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            clear();
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account</h2>
            <span>Sign In with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" value={email} required name="email" onChange={handleChange}></FormInput>
                <FormInput label="Password" type="password" value={password} required name="password" onChange={handleChange}></FormInput>
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm