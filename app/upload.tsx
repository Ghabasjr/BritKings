import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// A component to represent an uploaded file
const UploadedFileItem = ({ fileName, progress }) => (
    <View style={fileItemStyles.container}>
        <Ionicons name="document-text-outline" size={24} color="#888" />
        <Text style={fileItemStyles.fileName}>{fileName}</Text>
        <Text style={fileItemStyles.progress}>{progress}%</Text>
    </View>
);

const fileItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fileName: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    progress: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffa500',
    },
});

export default function UploadPage() {
    const [selectedDocType, setSelectedDocType] = useState('Select Document type');

    const uploadedFiles = [
        { name: 'Identity Card', progress: 100 },
        { name: 'Land Images', progress: 90 },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Go back')}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upload</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Verify your identity</Text>
                    <Text style={styles.sectionSubtitle}>Add Supporting Document</Text>

                    {/* Document Type Dropdown */}
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text style={styles.dropdownText}>{selectedDocType}</Text>
                        <Ionicons name="chevron-down" size={20} color="#ffa500" />
                    </TouchableOpacity>

                    {/* Upload Area */}
                    <View style={styles.uploadArea}>
                        <Text style={styles.uploadText}>Upload Your Files Here</Text>
                        <TouchableOpacity style={styles.browseButton}>
                            <Text style={styles.browseButtonText}>Browse Files</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Uploaded Files List */}
                    <View style={styles.uploadedFilesContainer}>
                        <Text style={styles.uploadedFilesTitle}>Uploaded Files</Text>
                        {uploadedFiles.map((file, index) => (
                            <UploadedFileItem
                                key={index}
                                fileName={file.name}
                                progress={file.progress}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Continue Button */}
            <GradientButton title='Continue' onPress={() => router.push('/login')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#362f2f',
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
        color: '#fff',
    },
    scrollContent: {
        padding: 16,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    dropdownText: {
        fontSize: 16,
        color: '#888',
    },
    uploadArea: {
        width: '100%',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ffa500',
        borderRadius: 16,
        alignItems: 'center',
        padding: 40,
        marginBottom: 30,
    },
    uploadText: {
        fontSize: 16,
        color: '#888',
        marginBottom: 15,
    },
    browseButton: {
        backgroundColor: '#ffa500',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadedFilesContainer: {
        width: '100%',
    },
    uploadedFilesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    continueButton: {
        height: 50,
        borderRadius: 25,
        marginHorizontal: 16,
        marginBottom: 20,
        marginTop: 20,
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
});
