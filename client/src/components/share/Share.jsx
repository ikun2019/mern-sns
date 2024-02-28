import React, { useContext, useRef } from 'react';
import axios from 'axios';
import './Share.css';
import { Analytics, Face, Gif, Image } from '@mui/icons-material';
import { AuthContext } from '../../state/AuthContext';

const Share = () => {
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useContext(AuthContext);

	const desc = useRef();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		};
		try {
			await axios.post('http://localhost:8080/api/posts', newPost);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						src={
							user.profilePicture
								? PUBLIC_FOLDER + user.profilePicture
								: PUBLIC_FOLDER + '/person/noAvater.png'
						}
						alt=""
						className="shareProfileImg"
					/>
					<input type="text" className="shareInput" placeholder="今何してるの？" ref={desc} />
				</div>
				<hr className="shareHr" />
				<form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
					<div className="shareOptions">
						<div className="shareOption">
							<Image className="shareIcon" htmlColor="blue" />
							<span className="shareOptionText">写真</span>
						</div>
						<div className="shareOption">
							<Gif className="shareIcon" htmlColor="hotpink" />
							<span className="shareOptionText">GIF</span>
						</div>
						<div className="shareOption">
							<Face className="shareIcon" htmlColor="green" />
							<span className="shareOptionText">気持ち</span>
						</div>
						<div className="shareOption">
							<Analytics className="shareIcon" htmlColor="red" />
							<span className="shareOptionText">投票</span>
						</div>
					</div>
					<button type="submit" className="shareButton">
						投稿
					</button>
				</form>
			</div>
		</div>
	);
};

export default Share;
