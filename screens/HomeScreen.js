import React from "react";
import { View, Text, StyleSheet, FlatList, Button, Modal } from "react-native";
import Task from "../components/Task";
import Loading from "../components/Loading";
import Card from "../components/Card";

export default function Home(props) {

    const checkUserTasks = () => {
        if(props.user.tasks.length < 0){
            return <Text style={styles.currentTasks}>Current Tasks: 0</Text>
        } else {
            return <Text style={styles.currentTasks}>Current Tasks: {props.user.tasks.length}</Text>
        }
    }

    const findCommunityTaskNumber = () => {
        let counter = 0
        props.user.communities.forEach(community => {
            counter += community.tasks.length
        })
        return <Text style={styles.currentTasks}>Open Tasks in Communities: {counter}</Text>
    }

    const findPriorityCount = () => {
        highPriority = 0
       
        lowPriority = 0
        
        const highTasks = props.user.communities.forEach(community => {
            community.tasks.filter(task => task.priority === 'high')
        })

 
        const lowTasks  = props.user.communities.forEach(community => {
            community.tasks.filter(task => task.priority === 'low')
        })

        highPriority = highTasks.length
        
        lowPriority = lowTasks.length
    }

       const findHighPriority = () => {
            const highTasks  = props.user.communities.map(community => {
            community.tasks.filter(task => task.priority === 'high')
        })
        return <Text style={styles.priorityCountText}>There are {highTasks.length} with a High priority</Text>
    }

    const findMediumPriority = () => {
            const mediumTasks  = props.user.communities.map(community => {
            community.tasks.filter(task => task.priority === 'medium')
        })
        return <Text style={styles.priorityCountText}>There are {mediumTasks.length} with a Medium priority</Text>
    }

       const findLowPriority = () => {
            const lowTasks  = props.user.communities.map(community => {
            community.tasks.filter(task => task.priority === 'low')
        })
        return <Text style={styles.priorityCountText}>There are {lowTasks.length} with a Low priority</Text>
    }

	const renderComponent = () => {
		return props.loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
                    <Card style={styles.card}>
				<Text style={styles.userName}>Hi, {props.user.name}!</Text>
                    {checkUserTasks()}
                    {findCommunityTaskNumber()}
                    <View style={styles.priorityContainer}>
                        <View style={styles.priorityRow}>
                            <View style={[styles.priority, styles.highPriority]}></View>
                            {findHighPriority()}
                        </View>
                        <View style={styles.priorityRow}>
                            <View style={[styles.priority, styles.mediumPriority]}></View>
                            {findMediumPriority()}
                        </View>
                        <View style={styles.priorityRow}>
                            <View  style={[styles.priority, styles.lowPriority]}></View>
                            {findLowPriority()}
                        </View>
                    </View>
                    </Card>
			</View>
		);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.topBar}>
				<Text style={styles.title}>Home</Text>
			</View>
			{renderComponent()}
		</View>
	);
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d2dcfe'
    },

 title: {
		marginTop: 30,
		fontSize: 24,
    },

    userName: {
        fontSize: 32,
        marginBottom: 30,
    },

    currentTasks: {
        fontSize: 24,
        marginBottom: 30,
    },
    
    card: {
        width: '90%',
        height: '60%',
        marginTop: -100
    },

	topBar: {
		height: 180,
		width: "100%",
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: "#91AAF2",
		paddingBottom: 10,
    },

    priorityContainer: {
        marginTop: 50,
        height: 200,
        justifyContent: 'space-between'
    },

    priorityRow: {
        flexDirection: "row",
        alignItems: 'center',
    },

    priority: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 20,
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

    priorityCountText: {
        fontSize: 18,
    }
})