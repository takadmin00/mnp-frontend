import React from 'react'
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function GuidesScreen({ navigation }) {

    const { height, width, fontScale } = useWindowDimensions();
    const styles = makeStyles(height, width, fontScale)
    
    return (
        <KeyboardAwareScrollView>
            <View style={styles.backgroundView}>
                <SafeAreaView style={styles.safeAreaViewContainer}>
                    <View style={styles.globalViewContainer}>
                        <Text>GuidesScreen</Text>
                    </View>
                </SafeAreaView>
            </View>
        </KeyboardAwareScrollView>
    )
}

const makeStyles = (height: number, width: number, fontScale: number) => {

    const adaptToHeight = (size: number) => {
        return ((height * size) / 844) / fontScale
    }

    const normalize = (size: number) => {
        return ((width * size) / 390) / fontScale
    }

    return StyleSheet.create({
        backgroundView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
        },
        safeAreaViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: '100%',
        },
        globalViewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            paddingHorizontal: normalize(20),
            paddingVertical: normalize(20),
        },
    })

}