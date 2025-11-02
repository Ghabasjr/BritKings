import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { BASE_URL, CLIENT_ENDPOINTS } from '../constants/api';
import { fetchWithAuth } from '@/utils/authGuard';

const AskQuestionScreen = () => {
    const params = useLocalSearchParams();
    const propertyId = params.propertyId as string;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const wordCount = question.trim().split(/\s+/).filter(word => word.length > 0).length;
    const maxWords = 300;

    const handleSubmit = async () => {
        // Validation
        if (!name.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your name',
            });
            return;
        }

        if (!email.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your email',
            });
            return;
        }

        if (!phone.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your phone number',
            });
            return;
        }

        if (!question.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your question',
            });
            return;
        }

        if (wordCount > maxWords) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Question must not exceed ${maxWords} words`,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Retrieve agentId from params or storage if necessary
            let agentId = params.agentId as string || '';
            if (!agentId) {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    try {
                        const userData = JSON.parse(userDataString);
                        agentId = userData.agentId || userData.userId || userData.id || '';
                    } catch { }
                }
            }
            if (!agentId) throw new Error('Missing agent ID. Please use question form from property/agent profile.');
            const body = {
                message: question,
                fullName: name,
                email,
                phone,
                agentId
            };
            const res = await fetchWithAuth(`${BASE_URL}${CLIENT_ENDPOINTS.ASK_QUESTION}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const raw = await res.text();
            const result = raw ? JSON.parse(raw) : {};
            if (!res.ok || result.responseCode !== '00') {
                throw new Error(result?.responseMessage || result?.message || 'Failed to submit question');
            }
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your question has been submitted',
            });
            setTimeout(() => router.back(), 1500);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to submit question',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ask a Question</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#BBB"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#BBB"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Phone */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter phone number"
                            placeholderTextColor="#BBB"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Question */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ask your question</Text>
                        <TextInput
                            style={[styles.input, styles.questionInput]}
                            placeholder="Ask your question here"
                            placeholderTextColor="#BBB"
                            value={question}
                            onChangeText={setQuestion}
                            multiline
                            numberOfLines={8}
                            textAlignVertical="top"
                        />
                        <Text style={[
                            styles.wordCount,
                            wordCount > maxWords && styles.wordCountError
                        ]}>
                            {wordCount > 0 ? `${wordCount}/` : ''}Not more than {maxWords} words
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    <Text style={styles.submitButtonText}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    headerSpacer: {
        width: 32,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    content: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 15,
        color: '#333',
    },
    questionInput: {
        borderRadius: 20,
        minHeight: 200,
        paddingTop: 16,
        marginBottom: 8,
    },
    wordCount: {
        fontSize: 13,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },
    wordCountError: {
        color: '#EF4444',
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    submitButton: {
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#DD7800',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default AskQuestionScreen;
