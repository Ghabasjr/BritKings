import CustomInputs from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PersonalInfoPage() {
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Information</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formContainer}>
                    <CustomInputs
                        placeholder="Full name"
                        placeholderTextColor="#888"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <View style={styles.inputWithIcon}>
                        <CustomInputs
                            placeholder="Date of birth"
                            placeholderTextColor="#888"
                            value={dob}
                            onChangeText={setDob}
                        />
                        <Ionicons name="calendar-outline" size={24} color="#888" style={styles.inputIcon} />
                    </View>
                    <CustomInputs
                        placeholder="Nationality"
                        placeholderTextColor="#888"
                        value={nationality}
                        onChangeText={setNationality}
                    />
                    <CustomInputs
                        placeholder="Address"
                        placeholderTextColor="#888"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <CustomInputs
                        placeholder="Phone number"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <CustomInputs
                        placeholder="Occupation"
                        placeholderTextColor="#888"
                        value={occupation}
                        onChangeText={setOccupation}
                    />
                    <CustomInputs
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <GradientButton title={'Continue'} onPress={() => router.push('/upload')} />
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        padding: 16,
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 16,
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
    },
    continueButton: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 16,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    continueButtonGradient: {
        flex: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
