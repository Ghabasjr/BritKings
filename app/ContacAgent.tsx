import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactAgentScreen() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('I am interested in 5381 NW Z Hwy, Bates City, MO 64011.');
    const [scheduleVisit, setScheduleVisit] = useState(false);
    const [askQuestion, setAskQuestion] = useState(false);
    const [requestFinancing, setRequestFinancing] = useState(false);

    const handleContactAgent = () => {
        // Handle contact agent logic here
        console.log({
            name,
            phone,
            email,
            message,
            scheduleVisit,
            askQuestion,
            requestFinancing,
        });
        router.push('/ContactSuccess');
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
                <TouchableOpacity style={styles.contactButton} onPress={handleContactAgent}>
                    <Text style={styles.contactButtonText}>Contact Agent</Text>
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
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 60,
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
