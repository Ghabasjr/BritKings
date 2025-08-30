import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewListingScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="#000" />
                <Text style={styles.headerTitle}>New Listing</Text>
                <View style={{ width: 24 }} />
            </View>

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

            <Text style={styles.imageHeader}>Property image</Text>

            <View style={styles.imageUploadContainer}>
                <Text style={styles.uploadText}>Upload Image Here</Text>
                <GradientButton title={'Browse Files'}
                    onPress={() => console.log('Browse Files Pressed')}
                // style={styles.browseButton}
                />
                <Text style={styles.browseButtonText}>Browse Files</Text>

            </View>

            <TouchableOpacity style={styles.previewButton}>
                <Text style={styles.previewButtonText}>Preview</Text>
            </TouchableOpacity>
        </ScrollView>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
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
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#FFC107',
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
    browseButton: {
        backgroundColor: '#FFC107',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    browseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    previewButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    previewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});