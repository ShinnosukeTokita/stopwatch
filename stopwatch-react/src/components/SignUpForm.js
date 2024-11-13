import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API_HOST = 'http://localhost:3000';

function SignUpForm() {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [csrfToken, setCsrfToken] = useState(undefined);
    const navigate = useNavigate();

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

        const response = await fetch('/stopwatch/signup/', {
            method: 'POST',
            headers: {
                'X-CSRFToken' : csrfToken,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 201) {
            alert('ユーザを作成しました');
            navigate('/login');
        } else {
            console.log(data.message);
            alert('このメールアドレスはすでに使用されています')
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
                    required
                />
                <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード"
                    required
                />
                <button type="submit" className="login-button">新規登録</button>
            </form>
            <Link to="/login">ログインページへ</Link>
        </div>
    );
}

export default SignUpForm;

