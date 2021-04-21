import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
	return <Home />;
};

function SettingsScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Settings!</Text>
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Tasks">
				<Tab.Screen name="Tasks" component={HomeScreen} />
				<Tab.Screen name="Details" component={SettingsScreen} />
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
