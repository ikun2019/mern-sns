import './Topbar.css';
import { Chat, Notifications, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Topbar = () => {
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
				<img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
			</div>
		</div>
	);
};

export default Topbar;
