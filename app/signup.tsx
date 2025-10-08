import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

    const handleSignup = async () => {
        if (!fullName || !email || !dob || !nationality || !address || !occupation || !phoneNumber || !password || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all fields',
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Passwords do not match',
            });
            return;
        }

        try {
            await dispatch(register({
                fullName,
                email,
                dob,
                nationality,
                address,
                occupation,
                phoneNumber,
                password,
                confirmPassword
            })).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Account created successfully!',
            });
            router.push('/verification');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Registration Failed',
                text2: error || 'Please try again',
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.container}>
                        <Text style={styles.formTitle}>Create an Account</Text>

                        <CustomInput
                            placeholder="Full Name"
                            placeholderTextColor="#888"
                            autoCapitalize="words"
                            value={fullName}
                            onChangeText={setFullName}
                        />

                        <CustomInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <CustomInput
                            placeholder="Phone Number (e.g., 2348012345678)"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />

                        <CustomInput
                            placeholder="Date of Birth (YYYY-MM-DD)"
                            placeholderTextColor="#888"
                            value={dob}
                            onChangeText={setDob}
                        />

                        <CustomInput
                            placeholder="Nationality"
                            placeholderTextColor="#888"
                            value={nationality}
                            onChangeText={setNationality}
                        />

                        <CustomInput
                            placeholder="Address"
                            placeholderTextColor="#888"
                            value={address}
                            onChangeText={setAddress}
                        />

                        <CustomInput
                            placeholder="Occupation"
                            placeholderTextColor="#888"
                            value={occupation}
                            onChangeText={setOccupation}
                        />

                        <View style={styles.passwordContainer}>
                            <CustomInput
                                placeholder="Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.passwordContainer}>
                            <CustomInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-off" : "eye"}
                                    size={24}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        <GradientButton
                            title={loading ? 'Creating Account...' : 'Continue'}
                            onPress={handleSignup}
                            disabled={loading}
                        />

                        <View style={styles.account}>
                            <Text style={styles.alreadyAccountText}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => router.push('/login')}>
                                <Text style={styles.login}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#F5F5F5',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 24,
        alignSelf: 'center',
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 25,
        zIndex: 1,
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 16,
    },
    alreadyAccountText: {
        fontSize: 14,
        color: '#888',
    },
    login: {
        fontSize: 14,
        color: '#DD7800',
        fontWeight: '600',
    },
});
