import './Home.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import TimeLine from '../../components/timeline/Timeline';
import Rightbar from '../../components/rightbar/Rightbar';

const Home = () => {
	return (
		<>
			<Topbar />
			<div className="homeContainer">
				<Sidebar />
				<TimeLine />
				<Rightbar />
			</div>
		</>
	);
};

export default Home;
