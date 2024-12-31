({
    title: "Login",
    content: `
        <div class="auth-container">
            <form class="auth-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password">
                </div>
                <button type="submit" class="submit-btn">Login</button>
            </form>
            
            <div class="auth-links">
                <p class="register-link">
                    Not registered yet? 
                    <a href="#register">Create an account</a>
                </p>
                <a href="#forgot" class="forgot-link">Forgot password?</a>
            </div>

            <style>
                .auth-container {
                    padding: 20px;
                    max-width: 400px;
                    margin: 0 auto;
                }
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .form-group label {
                    font-size: 0.9em;
                    color: #666;
                }
                .form-group input {
                    padding: 10px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 0.9em;
                }
                .submit-btn {
                    padding: 12px;
                    background: #333;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    font-size: 1em;
                }
                .submit-btn:hover {
                    background: #444;
                }
                .auth-links {
                    text-align: center;
                    border-top: 1px solid #eee;
                    padding-top: 20px;
                }
                .register-link {
                    margin-bottom: 10px;
                    color: #666;
                }
                .profile-image {
                    font-size: 2rem;
                    margin-right: 1rem;
                }
                .auth-links a:hover {
                    text-decoration: underline;
                }
                .forgot-link {
                    font-size: 0.9em;
                }
            </style>
        </div>
    `,
    position: "right-sidebar",
    stackable: false
})
