import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RefundPolicyScreen() {
    const currentPolicyText = "Our refund policy ensures fairness and transparency in all transactions. Refunds are processed within 14 business days for cancellations made at least 30 days before the scheduled service date. Cancellations made within 30 days of the service date may be subject to a partial refund or forfeiture of the deposit, depending on the specific terms of the agreement. For detailed information, please refer to the full policy document available on the website.";

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" />
                <Text style={styles.headerTitle}>Refund Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Current Policy Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Current Policy</Text>
                <Text style={styles.policyText}>{currentPolicyText}</Text>
            </View>

            {/* Edit Policy Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Edit Policy</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder="Type new policy here..."
                    placeholderTextColor="#A9A9A9"
                />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>save and continue</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    policyText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    textInput: {
        minHeight: 150,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        textAlignVertical: 'top',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});