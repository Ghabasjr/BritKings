import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendOTP, validateOTP } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function VerificationPage() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
    const codeInputs = useRef<Array<TextInput | null>>([]);

    const dispatch = useAppDispatch();
    const { isLoading, pendingVerificationEmail } = useAppSelector((state) => state.auth);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [countdown]);


    useEffect(() => {
        // Send OTP when component mounts (only if we have an email)
        const sendInitialOTP = async () => {
            if (!pendingVerificationEmail) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'No email found for verification',
                });
                return;
            }

            try {
                await dispatch(sendOTP(pendingVerificationEmail)).unwrap();
                Toast.show({
                    type: 'success',
                    text1: 'OTP Sent',
                    text2: 'Verification code sent to your email',
                });
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Send OTP',
                    text2: error || 'Please try again',
                });
            }
        };

        sendInitialOTP();
    }, [pendingVerificationEmail]); // Re-run if email changes


    // Format countdown time
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Focus on the next input if a digit was entered
        if (text.length === 1 && index < 5) {
            codeInputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Handle backspace to clear and move to the previous input
        if (key === 'Backspace' && index > 0 && code[index] === '') {
            codeInputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpCode = code.join('');

        if (otpCode.length !== 6) {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                text2: 'Please enter the complete 6-digit code',
            });
            return;
        }

        if (!pendingVerificationEmail) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No email found for verification',
            });
            return;
        }

        try {
            const result = await dispatch(validateOTP({
                otp: otpCode,
                email: pendingVerificationEmail
            })).unwrap();

            Toast.show({
                type: 'success',
                text1: result?.responseMessage || result?.message || 'Verification Successful',
                text2: 'Your account has been verified',
            });

            // Navigate to personal information page
            router.push('/login');
        } catch (error: any) {
            console.error('Verification error:', error);

            // Extract meaningful error message
            let errorMessage = 'Invalid OTP code';

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
                text1: 'Verification Failed',
                text2: errorMessage,
            });
        }
    };

    const handleResendOTP = async () => {
        if (!pendingVerificationEmail) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No email found for verification',
            });
            return;
        }

        try {
            const result = await dispatch(sendOTP(pendingVerificationEmail)).unwrap();

            Toast.show({
                type: 'success',
                text1: result?.responseMessage || result?.message || 'OTP Sent',
                text2: 'A new verification code has been sent',
            });

            // Reset countdown and code
            setCountdown(300);
            setCode(['', '', '', '', '', '']);
            codeInputs.current[0]?.focus();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to Send OTP',
                text2: error?.message || error || 'Please try again',
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#DD7800" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Verification</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Content Section */}
                <View style={styles.contentContainer}>
                    <Text style={styles.pageTitle}>Britkings</Text>
                    <Text style={styles.instructionText}>
                        Great one, we have sent a verification code to your email/phone
                    </Text>

                    {/* Code Input Fields */}
                    <View style={styles.codeInputContainer}>
                        {code.map((value, index) => (
                            <TextInput
                                key={index}
                                style={styles.codeInput}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(event) => handleKeyPress(event, index)}
                                value={value}
                                ref={(ref) => (codeInputs.current[index] = ref)}
                                editable={!isLoading}
                            />
                        ))}
                    </View>
                    <Text style={styles.countdownText}>
                        {countdown > 0 ? `Countdown: ${formatTime(countdown)}` : 'Code expired'}
                    </Text>

                    {isLoading ? (
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <ActivityIndicator size="large" color="#DD7800" />
                        </View>
                    ) : (
                        <GradientButton title={'Continue'} onPress={handleVerify} />
                    )}

                    {/* Resend Link */}
                    <TouchableOpacity
                        onPress={handleResendOTP}
                        disabled={isLoading || countdown > 0}
                    >
                        <Text style={[
                            styles.resendText,
                            (isLoading || countdown > 0) && { opacity: 0.5 }
                        ]}>
                            {countdown > 0 ? "Can't get verification code?" : "Resend Code"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0c0b0bff',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
        paddingBottom: 100,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0c0c0cff',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    emailText: {
        fontWeight: 'bold',
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 300,
        marginBottom: 10,
    },
    codeInput: {
        width: 50,
        height: 60,
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
        color: '#141111ff',
        fontWeight: 'bold',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    countdownText: {
        fontSize: 14,
        color: '#DD7800',
        marginBottom: 40,
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
    resendText: {
        fontSize: 14,
        color: '#DD7800',
        fontWeight: 'bold',
        marginTop: 10,
    },
});
