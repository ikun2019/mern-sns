import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TimeLine from '../../components/timeline/Timeline';
import Rightbar from '../../components/rightbar/Rightbar';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useParams().username;
	const [user, setUser] = useState({});

	useEffect(() => {
		(async () => {
			const response = await axios.get(`http://localhost:8080/api/users?username=${username}`);
			setUser(response.data);
		})();
	}, [username]);
	return (
		<>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								src={user.coverPicture || PUBLIC_FOLDER + '/post/3.jpeg'}
								alt=""
								className="profileCoverImg"
							/>
							<img
								src={PUBLIC_FOLDER + user.profilePicture || PUBLIC_FOLDER + '/person/noAvater.png'}
								alt=""
								className="profileUserImg"
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<TimeLine username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
