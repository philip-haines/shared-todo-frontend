import React from 'react'
import {View, StyleSheet} from 'react-native'

export default function Spacer(props) {
    return <View styles={{...styles.spacer, ...props.style}}></View>
}

const styles = StyleSheet.create({
    spacer: {
        width: '100%'
    }
})