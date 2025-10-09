import CustomInput from '@/components/CustomInputs/CustomInputs';
import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendOTP, setPendingVerificationEmail, signup } from '@/store/slices/authSlice';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const socialButtons = [
    { name: 'Google', icon: <AntDesign name="google" size={24} color="#000" />, text: 'Continue with Google' },
    { name: 'Facebook', icon: <FontAwesome name="facebook-square" size={24} color="#000" />, text: 'Continue with Facebook' },
    { name: 'Apple', icon: <AntDesign name="apple1" size={24} color="#000" />, text: 'Continue with Apple' },
];

const SocialButton = ({ icon, text, onPress }: { icon: any; text: string; onPress: () => void }) => (
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
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth);

    const handleSignup = async () => {
        // Validation
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
                text1: 'Password Mismatch',
                text2: 'Passwords do not match',
            });
            return;
        }

        if (password.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Weak Password',
                text2: 'Password must be at least 8 characters',
            });
            return;
        }

        try {
            const signupResult = await dispatch(signup({
                fullName,
                email,
                dob,
                nationality,
                address,
                occupation,
                phoneNumber,
                password,
                confirmPassword,
            })).unwrap();

            // Store email for verification
            dispatch(setPendingVerificationEmail(email));

            // Send OTP after successful signup
            const otpResult = await dispatch(sendOTP(email)).unwrap();

            Toast.show({
                type: 'success',
                text1: signupResult?.responseMessage || signupResult?.message || 'Signup Successful',
                text2: otpResult?.responseMessage || otpResult?.message || 'Verification code sent',
            });

            // Navigate to verification page
            router.push('/verification');
        } catch (error: any) {
            console.error('Signup error:', error);

            // Extract meaningful error message
            let errorMessage = 'Something went wrong';

            if (typeof error === 'string') {
                errorMessage = error;
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.error) {
                errorMessage = error.error;
            } else if (error?.data?.message) {
                errorMessage = error.data.message;
            }

            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: errorMessage,
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>

                        <View>
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

                            <CustomInput
                                placeholder="Phone Number"
                                placeholderTextColor="#888"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
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
                                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>

                            {isLoading ? (
                                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                                    <ActivityIndicator size="large" color="#DD7800" />
                                </View>
                            ) : (
                                <GradientButton title={'Continue'} onPress={handleSignup} />
                            )}

                            <View style={styles.account}>
                                <Text style={styles.alreadyAccountText}>Already have an account?</Text>
                                <TouchableOpacity onPress={() => router.push('/login')}>
                                    <Text style={styles.login}>
                                        Log In
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={styles.socialButtonsContainer}>
                            {socialButtons.map((button) => (
                                <SocialButton
                                    key={button.name}
                                    icon={button.icon}
                                    text={button.text}
                                    onPress={() => console.log(`${button.name} button pressed`)}
                                />
                            ))}
                        </View> */}

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
    scrollView: {
        flex: 1,
    },
    login: {
        color: "#DD7800"
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
        alignSelf: 'center',
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
