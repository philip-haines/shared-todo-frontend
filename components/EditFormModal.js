import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	Picker,
	Button,
} from "react-native";
import Card from "./Card";
import Input from "./Input";

export default function EditFormModal(props) {
	const [title, setTitle] = useState(props.titleText);
	const [description, setDescription] = useState(props.descriptionText);
	const [selectedValue, setSelectedValue] = useState(props.priorityLevel);
	const taskURL = `https://shared-todo-app.herokuapp.com/tasks/${props.itemID}`;

	const handleTitleChange = (enteredText) => {
		setTitle(enteredText);
	};

	const handleDescriptionChange = (enteredText) => {
		setDescription(enteredText);
	};

	const handleSubmit = () => {
		fetch(taskURL, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				community_id: props.communityId,
				title: title,
				description: description,
				priority: selectedValue,
			}),
		})
			.then((response) => response.json())
			.then((updatedTask) => {
				props.updateTasks(updatedTask);
				props.closeModal();
			});
	};

	return (
		<TouchableWithoutFeedback onPress={() => props.closeModal()}>
			<View style={styles.screen}>
				<Card style={styles.card}>
					<Text style={styles.titleText}>Edit Your Task</Text>
					<Input
						value={title}
						placeholder={props.title}
						onChangeText={handleTitleChange}
						style={styles.title}
					/>
					<Input
						value={description}
						placeholder={props.description}
						onChangeText={handleDescriptionChange}
						style={styles.description}
					/>
					<Picker
						selectedValue={selectedValue}
						style={styles.picker}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedValue(itemValue)
						}
					>
						<Picker.Item label="High" value="high" />
						<Picker.Item label="Medium" value="medium" />
						<Picker.Item label="Low" value="low" />
					</Picker>
					<Button title="Submit" onPress={handleSubmit} />
				</Card>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},

	card: {
		height: "60%",
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
	},

	titleText: {
		fontSize: 30,
		marginBottom: 30,
	},

	title: {
		width: "70%",
	},

	description: {
		width: "70%",
		height: "auto",
	},

	picker: {
		width: 200,
	},
});
