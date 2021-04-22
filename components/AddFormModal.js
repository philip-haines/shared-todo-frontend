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

export default function AddFormModal(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
    const [selectedValue, setSelectedValue] = useState(props.priorityLevel);
	const taskURL = `https://shared-todo-app.herokuapp.com/tasks/`;
	const userTaskURL = `https://shared-todo-app.herokuapp.com/user_tasks/`


	const handleTitleChange = (enteredText) => {
		console.log(props)
		setTitle(enteredText);
	};

	const handleDescriptionChange = (enteredText) => {
		setDescription(enteredText);
	};

	const handleSubmit = () => {
		fetch(taskURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				community_id: 1,
				title: title,
				description: description,
				priority: selectedValue,
			}),
		})
			.then((response) => response.json())
			.then((newTask) => {
				props.closeModal();
				newUseTask(newTask)
                props.addTask(newTask);
			})
	};

	const newUseTask = (newTask) => {
		fetch(userTaskURL, {
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify({
				task_id: newTask.id,
				user_id: props.userID
			})
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}

	
	return (
		<TouchableWithoutFeedback>
			<View style={styles.screen}>
				<Card style={styles.card}>
					<Text style={styles.titleText}>Create New Task</Text>
					<Input
						value={title}
						placeholder='Enter Title'
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
