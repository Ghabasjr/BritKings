import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const PaymentSuccessScreen = () => {
    const handleContactAgents = () => {
        // Navigate to Messages or Contact page
        router.push('/Messages');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            <View style={styles.content}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.successCircle}>
                        <Ionicons name="checkmark" size={80} color="#fff" />
                    </View>
                </View>

                {/* Success Message */}
                <Text style={styles.successTitle}>Payment Recieved</Text>

                {/* Contact Agents Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.contactButton}
                        onPress={handleContactAgents}
                    >
                        <Text style={styles.contactButtonText}>Contact Agents</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 40,
    },
    successCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
        marginBottom: 60,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 60,
    },
    contactButton: {
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#DD7800',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default PaymentSuccessScreen;
