import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Card from './Card'

export default function Community(props) {
    const renderCommunityTasks = () => {
        if (props.community.tasks[0] && props.community.tasks[1]){
            return (
                <View style={styles.taskContainer}>
                        <Card style={styles.taskCard}>
                            <Text>{props.community.tasks[0].title}</Text>
                        </Card>
                        <Card style={styles.taskCard}>
                            <Text>{props.community.tasks[1].title}</Text>
                        </Card>
                    </View>
                )
        } else if (props.community.tasks[0] && !props.community.tasks[1]){
            return( 
                <View style={styles.taskContainer}>
                    <Card style={styles.taskCard}>
                        <Text>{props.community.tasks[0].title}</Text>
                    </Card>
                </View>
            )
        } else {
            <Text>No Tasks Yet!</Text> 
        }
    }

    const checkStatus = (task) => {
        if (task.priority === 'high'){
            styles.highPriority
        } else if (task.priority === 'medium'){
            styles.mediumPriority
        } else if (task.priority === 'low'){
            styles.lowPriority
        } else {
            styles.noPriority
        }
    }

    return (
        <TouchableOpacity style={styles.screen}>
            <Card style={styles.card}>
                <View style={styles.titleRow}>
                <Text style={styles.titleText}>{props.community.name}</Text>
                </View>
                <View>
                    <Text style={styles.subTitleText}>Recent Tasks</Text>
                    {renderCommunityTasks()}
                </View>
            </Card>
        </TouchableOpacity>
    )
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
        justifyContent: 'space-between'
    },

    priority: {
		position: "absolute",
		height: "100%",
		width: "4%",
		left: 0,
		top: 0,
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
    
    subTitleText: {
        padding: 10,
        fontSize: 18
    },

	taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    
    taskCard: {
        width: 160,
        height: 70,
    }
})
