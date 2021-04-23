import React, {useState} from 'react'
import {View, StyleSheet, Text, Button, FlatList, Modal} from 'react-native'
import AddNewButton from '../components/AddNewButton'
import AddFormModal from '../components/modals/AddFormModal'
import CommunityTask from '../components/modals/CommunityTask'

export default function CommunityShowPage({community, closeModal, addTask, claimTask}) {
    const [communityTaskModalVisibility, setCommunityTaskModalVisibility] = useState(false)

    const showCommunityTaskModal = () => {
        setCommunityTaskModalVisibility(true)
    }

    const closeCommunityTaskModal = () => {
        setCommunityTaskModalVisibility(false)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}></View>
            <AddNewButton showModal={showCommunityTaskModal}/>
            <Modal visible={communityTaskModalVisibility}>
                <AddFormModal closeModal={closeCommunityTaskModal} communityID={community.id} addTask={addTask}/>
            </Modal>
            <View style={styles.communityNameContainer}>
                <Text style={styles.communityName}>{community.name}</Text>
                        <View style={styles.btn}>
                    <Button title='✖️' onPress={closeModal}/>
                </View>
            </View>
            <FlatList
            	showsVerticalScrollIndicator={false}
					keyExtractor={(task, index) => task.id}
					data={community.tasks}
					renderItem={({ item }) => (
						<CommunityTask task={item} claimTask={claimTask}/>
					)}
					style={styles.flatList}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    topBar: {
		height: 70,
		width: "100%",
		backgroundColor: "#91AAF2",
    },

    communityNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 40,
        width: "100%",
        marginVertical: 20,
    },

    communityName: {
        fontSize: 36,
    },
    
    flatList: {
        height: '100%',
        width: '100%',
    },

    btn: {
        width: 40,
        borderRadius: 50
    },
})
