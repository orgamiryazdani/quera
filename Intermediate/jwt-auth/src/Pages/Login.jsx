import React, { useState } from "react";

import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import useJWT from "../Hooks/useJWT";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
	const { login } = useJWT()
	const [loginValue, setLoginValue] = useState({
		email: "", password: ""
	})
	const [notRobot, setNotRobot] = useState(true);
	const navigate = useNavigate();
	const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

	const validationBtn =
		loginValue.email !== '' &&
		loginValue.password !== '' &&
		notRobot &&
		emailRegex.test(loginValue.email);

	const handleChange = (e) => {
		setLoginValue({ ...loginValue, [e.target.type]: e.target.value });
	}

	const getToken = () => {
		login(loginValue.email, loginValue.password)
			.then(() => {
				navigate("/");
				setNotRobot(true)
			})
			.catch(() => {
				loginValue.password = '';
				setNotRobot(false)
			})
	}

	const loginHandler = () => {
		getToken()
	}

	return (
		<Card>
			<h3>Login</h3>
			<Input
				data-testid="email"
				label="✉️ Email"
				type="email"
				value={loginValue.email}
				onChange={(e) => handleChange(e)}
			/>
			<Input
				data-testid="password"
				label="🔑 Password"
				type="password"
				value={loginValue.password}
				onChange={(e) => handleChange(e)}
			/>
			{!notRobot &&
				<>
					< NotRobot checked={notRobot} onChange={() => setNotRobot(!notRobot)} />
					<ErrorMessage />
				</>
			}
			<LoginButton onClick={() => loginHandler()} disabled={!validationBtn} />
		</Card>
	);
};

export default Login;
