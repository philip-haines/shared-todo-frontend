import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'

import Community from '../components/Community'


export default function UserCommunityPage(props) {

    const renderComponent = () => {
		return props.loading ? (
			<Loading />
		) : (
			<View style={styles.screen}>
				<FlatList
                style={styles.flatList}
				showsVerticalScrollIndicator={false}
					keyExtractor={(community, index) => community.id}
					data={props.communities}
					renderItem={({ item }) => (
                        <Community community={item} />
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
    },

    topBar: {
		height: 70,
		width: "100%",
		backgroundColor: "#91AAF2",
	},

    flatList: {
		width: "100%",
		paddingTop: 10,
		marginBottom: 130,
	},
})
