import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContactSuccessScreen() {
    const handleViewMoreHomes = () => {
        router.push('/(tabs)');
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={80} color="#fff" />
                </View>

                {/* Success Title */}
                <Text style={styles.title}>Sent Successful</Text>

                {/* Success Message */}
                <Text style={styles.message}>
                    Your message has been sent to an agent. They'll reach out shortly to discuss your inquiry. You will get a comfirmation email soon
                </Text>

                {/* View More Homes Button */}
                <TouchableOpacity style={styles.viewHomesButton} onPress={handleViewMoreHomes}>
                    <Text style={styles.viewHomesButtonText}>View more homes</Text>
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 40,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        color: '#999',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    viewHomesButton: {
        backgroundColor: '#DD7800',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#DD7800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    viewHomesButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: '600',
    },
});
