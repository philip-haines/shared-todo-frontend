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
				<FlatList
				showsVerticalScrollIndicator={false}
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
			<View style={styles.topBar}>
				<Text style={styles.title}>Current Tasks</Text>
			</View>
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

	title: {
		marginTop: 30,
		fontSize: 24,
	},

	topBar: {
		height: 130,
		width: "100%",
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: "#91AAF2",
		paddingBottom: 10,
	},

	flatList: {
		width: "100%",
		paddingTop: 10,
		marginBottom: 130,
	},
});
