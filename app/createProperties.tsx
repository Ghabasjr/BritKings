import GradientButton from '@/components/GradientButton/GradientButton';
import propertyService from '@/services/propertyService';
import { useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';


export default function CreatePropertiesPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [parking, setParking] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [pools, setPools] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('AVAILABLE');
    const [propertyImage, setPropertyImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { token, user }: any = useAppSelector((state) => state.auth);

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Toast.show({
                type: 'error',
                text1: 'Permission Denied',
                text2: 'Please allow access to your photos',
            });
            return;
        }

        // Pick image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setPropertyImage(result.assets[0].uri);
        }
    };

    const handleCreateProperty = async () => {
        // Validation
        if (!name || !address || !description || !size || !bedrooms || !bathroom || !price) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all required fields',
            });
            return;
        }

        if (!token) {
            Toast.show({
                type: 'error',
                text1: 'Authentication Error',
                text2: 'Please login first',
            });
            return;
        }

        setLoading(true);
        try {
            let imageUrl = 'https://via.placeholder.com/400';

            // Upload image first if available
            if (propertyImage) {
                Toast.show({
                    type: 'info',
                    text1: 'Uploading Image',
                    text2: 'Please wait...',
                });

                const userId = user?.id || 'ec9490a7-e501-436a-9bc3-771ba6';
                const uploadResponse = await propertyService.uploadDocument(userId, propertyImage, token);

                if (uploadResponse.success && uploadResponse.url) {
                    imageUrl = uploadResponse.url;
                } else {
                    Toast.show({
                        type: 'warning',
                        text1: 'Image Upload Failed',
                        text2: 'Proceeding without image',
                    });
                }
            }

            const propertyData = {
                name,
                address,
                description,
                size: parseFloat(size),
                bedrooms,
                parking: parking || '0',
                bathroom,
                pools: pools || '0',
                price: parseFloat(price),
                status: status as 'AVAILABLE' | 'SOLD' | 'RENTED',
                propertyImageUrl: imageUrl,
            };

            const response = await propertyService.createProperty(propertyData, token);

            if (response.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Property created successfully!',
                });
                router.back();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Create Property',
                    text2: response.message || 'Please try again',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'An error occurred',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
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
                        <TextInput
                            style={styles.input}
                            placeholder="Property Name *"
                            placeholderTextColor="#A9A9A9"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address *"
                            placeholderTextColor="#A9A9A9"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Description *"
                            placeholderTextColor="#A9A9A9"
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Size (sq m) *"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={size}
                            onChangeText={setSize}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bedrooms *"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={bedrooms}
                            onChangeText={setBedrooms}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Parking Spaces"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={parking}
                            onChangeText={setParking}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Bathrooms *"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={bathroom}
                            onChangeText={setBathroom}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Pools"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={pools}
                            onChangeText={setPools}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price (₦) *"
                            placeholderTextColor="#A9A9A9"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Status (AVAILABLE/SOLD/RENTED)"
                            placeholderTextColor="#A9A9A9"
                            value={status}
                            onChangeText={setStatus}
                        />

                        {/* Image Upload Section */}
                        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
                            {propertyImage ? (
                                <Image source={{ uri: propertyImage }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Ionicons name="image-outline" size={48} color="#DD7800" />
                                    <Text style={styles.uploadText}>Tap to upload property image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Submit */}
                    <GradientButton
                        title={loading ? 'Creating...' : 'Create Property'}
                        onPress={handleCreateProperty}
                        disabled={loading}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    keyboardView: {
        flex: 1,
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
    imageUploadContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DD7800',
        borderStyle: 'dashed',
        marginBottom: 15,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadText: {
        marginTop: 10,
        color: '#DD7800',
        fontSize: 14,
        fontWeight: '500',
    },
    uploadedImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});
