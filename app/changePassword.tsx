import CustomInputs from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ChangePasswordPage() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        // Validation
        if (!email || !newPassword || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all fields',
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Passwords do not match',
            });
            return;
        }

        // Password strength validation
        if (newPassword.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Weak Password',
                text2: 'Password must be at least 8 characters',
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.FORGOT_PASSWORD}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: newPassword,
                    confirmPassword,
                }),
            });

            const result = await response.json();
            console.log('Forgot password response:', result);

            if (!response.ok || result.responseCode !== '00') {
                throw new Error(result.responseMessage || result.message || 'Failed to reset password');
            }

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: result.responseMessage || 'Password reset successfully',
            });

            // Navigate back to login after 1.5 seconds
            setTimeout(() => {
                router.replace('/login');
            }, 1500);

        } catch (error: any) {
            console.error('Forgot password error:', error);
            Toast.show({
                type: 'error',
                text1: 'Reset Failed',
                text2: error.message || 'Failed to reset password',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.inputContainer}>
                    <CustomInputs
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
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

                {isLoading ? (
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <ActivityIndicator size="large" color="#DD7800" />
                    </View>
                ) : (
                    <GradientButton title={'Continue'} onPress={handleChangePassword} />
                )}

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
