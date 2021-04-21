import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card(props) {
	return (
		<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
	);
}

const styles = {
	card: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,

		elevation: 8,

		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
	},
};
