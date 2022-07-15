import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

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
        <div>
            <h1>Sign Up with your Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" value={displayName} required name="displayName" onChange={handleChange}></input>

                <label>Email</label>
                <input type="email" value={email} required name="email" onChange={handleChange}></input>

                <label>Password</label>
                <input type="password" value={password} required name="password" onChange={handleChange}></input>

                <label>Confirm Password</label>
                <input type="text" value={confirmPassword} required name="confirmPassword" onChange={handleChange}></input>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm