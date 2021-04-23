import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Card from '../Card'

export default function CommunityTask({task, claimTask, userID}) {
    const userTaskURL = "https://shared-todo-app.herokuapp.com/user_tasks/"
    const taskURL = 'https://shared-todo-app.herokuapp.com/tasks/'

    const handlePress = () => {
        fetch(userTaskURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_id: task.id,
                user_id: userID
            })
        })
        .then(response => response.json())
        .then(backEndTask => {
            task.assigned= true
             claimTask(task)
        })

        fetch(`${taskURL}${task.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                assigned: true
            })
        })
       
    } 

    	   const checkStatus = (task) => {
		   console.log('task', task, 'task priority', task.priority)
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
                <View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{task.title}</Text>
                    <View style={[styles.priority, checkStatus(task)]}></View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description}>{task.description}</Text>
                </View>
                </View>
                <View style={styles.btn}>
                    <Button title="Claim" color="#fbfbfc" onPress={handlePress}/>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        alignItems: 'center'
    },

    card: {
        width: 300,
        height: 200,
        marginVertical: 20,
        justifyContent: 'space-between'
    },

    titleRow: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 24,
    },

    priority: {
        height: 30,
        width: 30,
        borderRadius: 50
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

    description: {
        fontSize: 16,
    },

    btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#a8dde0'
    }
})