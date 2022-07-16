import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up.styles.scss'

const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword : ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const clear = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const {name, value} = event.target 
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Password does not match');
            return
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, {displayName});
            clear();
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" value={displayName} required name="displayName" onChange={handleChange}></FormInput>

                <FormInput label="Email" type="email" value={email} required name="email" onChange={handleChange}></FormInput>

                <FormInput label="Password" type="password" value={password} required name="password" onChange={handleChange}></FormInput>

                <FormInput label="Confirm Password" type="text" value={confirmPassword} required name="confirmPassword" onChange={handleChange}></FormInput>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm