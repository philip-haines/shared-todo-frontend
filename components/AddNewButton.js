import React from 'react'
import {View, Button, StyleSheet} from 'react-native'

export default function AddNewButton(props) {
    return (
        		<View style={styles.addNewContainer}>
					<View style={styles.addNewButton}>
						<Button title="➕" onPress={()=>props.showModal()}/>
					</View>
				</View>
    )
}


const styles = StyleSheet.create({
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
})