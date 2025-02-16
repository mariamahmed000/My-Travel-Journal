import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OutlineButton from '../components/UI/OutlineButton';
import { useNavigation } from '@react-navigation/native';

function ErrorScreen() {
    const { navigate } = useNavigation();
    

    function backHomeHandler() {
        navigate({name:'Home'});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>
                <Text style={styles.redText}>Oops!</Text> Something went wrong.
            </Text>
            <OutlineButton onPress={backHomeHandler}>Back Home</OutlineButton>
        </View>
    );
}

export default ErrorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    mainText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    redText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
    },
});