import './Topbar.css';
import { Chat, Notifications, Search } from '@mui/icons-material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

const Topbar = () => {
	const { user } = useContext(AuthContext);

	const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="logo">Real SNS</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchBar">
					<Search className="searchIcon" />
					<input type="text" className="searchInput" placeholder="探し物は何ですか？" />
				</div>
			</div>
			<div className="topbarRight">
				<div className="topbarIconItems">
					<div className="topbarIconItem">
						<Chat />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Notifications />
						<span className="topbarIconBadge">2</span>
					</div>
				</div>
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture ? user.profilePicture : PUBLIC_FOLDER + '/person/noAvater.png'}
						alt=""
						className="topbarImg"
					/>
				</Link>
			</div>
		</div>
	);
};

export default Topbar;
