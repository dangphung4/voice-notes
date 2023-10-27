import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from './firebaseConfig';

function Register() {
    const handleRegister = async () => {
        try {
            const email = "user@example.com"; // TODO: Get from form or input
            const password = "user_password"; // TODO: Get from form or input
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Registered successfully");
            // TODO: Redirect or update UI state
        } catch (error) {
            console.error("Error registering:", error.message);
        }
    };

    return (
        <div>
            {/* TODO: Add your form/input elements here */}
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;