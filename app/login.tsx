import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';


export default function LoginPage() {
    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const handleLogin = async () => {
        if (!emailOrPhoneNumber || !password) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all fields',
            });
            return;
        }

        try {
            const result = await dispatch(login({ emailOrPhoneNumber, password })).unwrap();

            Toast.show({
                type: 'success',
                text1: result?.message || 'Login Successful',
                text2: 'Welcome back!',
            });

            // Navigate to home after successful login
            router.replace('/(tabs)');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: error?.message || error || 'Invalid credentials',
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        {/* Logo Section */}
                        <Image
                            source={require('@/assets/BritKings.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.welcomeText}>Welcome Back, To Britking</Text>

                        {/* Form Section */}
                        <View >
                            <CustomInput
                                placeholder="Email/Phone"
                                placeholderTextColor="#888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={emailOrPhoneNumber}
                                onChangeText={setEmailOrPhoneNumber}
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
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
                                <Text style={styles.forgotPasswordText}>Can't remember your password?</Text>
                            </TouchableOpacity>

                            {isLoading ? (
                                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                    <ActivityIndicator size="large" color="#DD7800" />
                                </View>
                            ) : (
                                <GradientButton
                                    title="Login"
                                    onPress={handleLogin}
                                />
                            )}

                            <View style={styles.account}>
                                <Text>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => router.push('/signup')}>
                                    <Text style={styles.signupText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Biometric Login */}
                        <TouchableOpacity style={styles.biometricButton} onPress={() => console.log('Biometric login pressed')}>
                            <Text style={styles.biometricText}>Biometric Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    account: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    welcomeText: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#070505ff',
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
        // backgroundColor: '#362f2f',
    },

    forgotPasswordText: {
        textAlign: 'right',
        color: '#DD7800',
        fontSize: 12,
        marginBottom: 20,
    },
    loginButton: {
        height: 50,
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },


    signupText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#DD7800',
    },
    biometricButton: {
        marginTop: 50,
    },
    biometricText: {
        fontSize: 16,
        color: '#DD7800',
        fontWeight: 'bold',
        alignItems: 'center'
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
});
