import React, { useState } from 'react'
import {View, Text, StyleSheet, FlatList, Modal} from 'react-native'

import Community from '../components/Community'
import AddNewButton from '../components/AddNewButton'
import AddCommunityModal from '../components/modals/AddCommunityModal'
import Loading from '../components/Loading'


export default function UserCommunityPage(props) {
	const [modalVisibility, setModalVisibility] = useState(false)

	const showModal = () => {
		setModalVisibility(true);
	};

	const closeModal = () => {
		setModalVisibility(false);
	};

    const renderComponent = () => {
		return props.loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
				<View style={styles.topRowContainer}>
					<View style={styles.pageTitle}>
					<Text style={styles.titleText}>Communities</Text>
					</View>
				<AddNewButton showModal={showModal}/>
				</View>
				<Modal 
				visible={modalVisibility}
				> 
				<AddCommunityModal 
				addCommunity={props.addCommunity} 
				userID={props.userID}
				closeModal={closeModal}/>
				</Modal>
				<FlatList
                style={styles.flatList}
				showsVerticalScrollIndicator={false}
					keyExtractor={(community, index) => community.id}
					data={props.communities}
					renderItem={({ item }) => (
                        <Community community={item} addTask={props.addTask} claimTask={props.claimTask} userID={props.userID}/>
					)}
				></FlatList>
			</View>
		);
    };
    
    return (
        <View style={styles.screen}>
            <View style={styles.topBar}></View>
            {renderComponent()}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#d2dcfe'
    },

    topBar: {
		height: 140,
		width: "100%",
		backgroundColor: "#91AAF2",
	},

	topRowContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	pageTitle: {
		width: '100%',
		position: 'absolute',
		zIndex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},

	titleText: {
		fontSize: 24
	},


    flatList: {
		width: "100%",
		paddingTop: 10,
		marginBottom: 75,
	},
})
