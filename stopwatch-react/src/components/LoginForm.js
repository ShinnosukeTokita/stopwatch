import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../backend/AuthContext';
import '../styles/LoginForm.css';
const API_HOST = 'http://localhost:3000';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await fetch(`${API_HOST}/csrf/`, {
                    credentials: 'include'
                });
                const data = await response.json();
                setCsrfToken(data.token);
            } catch (e) {
                console.error('Error fetching CSRF token:', e);
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/stopwatch/login/', {
            method: 'POST',
            headers: {
                'X-CSRFToken' : csrfToken,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            login();
            navigate('/home');
        } else {
            alert('メールアドレスまたはパスワードが間違っています')
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
                <button type="submit" className="login-button">ログイン</button>
            </form>
            <Link to="/signup">新規登録ページへ</Link>
        </div>
    );
}

export default LoginForm;

