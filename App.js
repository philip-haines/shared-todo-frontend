import React, { useState, useEffect } from "react";
import {StyleSheet} from 'react-native'
import NavBar from './components/NavBar'


export default function App() {
		const [userState, setUserState] = useState({});
	const [communityState, setCommunityState] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	const userURL = "https://shared-todo-app.herokuapp.com/users/1";

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

	const addTask = (newTask) => {
		setUserTasks([...userTasks, newTask])
	}

	useEffect(() => {
		let mounted = true;
		if (mounted && !userTasks.length) {
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
		addTask={addTask}/>
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
