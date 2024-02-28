import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';
import { MoreVert } from '@mui/icons-material';
import { useEffect } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
// import { Users } from '../../dummyData';

const Post = ({ post }) => {
	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
	// const user = Users.filter((user) => user.id === post.userId);

	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		(async () => {
			const response = await axios.get(`http://localhost:8080/api/users/?userId=${post.userId}`);
			setUser(response.data);
		})();
	}, [post.userId]);

	const handleLike = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							<img
								src={user.profilePicture || PUBLIC_FOLDER + '/person/noAvater.png'}
								alt=""
								className="postProfileImg"
							/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post.desc}</span>
					<img src={`${PUBLIC_FOLDER}${post.img}`} alt="" className="postImg" />
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							src={`${PUBLIC_FOLDER}/heart.png`}
							alt=""
							className="likeIcon"
							onClick={() => handleLike()}
						/>
						<span className="postLikeCounter">{like}人がいいねを押しました</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment}:コメント</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
