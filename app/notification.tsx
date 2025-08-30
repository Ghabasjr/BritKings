import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// A reusable component for a single notification item
const NotificationItem = ({ icon, title, message, time }) => (
    <View style={notificationItemStyles.card}>
        <View style={notificationItemStyles.iconContainer}>
            <Ionicons name={icon} size={24} color="#DD7800" />
        </View>
        <View style={notificationItemStyles.content}>
            <Text style={notificationItemStyles.title}>{title}</Text>
            <Text style={notificationItemStyles.message}>{message}</Text>
        </View>
        <Text style={notificationItemStyles.time}>{time}</Text>
    </View>
);

const notificationItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#fff7ed',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    message: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    time: {
        fontSize: 12,
        color: '#888',
        marginLeft: 'auto',
    }
});

export default function NotificationsPage() {
    const notifications = [
        { icon: 'notifications-outline', title: 'Payment Reminder', message: 'Payment for your property is due in 3 days', time: '' },
        { icon: 'key-outline', title: 'KYC', message: 'Your KYC verification is complete', time: '1 week' },
        { icon: 'gift-outline', title: 'Promotional Message', message: 'Exclusive offers on new properties', time: '2 days' },
        { icon: 'document-text-outline', title: 'Document Ready', message: 'Your property document are ready for download', time: '2 days' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container}>
                {notifications.map((notification, index) => (
                    <NotificationItem key={index} {...notification} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
});
