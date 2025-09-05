import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, SafeAreaView, StyleSheet, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View } from 'react-native';

export default function VerificationPage() {
    const [code, setCode] = useState(['', '', '', '', '']);
    const codeInputs = useRef([]);

    const handleChange = (text: string | any[], index: number) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Focus on the next input if a digit was entered
        if (text.length === 1 && index < 4) {
            codeInputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Handle backspace to clear and move to the previous input
        if (key === 'Backspace' && index > 0 && code[index] === '') {
            codeInputs.current[index - 1].focus();
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
                        Great one, we have sent a verification code to <Text style={styles.emailText}>Example@email.com</Text>
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
                            />
                        ))}
                    </View>
                    <Text style={styles.countdownText}>Countdown in 04:58</Text>

                    <GradientButton title={'Continue'} onPress={() => router.push('/personalInformation')} />
                    {/* <GradientButton title='contiunue' onPress={() => router.push('/personalInformation')} /> */}

                    {/* Resend Link */}
                    <TouchableOpacity onPress={() => console.log('Resend code pressed')}>
                        <Text style={styles.resendText}>Can't get verification code?</Text>
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
        paddingTop: 20
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
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0c0c0cff',
        marginBottom: 10,
    },
    instructionText: {
        fontSize: 16,
        color: '#333', // Changed from '#fff' to a darker color for visibility
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
        backgroundColor: '#f5f5f5', // Changed from '#fffdfdff' for better contrast
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
    // continueButton: {
    //     width: '100%',
    //     height: 50,
    //     borderRadius: 25,
    //     marginBottom: 20,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 5,
    //     elevation: 6,
    // },
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
    },
});