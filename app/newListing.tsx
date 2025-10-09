// import GradientButton from '@/components/GradientButton/GradientButton';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { createProperty } from '@/store/slices/propertiesSlice';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React from 'react';
// import {
//     ActivityIndicator,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import Toast from 'react-native-toast-message';

// export default function NewListingScreen() {
//     const dispatch = useAppDispatch();
//     const { isLoading } = useAppSelector((state) => state.properties);
//     const [uploading, setUploading] = React.useState(false)


//     const [form, setForm] = React.useState({
//         name: "",
//         address: "",
//         description: "",
//         size: "",
//         bedrooms: "",
//         parking: "",
//         bathrooms: "",
//         pools: "",
//         price: "",
//         status: "",
//         propertyImageUrl: "",
//     });

//     const handleChange = (key: string, value: string) => {
//         setForm({ ...form, [key]: value });
//     };

//     const handleSubmit = async () => {
//         try {
//             //convert numeric fields to numbers
//             const payload = {
//                 ...form,
//                 size: Number(form.size),
//                 price: Number(form.price),
//             };


//             const result = await dispatch(createProperty(payload)).unwrap();
//             Toast.show({
//                 type: 'success',
//                 text1: "Property created successfully",
//                 text2: result?.message || "",
//             });
//         } catch (error: any) {
//             Toast.show({
//                 type: 'error',
//                 text1: "Error creating property",
//                 text2: error?.message || "Something went wrong",
//             });
//         }
//     };

//     function handleImageUpload(): void {
//         throw new Error('Function not implemented.');
//     }

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView
//                 style={styles.container}
//                 contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => router.back()}>
//                         <Ionicons name="chevron-back" size={24} color="#DD7800" />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>New Listing</Text>
//                     <View style={{ width: 24 }} />
//                 </View>

//                 {/* Form */}
//                 <View style={styles.formContainer}>
//                     {renderInput('Property ID')}
//                     {renderInput('Address')}
//                     {renderInput('Description', true)}
//                     {renderInput('Size (sq ft)')}
//                     {renderInput('Bedrooms')}
//                     {renderInput('Parking')}
//                     {renderInput('Bathrooms')}
//                     {renderInput('Pools')}
//                     {renderInput('Price')}
//                     {renderInput('Status')}
//                 </View>

//                 <Text style={styles.imageHeader}>Property image</Text>
//                 <View style={styles.imageUploadContainer}>
//                     {uploading ? (
//                         <ActivityIndicator size='small' color='#DD7800' />
//                     ) : form.propertyImageUrl ? (
//                         <Image source={{ uri: form.propertyImageUrl }}
//                             style={{ width: 200, height: 150, borderRadius: 10, marginBottom: 10 }}
//                         />
//                     ) : (
//                         <Text style={styles.uploadText}>Upload Image Here</Text>
//                     )}
//                     <GradientButton
//                         title={uploading ? 'Uploading...' : 'Browse Files'}
//                         onPress={handleImageUpload}
//                     />
//                 </View>

//                 {/* Submit */}
//                 <GradientButton title='Create Property' onPress={handleSubmit} />
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const renderInput = (placeholder, multiline = false) => (
//     <TextInput
//         style={[styles.input, multiline && styles.multilineInput]}
//         placeholder={placeholder}
//         multiline={multiline}
//         numberOfLines={multiline ? 4 : 1}
//         placeholderTextColor="#A9A9A9"
//     />
// );

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingTop: 30
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingHorizontal: 20,
//         paddingTop: 15,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     formContainer: {
//         flex: 1,
//         marginBottom: 20,
//     },
//     input: {
//         backgroundColor: '#F5F5F5',
//         borderRadius: 15,
//         padding: 15,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: "#DD7800",
//     },
//     multilineInput: {
//         height: 100,
//         textAlignVertical: 'top',
//     },
//     imageHeader: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     imageUploadContainer: {
//         backgroundColor: '#F5F5F5',
//         borderRadius: 15,
//         padding: 20,
//         borderWidth: 1,
//         borderColor: '#FFC107',
//         borderStyle: 'dashed',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     uploadText: {
//         marginBottom: 10,
//         color: '#080707ff',
//     },
// });




import GradientButton from '@/components/GradientButton/GradientButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProperty } from '@/store/slices/propertiesSlice';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
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

export default function NewListingScreen() {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.properties);

    const [uploading, setUploading] = React.useState(false);

    const [form, setForm] = React.useState({
        name: '',
        address: '',
        description: '',
        size: '',
        bedrooms: '',
        parking: '',
        bathrooms: '',
        pools: '',
        price: '',
        status: '',
        propertyImageUrl: '',
    });

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleImageUpload = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                return Toast.show({
                    type: 'error',
                    text1: 'Permission denied',
                    text2: 'You need to grant photo access to upload an image.',
                });
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (result.canceled) return;

            const file = result.assets[0];
            setUploading(true);

            const uploadUrl =
                'https://globalroot-gateway-service-816009aa3954.herokuapp.com/api/v1/user/document/upload-document?id=ec9490a7-e501-436a-9bc3-771ba6956b21';

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: file.fileName || 'property.jpg',
                type: file.mimeType || 'image/jpeg',
            } as any);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to upload image');
            }

            const uploadedUrl = data?.url;

            setForm((prev) => ({
                ...prev,
                propertyImageUrl: uploadedUrl,
            }));

            Toast.show({
                type: 'success',
                text1: 'Image uploaded successfully',
            });
        } catch (error: any) {
            console.error('Upload error:', error);
            Toast.show({
                type: 'error',
                text1: 'Upload failed',
                text2: error.message,
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload: any = {
                ...form,
                size: Number(form.size),
                price: Number(form.price),
            };

            const result = await dispatch(createProperty(payload)).unwrap();
            console.log("Create property result", result);
            Toast.show({
                type: 'success',
                text1: 'Property created successfully',
                text2: result?.message || '',
            });
            router.push('/(tabs)/Properties');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error creating property',
                text2: error?.message || 'Something went wrong',
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='chevron-back' size={24} color='#DD7800' />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>New Listing</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {renderInput('name', 'Property Name', form.name, handleChange)}
                        {renderInput('address', 'Address', form.address, handleChange)}
                        {renderInput('description', 'Description', form.description, handleChange, true)}
                        {renderInput('size', 'Size (sq ft)', form.size, handleChange)}
                        {renderInput('bedrooms', 'Bedrooms', form.bedrooms, handleChange)}
                        {renderInput('parking', 'Parking', form.parking, handleChange)}
                        {renderInput('bathrooms', 'Bathrooms', form.bathrooms, handleChange)}
                        {renderInput('pools', 'Pools', form.pools, handleChange)}
                        {renderInput('price', 'Price', form.price, handleChange)}
                        {renderInput('status', 'Status', form.status, handleChange)}
                    </View>

                    {/* Upload */}
                    <Text style={styles.imageHeader}>Property image</Text>
                    <View style={styles.imageUploadContainer}>
                        {uploading ? (
                            <ActivityIndicator size='small' color='#DD7800' />
                        ) : form.propertyImageUrl ? (
                            <Image
                                source={{ uri: form.propertyImageUrl }}
                                style={{ width: 200, height: 150, borderRadius: 10, marginBottom: 10 }}
                            />
                        ) : (
                            <Text style={styles.uploadText}>Upload Image Here</Text>
                        )}
                        <GradientButton
                            title={uploading ? 'Uploading...' : 'Browse Files'}
                            onPress={handleImageUpload}
                        />
                    </View>

                    {/* Submit */}
                    <View style={{ position: 'relative' }}>

                        <GradientButton
                            title={isLoading ? 'Creating...' : 'Create Property'}
                            onPress={handleSubmit}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                        {/* {isLoading && (
                            <ActivityIndicator
                                size='small'
                                color='#FFFFFF'
                                style={{ position: 'absolute', right: 30, top: '30%' }}
                            />
                        )} */}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const renderInput = (
    key: string,
    placeholder: string,
    value: string,
    handleChange: (key: string, value: string) => void,
    multiline = false
) => (
    <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChange(key, text)}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        placeholderTextColor='#A9A9A9'
    />
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
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
        borderColor: '#DD7800',
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
