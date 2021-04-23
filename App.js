import React, { useState, useEffect } from "react";
import {StyleSheet} from 'react-native'
import NavBar from './components/NavBar'


export default function App() {
	const [userState, setUserState] = useState({});
	const [communityState, setCommunityState] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [allTasks, setAllTasks] = useState(0)
	console.log(allTasks)

	const userURL = "https://shared-todo-app.herokuapp.com/users/1";
	const taskURL = 'https://shared-todo-app.herokuapp.com/users/1'

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


	const updateTasks = (updatedTask) => {
		const newTasks = userTasks.filter((task) => updatedTask.id !== task.id);
		setUserTasks([...newTasks, updatedTask]);
	};

	const claimTask = (claimedTask) => {
		console.log('Im being pinged')
		const sameTask = userTasks.find(task => task.id === claimedTask.id)
		if(!sameTask){
			console.log('Im being pinged in your if statement')
			setUserTasks([...userTasks, claimedTask])
		}
	}

	const addTask = () => {
		getUsers()
	}

	const addCommunity = (newCommunity) => {
		setCommunityState([newCommunity, ...communityState])
	}

	useEffect(() => {
		let mounted = true;
		if (mounted && !userTasks.length) {
			console.log('you hit me up top')
			getUsers();
		}
	}, [userTasks]);

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
