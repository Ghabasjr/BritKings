import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NewListingScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#DD7800" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Listing</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    {renderInput('Property ID')}
                    {renderInput('Address')}
                    {renderInput('Description', true)}
                    {renderInput('Size (sq ft)')}
                    {renderInput('Bedrooms')}
                    {renderInput('Parking')}
                    {renderInput('Bathrooms')}
                    {renderInput('Pools')}
                    {renderInput('Price')}
                    {renderInput('Status')}
                </View>

                {/* Upload */}
                <Text style={styles.imageHeader}>Property image</Text>
                <View style={styles.imageUploadContainer}>
                    <Text style={styles.uploadText}>Upload Image Here</Text>
                    <GradientButton
                        title={'Browse Files'}
                        onPress={() => console.log('Browse Files Pressed')}
                    />
                </View>

                {/* Submit */}
                <GradientButton title={'Preview'} onPress={() => router.push('')} />
            </ScrollView>
        </SafeAreaView>
    );
}

const renderInput = (placeholder, multiline = false) => (
    <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholderTextColor="#A9A9A9"
    />
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 1,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#DD7800",
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    imageHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    imageUploadContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: '#FFC107',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    uploadText: {
        marginBottom: 10,
        color: '#A9A9A9',
    },
});
