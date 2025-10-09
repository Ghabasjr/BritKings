import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type GradientButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};


const GradientButton: React.FC<GradientButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled || loading}>
            <LinearGradient
                start={[0, 0]}
                end={[1, 0]}
                style={[styles.button, (disabled || loading) && { opacity: 0.6 }]}
                colors={["#DD7800", "#DD7800"]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.text}>{title}</Text>
                    {loading && <ActivityIndicator size='small' color='#fff' style={{ marginLeft: 10 }} />}
                </View>
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
