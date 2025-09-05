import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// A reusable component for each booking item
const BookingItem = ({ user, property, date, image }) => (
    <View style={bookingItemStyles.card}>
        <Image
            source={{ uri: image }}
            style={bookingItemStyles.image}
        />
        <View style={bookingItemStyles.content}>
            <Text style={bookingItemStyles.user}>{user}</Text>
            <Text style={bookingItemStyles.property}>{property}</Text>
            <Text style={bookingItemStyles.date}>{date}</Text>
        </View>
    </View>
);

const bookingItemStyles = StyleSheet.create({
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
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    user: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    property: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    }
});

export default function BookingsPage() {
    const [selected, setSelected] = useState({});

    const upcomingBookings = [
        { user: 'User: Alex Tuner', property: 'Property 4 - July 12-22', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { user: 'User: Alex Tuner', property: 'Property 2 - July 12-22', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { user: 'User: Alex Tuner', property: 'Property 6 - July 12-22', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bookings</Text>
                <TouchableOpacity onPress={() => router.push('/createBookings')}>
                    <Ionicons name="add" size={24} color="#DD7800" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.calendarContainer}>
                    <Text style={styles.calendarHeader}>Or select specific date (s)</Text>
                    <Calendar
                        onDayPress={day => {
                            setSelected(day.dateString);
                        }}
                        markedDates={{
                            [selected]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedColor: '#DD7800',
                                selectedTextColor: '#fff'
                            },
                            '2024-08-07': { marked: true, dotColor: '#ffa500' },
                            '2024-08-10': { marked: true, dotColor: '#ffa500' },
                            '2024-08-15': { marked: true, dotColor: '#ffa500' },
                            '2024-08-23': { marked: true, dotColor: '#ffa500' },
                            '2024-08-25': { marked: true, dotColor: '#ffa500' },
                        }}
                        style={styles.calendar}
                        theme={{
                            todayTextColor: '#ffa500',
                            arrowColor: '#ffa500',
                        }}
                    />
                </View>

                <Text style={styles.sectionHeader}>Upcoming bookings</Text>
                <View style={styles.bookingsList}>
                    {upcomingBookings.map((booking, index) => (
                        <BookingItem date={undefined} key={index} {...booking} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    paddingTop:30
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
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    calendarHeader: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    calendar: {
        borderRadius: 12,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    bookingsList: {
        marginBottom: 20,
    }
});
