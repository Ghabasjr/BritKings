import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// A reusable component for a single task item
const TaskItem = ({ icon, title, message }) => (
    <TouchableOpacity style={taskItemStyles.card}>
        <View style={taskItemStyles.iconContainer}>
            <Ionicons name={icon} size={24} color="#333" />
        </View>
        <View style={taskItemStyles.content}>
            <Text style={taskItemStyles.title}>{title}</Text>
            <Text style={taskItemStyles.message}>{message}</Text>
        </View>
    </TouchableOpacity>
);

const taskItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
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
    }
});

export default function TasksPage() {
    const unresolvedInquiries = [
        { icon: 'time-outline', title: 'Property Inquiry', message: 'Inquiry about property availability' },
        { icon: 'eye-outline', title: 'Viewing Request', message: 'Request for property viewing' },
    ];

    const pendingVerification = [
        { icon: 'person-outline', title: 'User verification', message: 'Verification for new user account' },
        { icon: 'home-outline', title: 'Owner Verification', message: 'Verification for property owner' },
    ];

    const overdueBookings = [
        { icon: 'calendar-outline', title: 'Booking Overdue', message: 'Booking for apartment unit 203' },
    ];

    const assignedTasks = [
        { icon: 'document-text-outline', title: 'Clients Follow up', message: 'Follow up with potential client' },
        { icon: 'document-text-outline', title: 'Listing Preview', message: 'Review new property listing' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Task</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionHeader}>Unresolved Inquiries</Text>
                {unresolvedInquiries.map((task, index) => (
                    <TaskItem key={index} {...task} />
                ))}

                <Text style={styles.sectionHeader}>Pending KYC Verification</Text>
                {pendingVerification.map((task, index) => (
                    <TaskItem key={index} {...task} />
                ))}

                <Text style={styles.sectionHeader}>Overdue Bookings</Text>
                {overdueBookings.map((task, index) => (
                    <TaskItem key={index} {...task} />
                ))}

                <Text style={styles.sectionHeader}>Assigned Tasks</Text>
                {assignedTasks.map((task, index) => (
                    <TaskItem key={index} {...task} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50
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
    scrollContent: {
        padding: 16,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 8,
    },
});
