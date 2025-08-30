import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type GradientButtonProps = {
    title: string;
    onPress: () => void;
};

const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                style={styles.button} colors={["#DD7800", "#DD7800"]}>
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginRight: 8,
    },
});
