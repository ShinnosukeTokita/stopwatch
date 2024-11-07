import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../backend/AuthContext';

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const csrftoken = Cookies.get('csrftoken') || '';
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/stopwatch/signup/', {
            method: 'POST',
            headers: {
                'X-CSRFToken' : csrftoken,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('Response:', data);

        if (response.status === 200) {
            login();
            navigate('/home');
        } else {
            console.log(data.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレス"
                />
                <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                />
                <button type="submit" className="login-button">新規登録</button>
            </form>
        </div>
    );
}

export default SignUpForm;

