import React from 'react'
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tasks from "../screens/UserTasksPage";
import Communities from "../screens/UserCommunityPage"

const Tab = createBottomTabNavigator();



export default function App(props) {
	const TaskScreen = () => {
	return <Tasks 
	user={props.user} 
	tasks={props.tasks} 
	loading={props.loading}
	updateTasks={props.updateTasks}
	addTask={props.addTask}
	/>;
};

function CommunityScreen() {
	return <Communities 
	userID = {props.user.id}
	communities={props.communities}
	loading={props.loading}
	updateTasks={props.updateTasks}
	addTask={props.addTask}
	addCommunity={props.addCommunity}
	claimTask={props.claimTask}
	/>;
}
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Tasks">
				<Tab.Screen name="Tasks" component={TaskScreen} />
				<Tab.Screen name="Communities" component={CommunityScreen} />
			</Tab.Navigator>
		</NavigationContainer>
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
