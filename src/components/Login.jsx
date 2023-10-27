import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './slices/authSlice';

function Login() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);

    const handleLogin = () => {
        const email = "user@example.com"; // TODO: Get from form or input
        const password = "user_password"; // TODO: Get from form or input

        dispatch(loginUser({ email, password }));
    };

    return (
        <div>
            {/* TODO: Display any authState.error here */}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
