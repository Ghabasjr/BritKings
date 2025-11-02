import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const ScheduleVisitScreen = () => {
    const params = useLocalSearchParams();
    const propertyId = params.propertyId as string;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());


    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
            setPreferredDate(formattedDate);
        }
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setDate(selectedTime);
            const formattedTime = selectedTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setPreferredTime(formattedTime);
        }
    };

    const handleSubmit = async () => {
        // Validation
        if (!fullName.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your full name',
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

        if (!preferredDate.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a preferred date',
            });
            return;
        }

        if (!preferredTime.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please select a preferred time',
            });
            return;
        }

        setIsLoading(true);

        try {
            let agentId = params.agentId as string || '';
            if (!agentId) {
                // Try to get agentId from AsyncStorage if required, can be left blank if strictly optional
                /* const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    try {
                        const userData = JSON.parse(userDataString);
                        agentId = userData.agentId || userData.userId || userData.id || '';
                    } catch {}
                } */
            }

            const [month, day, year] = preferredDate.split('/');
            let [time, modifier] = preferredTime.split(' ');
            const [hoursStr, minutes] = time.split(':');
            let hours = parseInt(hoursStr, 10);

            if (modifier?.toLowerCase() === 'pm' && hours < 12) hours += 12;
            if (modifier?.toLowerCase() === 'am' && hours === 12) hours = 0;

            // Construct a valid ISO timestamp
            const visitDateTime = new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
                hours,
                Number(minutes)
            ).toISOString();

            const alternateVisitDateTime = visitDateTime;

            const body = {
                propertyId,
                agentId,
                customerName: fullName,
                visitDateTime,
                alternateVisitDateTime,
                customerPhone: phone
            };
            const res = await fetchWithAuth(`${BASE_URL}${CLIENT_ENDPOINTS.CONTACT_AGENT}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const raw = await res.text();
            const result = raw ? JSON.parse(raw) : {};
            if (!res.ok || result.responseCode !== '00') {
                throw new Error(result?.responseMessage || result?.message || 'Failed to schedule visit');
            }
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your visit has been scheduled',
            });
            setTimeout(() => router.back(), 1500);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to schedule visit',
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
                <Text style={styles.headerTitle}>Schedule a Visit</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Please enter your name"
                            placeholderTextColor="#BBB"
                            value={fullName}
                            onChangeText={setFullName}
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
                            placeholder="Enter your contact"
                            placeholderTextColor="#BBB"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Preferred Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Preferred Date</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={{ color: preferredDate ? '#333' : '#BBB' }}>
                                {preferredDate || 'Select Date'}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Preferred Time */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Preferred Time</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={{ color: preferredTime ? '#333' : '#BBB' }}>
                                {preferredTime || 'Select Time'}
                            </Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={date}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                    </View>
                    {/* Additional Notes */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Additional Notes (Optional)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Any special requests or questions..."
                            placeholderTextColor="#BBB"
                            value={additionalNotes}
                            onChangeText={setAdditionalNotes}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
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
                        {isLoading ? 'Scheduling...' : 'Schedule Visit'}
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
    textArea: {
        borderRadius: 20,
        minHeight: 120,
        paddingTop: 16,
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

export default ScheduleVisitScreen;
