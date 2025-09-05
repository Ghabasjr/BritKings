import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const socialButtons = [
    { name: 'Google', icon: <AntDesign name="google" size={24} color="#000" />, text: 'Continue with Google' },
    { name: 'Facebook', icon: <FontAwesome name="facebook-square" size={24} color="#000" />, text: 'Continue with Facebook' },
    { name: 'Apple', icon: <AntDesign name="apple1" size={24} color="#000" />, text: 'Continue with Apple' },
];

const SocialButton = ({ icon, text, onPress }) => (
    <TouchableOpacity style={socialButtonStyles.button} onPress={onPress}>
        {icon}
        <Text style={socialButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
);

const socialButtonStyles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    text: {
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View>
                    <Text style={styles.formTitle}>Create an Account</Text>

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
                    </View>

                    <GradientButton title={'Continue'} onPress={() => router.push('/verification')} />
                    <View style={styles.account}>

                        <Text style={styles.alreadyAccountText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text style={styles.login}>
                                Log In
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.socialButtonsContainer}>
                        {socialButtons.map((button) => (
                            <SocialButton
                                key={button.name}
                                icon={button.icon}
                                text={button.text}
                                onPress={() => console.log(`${button.name} button pressed`)}
                            />
                        ))}
                    </View>

                    <View style={styles.biometricContainer}>
                        <Text style={styles.biometricText}>Enable biometric authentication</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#ffa500' }}
                            thumbColor={isBiometricEnabled ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setIsBiometricEnabled}
                            value={isBiometricEnabled}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#F5F5F5',

    },
    login: {
        color:"#DD7800"
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    account: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    formContainer: {
        flex: 1,

        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        marginTop: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    passwordIcon: {
        marginLeft: 10,
    },
    continueButton: {
        height: 50,
        borderRadius: 25,
        marginBottom: 16,
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
    alreadyAccountText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    socialButtonsContainer: {
        marginBottom: 20,
    },
    biometricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    biometricText: {
        fontSize: 16,
        color: '#333',

    },
});
