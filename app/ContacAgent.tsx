import { BASE_URL, CSTOMER_AUTH_ENDPOINTS } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ContactAgentScreen() {
    const params = useLocalSearchParams();
    const propertyId = params.propertyId as string;
    const agentId = params.agentId as string;

    // Debug logging
    console.log('ContactAgent Screen - Params:', params);
    console.log('ContactAgent Screen - propertyId:', propertyId);
    console.log('ContactAgent Screen - agentId:', agentId);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('I am interested in this property.');
    const [scheduleVisit, setScheduleVisit] = useState(false);
    const [askQuestion, setAskQuestion] = useState(false);
    const [requestFinancing, setRequestFinancing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleContactAgent = async () => {
        // Validation
        if (!name || !phone || !email || !message) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all required fields',
            });
            return;
        }

        // Validate propertyId
        if (!propertyId) {
            Toast.show({
                type: 'error',
                text1: 'Missing Property ID',
                text2: 'Property information is required',
            });
            return;
        }

        // Log warning if agentId is missing (but continue anyway)
        if (!agentId) {
            console.warn('Agent ID is missing - backend will need to assign an agent');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email',
                text2: 'Please enter a valid email address',
            });
            return;
        }

        setIsLoading(true);

        try {
            // Get auth token
            const token = await AsyncStorage.getItem('authToken');
            // Build the request body according to API spec
            const requestBody = {
                propertyId: propertyId,
                agentId: agentId || "",
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                message: message,
            };
            console.log('Preparing to send Contact Agent request', requestBody);

            console.log('Contact Agent request:', `${BASE_URL}${CSTOMER_AUTH_ENDPOINTS.CONTACT_AGENT}`);
            console.log('Request body:', JSON.stringify(requestBody, null, 2));
            console.log('agentId status:', agentId ? `Present: ${agentId}` : 'MISSING - sending empty string');

            const response = await fetch(`${BASE_URL}${CSTOMER_AUTH_ENDPOINTS.CONTACT_AGENT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                body: JSON.stringify(requestBody),
            });

            console.log('Contact Agent response status:', response.status);

            let result;
            try {
                result = await response.json();
                console.log('Contact Agent response:', result);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Invalid server response');
            }

            if (!response.ok || result.responseCode !== '00') {
                const errorMessage = result?.responseMessage || result?.message || result?.error || 'Failed to contact agent';
                throw new Error(errorMessage);
            }

            // Success
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: result?.responseMessage || 'Agent contacted successfully',
            });

            // Navigate to success page
            router.push('/ContactSuccess');
        } catch (error: any) {
            console.error('Contact Agent error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to contact agent. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 32,
                    }}
                >
                    <TouchableOpacity onPress={() => router.back()}>

                        <Ionicons name="chevron-back" size={24} color="#DD7800" />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginLeft: 8,
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#000',
                        }}
                    >
                        Contact Agent
                    </Text>
                </View>


                {/* Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Please enter your name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Phone Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="enter your contact"
                        placeholderTextColor="#999"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="as@gmail.com"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Message Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Message</Text>
                    <TextInput
                        style={[styles.input, styles.messageInput]}
                        placeholder="Enter your message"
                        placeholderTextColor="#999"
                        value={message}
                        onChangeText={setMessage}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Checkboxes */}
                <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setScheduleVisit(!scheduleVisit)}
                >
                    <View style={styles.checkbox}>
                        {scheduleVisit && <View style={styles.checkboxChecked} />}
                    </View>
                    <Text style={styles.checkboxLabel}>Schedule a visit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setAskQuestion(!askQuestion)}
                >
                    <View style={styles.checkbox}>
                        {askQuestion && <View style={styles.checkboxChecked} />}
                    </View>
                    <Text style={styles.checkboxLabel}>Ask question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setRequestFinancing(!requestFinancing)}
                >
                    <View style={styles.checkbox}>
                        {requestFinancing && <View style={styles.checkboxChecked} />}
                    </View>
                    <Text style={styles.checkboxLabel}>Request Financing Info</Text>
                </TouchableOpacity>

                {/* Contact Agent Button */}
                <TouchableOpacity
                    style={[styles.contactButton, isLoading && styles.contactButtonDisabled]}
                    onPress={handleContactAgent}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.contactButtonText}>Contact Agent</Text>
                    )}
                </TouchableOpacity>

                {/* Cancel Button */}
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
    },
    messageInput: {
        borderRadius: 20,
        minHeight: 120,
        paddingTop: 16,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        width: 14,
        height: 14,
        borderRadius: 3,
        backgroundColor: '#DD7800',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#1a1a1a',
    },
    contactButton: {
        backgroundColor: '#DD7800',
        marginTop: 32,
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#DD7800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    contactButtonDisabled: {
        backgroundColor: '#CCC',
        opacity: 0.7,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#1a1a1a',
        fontSize: 18,
        fontWeight: '600',
    },
});
