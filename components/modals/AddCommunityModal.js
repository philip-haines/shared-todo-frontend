import React, {useState} from 'react'
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback} from 'react-native'
import Card from '../Card'
import Input from '../Input'

export default function AddCommunityModal(props) {
    const [communityName, setCommunityName] = useState("")
    const communityURL = 'https://shared-todo-app.herokuapp.com/communities/'
    const membershipURL = 'https://shared-todo-app.herokuapp.com/memberships/'

    const handleNameChange = (enteredText) => {
        setCommunityName(enteredText);
    };
    
    const addNewCommunity = () => {
        fetch(communityURL, {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: communityName
            })
        })
        .then(res => res.json())
        .then(newCommunity => {
            props.closeModal()
            newMembership(newCommunity)
            props.addCommunity(newCommunity)
        })
    }

        const newMembership = (newCommunity) => {
            fetch(membershipURL, {
                method: 'POST',
                headers:{
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: props.userID,
                    community_id: newCommunity.id
                })
            })
    }

    return (
        <TouchableWithoutFeedback>
            <View style={styles.screen}>
                <Card style={styles.card}>
                    <Text style={styles.titleText}>Create New Community</Text>
                    <Input
                    value={communityName}
                    placeholder="Add Name for Community"
                    onChangeText = {handleNameChange} 
                    style={styles.title}/>
                    <Button title='Submit' onPress={addNewCommunity}/>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},

	card: {
		height: "60%",
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
    },

    title: {
		width: "70%",
	},
    
    titleText: {
        fontSize: 30,
		marginBottom: 30,
    }
})