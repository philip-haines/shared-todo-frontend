import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, Modal } from "react-native";
import Task from "../components/Task";
import Loading from "../components/Loading";
import AddForm from "../components/modals/AddFormModal"
import AddNewButton from '../components/AddNewButton'

export default function Home(props) {
	const [modalVisibility, setModalVisibility] = useState(false);

		const showModal = () => {
		setModalVisibility(true);
	};

	const closeModal = () => {
		setModalVisibility(false);
	};

	const renderComponent = () => {
		return props.loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
				<Modal visible={modalVisibility} animationType="fade"
				transparent={true}>
					<AddForm  showModal={showModal} closeModal={closeModal} addTask={props.addTask} userID={props.user.id}/>
				</Modal>
				<AddNewButton showModal={showModal} />
				<FlatList
					keyExtractor={(task, index) => task.id}
					data={props.tasks}
					renderItem={({ item }) => (
						<Task item={item} updateTasks={props.updateTasks} />
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
		marginBottom: 45,
		paddingBottom: 20,
	},

	topBar: {
		height: 70,
		width: "100%",
		backgroundColor: "#91AAF2",
	},

	flatList: {
		width: "100%",
		paddingTop: 10,
		marginBottom: 130,
	},
});
