import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const confirmPassword = useRef();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// パスワードの確認
		if (password.current.value !== confirmPassword.current.value) {
			confirmPassword.current.setCustomValidity('パスワードが違います');
		} else {
			try {
				const user = {
					username: username.current.value,
					email: email.current.value,
					password: password.current.value,
				};
				console.log('user =>', user);
				await axios.post('http://localhost:8080/api/auth/register', user);
				navigate('/login');
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Real SNS</h3>
					<span className="loginDesc">本格的なSNSを自分の手で</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
						<p className="loginMsg">新規登録はこちら</p>
						<input
							type="text"
							className="loginInput"
							placeholder="ユーザー名"
							required
							ref={username}
						/>
						<input type="email" className="loginInput" placeholder="Eメール" required ref={email} />
						<input
							type="password"
							className="loginInput"
							placeholder="パスワード"
							minLength="6"
							required
							ref={password}
						/>
						<input
							type="password"
							className="loginInput"
							placeholder="確認用パスワード"
							minLength="6"
							required
							ref={confirmPassword}
						/>
						<button type="submit" className="loginButton">
							サインアップ
						</button>
						<button className="loginRegisterButton" onClick={navigate('/login')}>
							ログイン
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
