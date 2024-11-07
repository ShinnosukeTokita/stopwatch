import { useAuth } from '../backend/AuthContext';

function LogoutButton() {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <button onClick={handleLogout}>ログアウト</button>
    )
}

export default LogoutButton