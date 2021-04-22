import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, Modal } from "react-native";
import Task from "../components/Task";
import Loading from "../components/Loading";
import AddForm from "../components/AddFormModal"
import Spacer from "../components/Spacer";

export default function Home() {
	const [userState, setUserState] = useState({});
	const [communityState, setCommunityState] = useState([]);
	const [userTasks, setUserTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisibility, setModalVisibility] = useState(false);

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

		const showModal = () => {
		setModalVisibility(true);
	};

	const closeModal = () => {
		setModalVisibility(false);
	};

	const renderComponent = () => {
		return loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
				<Modal visible={modalVisibility} animationType="fade"
				transparent={true}>
					<AddForm  showModal={showModal} closeModal={closeModal} addTask={addTask} userID={userState.id}/>
				</Modal>
				<View style={styles.addNewContainer}>
					<View style={styles.addNewButton}>
						<Button title="➕" onPress={showModal}/>
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
				<Spacer style={styles.spacer}/>
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
		marginBottom: 45,
		paddingBottom: 20,
	},

	topBar: {
		height: 70,
		width: "100%",
		backgroundColor: "#91AAF2",
	},

	flatList: {
		// height: "100%",
		width: "100%",
		paddingTop: 10,
		marginBottom: 130,
	},

	addNewContainer:{
		width: '100%',
		height: 60,
		paddingHorizontal: 10,
		paddingBottom: 10,
		backgroundColor: "#91AAF2",
		alignItems: 'flex-end'
	},
	addNewButton: {
		height: 50,
		width: 50,
		backgroundColor: '#f9bab5',
		marginBottom: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
