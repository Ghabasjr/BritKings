import CustomInputs from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Add logic here to validate and change the password
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Go back')}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Current Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="New Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <GradientButton title={'Continue'} onPress={handleChangePassword} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
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
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
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
    button: {
        width: '100%',
        backgroundColor: '#ffa500',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});
