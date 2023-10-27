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
        <div className="flex flex-col items-center space-y-4">
            {/* TODO: Add your form/input elements here with similar styles as the ForgotPasswordComponent */}
            <button 
                onClick={handleRegister} 
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-500 transition-colors duration-200"
            >
                Register
            </button>
        </div>
    );
}

export default Register;