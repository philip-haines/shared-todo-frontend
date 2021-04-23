import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native'

import Card from './Card'
import CommunityShow from '../screens/CommunityShowPage'

export default function Community(props) {
    const [modalVisibility, setModalVisibility] = useState(false)


    const renderCommunityTasks = () => {

        if(!props.community.tasks){
            return
        } else {
                if (props.community.tasks[0] && props.community.tasks[1]){
            return (
                <View style={styles.taskContainer}>
                        <Card style={styles.taskCard}>
                            <Text>{props.community.tasks[0].title}</Text>
                            <View style={[styles.priority, checkStatus(props.community.tasks[0])]}></View>
                        </Card>
                        <Card style={styles.taskCard}>
                            <Text>{props.community.tasks[1].title}</Text>
                            <View style={[styles.priority, checkStatus(props.community.tasks[1])]}></View>
                        </Card>
                    </View>
                )
        } else if (props.community.tasks[0] && !props.community.tasks[1]){
            return( 
                <View style={styles.taskContainer}>
                    <Card style={styles.taskCard}>
                        <Text>{props.community.tasks[0].title}</Text>
                        <View style={[styles.priority, checkStatus(props.community.tasks[0])]}></View>
                    </Card>
                </View>
            )
        } else {
            return <Text>All Tasks Completed!</Text> 
        }
    }
}

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

    const showModal = () => {
        setModalVisibility(true)
    }

    const closeModal = () => {
        setModalVisibility(false)
    }

    return (
        <TouchableOpacity style={styles.screen} onPress={showModal}>
            <Modal visible={modalVisibility}>
                <CommunityShow community={props.community} closeModal={closeModal} showModal={showModal} addTask={props.addTask} claimTask={props.claimTask}/>
            </Modal>
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

    cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: "100%",
	},

    priority: {
		height: "10%",
        width: "100%",
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 160,
        height: 70,
    }
})
