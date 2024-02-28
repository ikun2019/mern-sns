import React from 'react';
import axios from 'axios';
import './Timeline.css';
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from '../../dummyData';
import { useEffect } from 'react';
import { useState } from 'react';

const TimeLine = ({ username }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// (async () => {
		// 	const response = await axios.get(
		// 		'http://localhost:8080/api/posts/timeline/65db430d23a60be0a77b4c52'
		// 	);
		// 	setPosts(response.data);
		// })();
		const fetchPost = async () => {
			const response = username
				? await axios.get(`http://localhost:8080/api/posts/profile/${username}`)
				: await axios.get('http://localhost:8080/api/posts/timeline/65db430d23a60be0a77b4c52');
			setPosts(response.data);
		};
		fetchPost();
	}, [username]);
	return (
		<div className="timeline">
			<div className="timelineWrapper">
				<Share />
				{posts.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	);
};

export default TimeLine;
