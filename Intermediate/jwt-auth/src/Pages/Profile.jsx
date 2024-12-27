import React, { useEffect } from "react";
import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import { useNavigate } from "react-router-dom";
import useJWT from "../Hooks/useJWT";

const Profile = () => {
	const [user, setUser] = React.useState({});
	const navigate = useNavigate();
	const { sendPostRequest, logout } = useJWT();

	const fetchUserData = async () => {
		try {
			const { data } = await sendPostRequest('http://127.0.0.1:4000/api/user');
			setUser(data.user);
		} catch (error) {
			navigate('/login');
		}
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('access') || null;
		if (accessToken) {
			fetchUserData();
		}
		else {
			navigate('/login');
		}
	}, [navigate]);

	const logoutHandler = () => {
		logout();
		navigate('/login');
	}

	return (
		<div className="container">
			<Row>
				<UserData label="Name">{user.name}</UserData>
				<UserData label="Family">{user.lastname}</UserData>
			</Row>

			<Row>
				<UserData label="Phone">{user.phone}</UserData>
				<UserData label="Address">{user.address}</UserData>
			</Row>

			<Row>
				<UserData label="Email">{user.email}</UserData>
				<UserData label="Password">{user.password}</UserData>
			</Row>

			<LogoutButton onClick={() => logoutHandler()} />
		</div>
	);
};

export default Profile;
