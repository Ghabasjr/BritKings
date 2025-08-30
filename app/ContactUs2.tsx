import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Reusable component for displaying key-value pairs
const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default function ContactUsScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>

                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Booking Image and Info Card */}
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/400' }}
                    style={styles.mainImage}
                />
                <View style={styles.textBlock}>
                    <Text style={styles.bookingTitle}>Luxury Apartment Booking</Text>
                    <Text style={styles.bookingDetails}>Confirmed for 2 guests</Text>
                    <Text style={styles.bookingDetails}>Booking ID: 123440404</Text>
                </View>
            </View>

            {/* Booking Details Card */}
            <View style={styles.card}>
                <DetailItem label="Property" value="The Gold Residences" />
                <DetailItem label="Booking Date" value="July 14 - July 20, 2024" />
                <DetailItem label="Guest" value="Sophia Carter" />
                <DetailItem label="Contact Email" value="sophia12@gmail.com" />
            </View>

            {/* Resend Confirmation Button */}
            <GradientButton title={'Resend Confirmations'} onPress={() => router.push('/performanceScreen')} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 40,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mainImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    textBlock: {
        marginBottom: 10,
    },
    bookingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookingDetails: {
        fontSize: 12,
        color: '#888',
    },
    detailItem: {
        marginBottom: 15,
    },
    detailLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    resendButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    resendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});