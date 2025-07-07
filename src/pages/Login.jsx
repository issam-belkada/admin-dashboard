import { Link } from 'react-router-dom';


export default function Login() {
    return (
        <div className="login-page">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup" >Signup</Link></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
        </div>
    );
}