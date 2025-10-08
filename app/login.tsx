import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function LoginPage() {
    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.auth);

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
            await dispatch(login({ emailOrPhoneNumber, password })).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Login successful!',
            });
            router.push('/(tabs)');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
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
                {/* Logo Section */}
                <Image
                    source={require('../assets/BritKings.png')}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>Welcome Back, To Britking</Text>

                {/* Form Section */}
                <View >
                    <CustomInput
                        placeholder="Email/Phone"
                        placeholderTextColor="#888"
                        keyboardType="default"
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
                                name={showPassword ? "eye-off" : "eye"}
                                size={24}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
                        <Text style={styles.forgotPasswordText}>Can't remember your password?</Text>
                    </TouchableOpacity>

                    <GradientButton title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />

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
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        alignSelf: 'center',
    },
    account: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    welcomeText: {
        fontSize: 20,
        color: '#070505ff',
        marginBottom: 40,
        alignSelf: 'center',
    },
    formContainer: {
        width: '100%',
        // backgroundColor: '#362f2f',
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
});
