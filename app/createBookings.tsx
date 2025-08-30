import CustomInputs from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CreateBookingsPage() {
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingType, setBookingType] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    const handleContinue = () => {
        // Add logic to handle the booking creation
        console.log('Full Name:', fullName);
        console.log('Contact Number:', contactNumber);
        console.log('Email Address:', emailAddress);
        console.log('Selected Property:', selectedProperty);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('Booking Type:', bookingType);
        console.log('Additional Notes:', additionalNotes);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Go back')}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Bookings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionHeader}>User Details</Text>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Full name"
                        placeholderTextColor="#888"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Contact number"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Email address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={emailAddress}
                        onChangeText={setEmailAddress}
                    />
                </View>

                <Text style={styles.sectionHeader}>Bookings Address</Text>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Select Property"
                        placeholderTextColor="#888"
                        value={selectedProperty}
                        onChangeText={setSelectedProperty}
                    />
                </View>
                <View style={styles.dateInputContainer}>
                    <View style={[styles.inputContainer, styles.dateInput]}>
                        <CustomInputs
                            style={styles.textInput}
                            placeholder="Start Date"
                            placeholderTextColor="#888"
                            value={startDate}
                            onChangeText={setStartDate}
                        />
                    </View>
                    <View style={[styles.inputContainer, styles.dateInput]}>
                        <CustomInputs
                            style={styles.textInput}
                            placeholder="End Date"
                            placeholderTextColor="#888"
                            value={endDate}
                            onChangeText={setEndDate}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Booking Type"
                        placeholderTextColor="#888"
                        value={bookingType}
                        onChangeText={setBookingType}
                    />
                </View>

                <Text style={styles.sectionHeader}>Additional Notes</Text>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={[styles.textInput, styles.multilineInput]}
                        placeholder="Additional Notes"
                        placeholderTextColor="#888"
                        multiline={true}
                        numberOfLines={4}
                        value={additionalNotes}
                        onChangeText={setAdditionalNotes}
                    />
                </View>
                <GradientButton title={'Continue'} onPress={handleContinue} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    inputContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    textInput: {
        fontSize: 16,
        color: '#333',
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInput: {
        flex: 1,
        marginRight: 8,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    button: {
        width: '100%',
        backgroundColor: '#ffa500',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
