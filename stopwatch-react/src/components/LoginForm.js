import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
// const API_HOST = 'http://localhost:3000';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [csrfToken, setCsrfToken] = useState('');
    const csrftoken = Cookies.get('csrftoken') || '';
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchCsrfToken = async () => {
    //         try {
    //             const response = await fetch(`${API_HOST}/csrf/`, {
    //                 credentials: 'include'
    //             });
    //             const data = await response.json();
    //             setCsrfToken(data.token);
    //         } catch (e) {
    //             console.error('Error fetching CSRF token:', e);
    //         }
    //     };

    //     fetchCsrfToken();
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/stopwatch/login/', {
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
        </div>
    );
}

export default LoginForm;

