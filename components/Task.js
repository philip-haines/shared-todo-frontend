import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	Modal,
} from "react-native";
import Card from "./Card";
import EditForm from './modals/EditFormModal';

export default function Task(props) {
	const [modalVisibility, setModalVisibility] = useState(false);

	const showModal = () => {
		setModalVisibility(true);
	};

	const closeModal = () => {
		setModalVisibility(false);
	};

	   const checkStatus = (task) => {
        if (task.priority === 'high'){
            return styles.highPriority
        } else if (task.priority === 'medium'){
            return styles.mediumPriority
        } else if (task.priority === 'low'){
            return styles.lowPriority
        } else {
            return styles.noPriority
        }
    }

	return (
		<View style={styles.screen}>
			<Card style={styles.card}>
				<View style={styles.cardContainer}>
					<View style={[styles.priority, checkStatus(props.item)]}></View>
					<View style={styles.cardContent}>
						<View style={styles.textContainer}>
							<View style={styles.titleRow}>
								<Text style={styles.titleText}>
									{props.item.title}
								</Text>
							</View>
							<View style={styles.descriptionText}>
								<Text>{props.item.description}</Text>
							</View>
						</View>
						<View style={styles.buttonPosition}>
							<View style={styles.buttonRow}>
								<View style={[styles.btn, styles.complete]}>
									<Button title="Complete" color="#fbfbfc" />
								</View>
								<View style={[styles.btn, styles.edit]}>
									<Button
										title="Edit"
										color="#fbfbfc"
										onPress={showModal}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Card>
			<Modal
				visible={modalVisibility}
				animationType="fade"
				transparent={true}
			>
				<EditForm
					updateTasks={props.updateTasks}
					closeModal={closeModal}
					communityId={props.item.community_id}
					itemID={props.item.id}
					titleText={props.item.title}
					descriptionText={props.item.description}
					priorityLevel={props.item.priority}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},

	card: {
		position: "relative",
		width: "90%",
		height: 240,
		marginVertical: 10,
	},

	cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
	},

	cardContent: {
		alignItems: "center",
		height: "100%",
		width: "96%",
		justifyContent: "space-between",
	},

	textContainer: {
		width: "100%",
		alignItems: "center",
	},

	titleRow: {
		width: "100%",
		alignItems: "center",
		height: "20%",
		marginVertical: 10,
	},

	titleText: {
		fontSize: 24,
	},

	descriptionText: {
		width: "90%",
		height: "50%",
		justifyContent: "center",
		overflow: "visible",
		padding: 5,
	},

	priority: {
		position: "absolute",
		height: "100%",
		width: "4%",
		left: 0,
		top: 0,
	},

	highPriority:{
        backgroundColor: '#F1B4B3'
    },
    mediumPriority:{
        backgroundColor: '#F1DB94'
    },
    lowPriority:{
        backgroundColor: '#91E0F1'
    },
    noPriority:{
        backgroundColor: '#D8D8D8'
    },

	complete: {
		backgroundColor: "#91E0F1",
	},

	edit: {
		backgroundColor: "#fac897",
	},

	buttonPosition: {
		justifyContent: "flex-end",
		alignSelf: "flex-end",
		width: "120%",
		marginRight: -30,
	},

	buttonRow: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignSelf: "center",
		paddingHorizontal: 20,
		paddingLeft: 65,
	},

	btn: {
		width: "40%",
	},
});
