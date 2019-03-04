import React, { Component } from 'react';
import AppNavBar from '../components/appNavBar'
import ListItems from '../components/listItems'

class Home extends Component {
	render() {
		return (
			<>
				<AppNavBar />
				<ListItems />
			</>
		);
	}
}
export default Home;
