import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Logo Section */}
                <Image
                    source={{ uri: '/assets/BritKings.png' }}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>Welcome Back, To Britking</Text>

                {/* Form Section */}
                <View >
                    <CustomInput
                        placeholder="Email/Phone"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View >
                        <CustomInput
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        {/* Using a placeholder for the eye icon */}
                    </View>
                    <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
                        <Text style={styles.forgotPasswordText}>Can't remember your password?</Text>
                    </TouchableOpacity>

                    <GradientButton title={'Login'} onPress={() => router.push('/(tabs)')} />

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
});
