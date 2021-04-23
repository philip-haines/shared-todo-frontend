import React, { useState, useEffect } from "react";
import {StyleSheet} from 'react-native'
import NavBar from './components/NavBar'


export default function App() {
	const [userState, setUserState] = useState({});
	const [communityState, setCommunityState] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	const userURL = "https://shared-todo-app.herokuapp.com/users/1";
	const communityURL = 'https://shared-todo-app.herokuapp.com/communities/'

	const getUsers = async () => {
		try {
			const response = await fetch(userURL);
			const data = await response.json();

			setUserState(data);
			setCommunityState(data.communities);
			setUserTasks(data.tasks);
			setLoading(false);
		} catch (error) {
			throw error;
		}
	};

	const getCommunities = (newCommunity) => {
		fetch(`${communityURL}${newCommunity.id}`)
		.then (response => response.json())
		.then (backEndCommunity => setCommunityState([...communityState, backEndCommunity]))
	}


	const updateTasks = (updatedTask) => {
		setUserTasks([updatedTask, ...newTasks]);
	};

	const claimTask = (claimedTask) => {
		const sameTask = userTasks.find(task => task.id === claimedTask.id)
		if(!sameTask){
			setUserTasks([...userTasks, claimedTask])
		}
	}

	const addTask = (task, communityID) => {
		copyOfCommunityState = [...communityState] 
		const foundCommunity = copyOfCommunityState.find(stateCommunity => communityID === stateCommunity.id)
		foundCommunity.tasks.push(task)

		setCommunityState(copyOfCommunityState)
	}

	const addCommunity = (newCommunity) => {
		getCommunities(newCommunity)
		setCommunityState([...communityState, newCommunity])
	}

	useEffect(() => {
		let mounted = true;
		if (mounted && !userTasks.length) {
			console.log('you hit me up top')
			getUsers()};
	}, []);

	return (
		<NavBar 
		user={userState} 
		tasks={userTasks} 
		communities={communityState} 
		loading={loading} 
		updateTasks={updateTasks} 
		addCommunity={addCommunity}
		addTask={addTask}
		claimTask={claimTask}/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#91AAF2",
	},
});
