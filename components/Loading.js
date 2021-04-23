import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";


export default function Loading() {
	return <View style={styles.screen}><Text style={styles.loadingText}>THIS IS MY REALLY COOL LOADING SCREEN</Text></View>;
}

const styles =StyleSheet.create({
	screen: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	loadingText: {
		color: '#ecdb8d'
	}
})
