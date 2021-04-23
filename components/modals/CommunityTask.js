import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import Card from '../Card'

export default function CommunityTask({task, claimTask}) {
    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{task.title}</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description}>{task.description}</Text>
                </View>
                </View>
                <View style={styles.btn}>
                    <Button title="Claim" color="#fbfbfc" onPress={() => claimTask(task)}/>
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
    },

    title: {
        fontSize: 24,
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