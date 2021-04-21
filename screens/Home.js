import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import Task from "../components/Task";
import Loading from "../components/Loading";

export default function Home() {
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

	useEffect(() => {
		let mounted = true;
		if (mounted && !userTasks.length) {
			getUsers();
		}
	}, [userTasks]);

	const renderComponent = () => {
		return loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
				<View style={styles.addNewContainer}>
					<View style={styles.addNewButton}>
						<Button title="➕" />
					</View>
				</View>
				<FlatList
					keyExtractor={(task, index) => task.id}
					data={userTasks}
					renderItem={({ item }) => (
						<Task item={item} updateTasks={updateTasks} />
					)}
					style={styles.flatList}
				></FlatList>
			</View>
		);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.topBar}></View>
			{renderComponent()}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		alignItems: "center",
	},

	topBar: {
		height: 100,
		width: "100%",
		backgroundColor: "#91AAF2",
	},

	flatList: {
		height: "100%",
		width: "100%",
		paddingTop: 10,
		marginBottom: 130,
	},

	spacer: {
		height: 80,
		width: "100%",
		backgroundColor: "black",
	},
});
