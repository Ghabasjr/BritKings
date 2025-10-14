import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '@/store/hooks';

export default function PropertyDetailsScreen() {
    const [userRole, setUserRole] = useState<'Agent' | 'Client'>('Client');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const reduxUserRole = useAppSelector((state) => state.auth.userRole);

    useEffect(() => {
        const loadUserRole = async () => {
            try {
                // First check Redux store
                if (reduxUserRole) {
                    setUserRole(reduxUserRole);
                    return;
                }

                // Fallback to AsyncStorage
                const storedRole = await AsyncStorage.getItem('userRole');
                if (storedRole === 'Agent') {
                    setUserRole('Agent');
                } else {
                    setUserRole('Client');
                }
            } catch (error) {
                console.error('Error loading user role:', error);
                setUserRole('Client');
            }
        };

        loadUserRole();
    }, [reduxUserRole]);

    const handleUpdateStatus = () => {
        setShowUpdateModal(true);
    };

    const handleConfirmUpdate = () => {
        // Handle update status logic here
        console.log('Property status updated');
        setShowUpdateModal(false);
    };

    const handleCancelUpdate = () => {
        setShowUpdateModal(false);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#DD7800" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Property Details</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Property Image Carousel */}
                <View style={styles.imageCarousel}>
                    <Image
                        source={{ uri: 'https://placehold.co/600x400/e0e0e0/555?text=Property+Image' }}
                        style={styles.mainImage}
                    />
                    <View style={styles.carouselIndicator}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* Available Badge */}
                <View style={styles.availableBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.availableText}>Available</Text>
                </View>

                {/* Address */}
                <Text style={styles.address}>12345 Idris adamu way kano, nigeria</Text>

                {/* Quick Info Cards */}
                <View style={styles.quickInfoContainer}>
                    <View style={styles.quickInfoCard}>
                        <Text style={styles.quickInfoText}>2 Bed room</Text>
                    </View>
                    <View style={styles.quickInfoCard}>
                        <Text style={styles.quickInfoText}>3 Bathroom</Text>
                    </View>
                    <View style={styles.quickInfoCard}>
                        <Text style={styles.quickInfoText}>2,014 sqft</Text>
                    </View>
                    <View style={styles.quickInfoCard}>
                        <Text style={styles.quickInfoText}>Active</Text>
                    </View>
                </View>

                {/* Property Type and Year */}
                <View style={styles.propertyInfoRow}>
                    <View style={styles.propertyInfoItem}>
                        <Ionicons name="home-outline" size={20} color="#666" />
                        <Text style={styles.propertyInfoText}>SingleFamily</Text>
                    </View>
                    <View style={styles.propertyInfoItem}>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                        <Text style={styles.propertyInfoText}>Built in 1920</Text>
                    </View>
                </View>

                {/* Price per sqft */}
                <Text style={styles.pricePerSqft}>$132/sqft</Text>

                {/* What's special */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What's special</Text>
                    <Text style={styles.sectionText}>
                        Large home on 3 acres. Blacktop and minutes from I-70. All rooms are spacious. Home needs TLC (selling "as is"), but is solid, has open floorplan and TONS of potential! Mature trees, natural light, gorgeous sunsets.
                    </Text>
                </View>

                {/* What the owner loves */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What the owner loves about this home</Text>
                    <Text style={styles.sectionText}>
                        Enjoy country living with the conveniences of nearby amenities and highway access.
                    </Text>
                </View>

                {/* Listed by */}
                <View style={styles.section}>
                    <Text style={styles.listedByLabel}>Listed by:</Text>
                    <Text style={styles.listedByName}>
                        Property Owner <Text style={styles.phoneNumber}>(+34) 7033-2222</Text>
                    </Text>
                </View>

                {/* Map */}
                <View style={styles.mapContainer}>
                    <Image
                        source={{ uri: 'https://placehold.co/600x400/e8e8e8/666?text=Map+View' }}
                        style={styles.mapImage}
                    />
                    <View style={styles.mapMarker}>
                        <Ionicons name="location" size={40} color="#DD7800" />
                    </View>
                </View>

                {/* Fact & Features */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Fact & Features</Text>

                    {/* Interio */}
                    <Text style={styles.subSectionTitle}>Interio</Text>

                    <View style={styles.featuresRow}>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Bedrooms & Bathrooms</Text>
                            <Text style={styles.featureItem}>• Bedrooms: 5</Text>
                            <Text style={styles.featureItem}>• Bedrooms: 5</Text>
                            <Text style={styles.featureItem}>• Full bathrooms: 3</Text>
                        </View>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Appliances</Text>
                            <Text style={styles.featureItem}>• Included: Refrigerator</Text>
                        </View>
                    </View>

                    <View style={styles.featuresRow}>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Features</Text>
                            <Text style={styles.featureItem}>• Flooring: Carpet, Laminate</Text>
                        </View>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Interior area</Text>
                            <Text style={styles.featureItem}>• Total interior livable area: 2,014 sqft</Text>
                        </View>
                    </View>

                    {/* Property */}
                    <Text style={styles.subSectionTitle}>Property</Text>

                    <View style={styles.featuresRow}>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Features</Text>
                            <Text style={styles.featureItem}>• Exterior features: Vinyl</Text>
                        </View>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Lot</Text>
                            <Text style={styles.featureItem}>• Size: 3 Acres</Text>
                        </View>
                    </View>

                    {/* Construction */}
                    <Text style={styles.subSectionTitle}>Construction</Text>

                    <View style={styles.featuresRow}>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Type & style</Text>
                            <Text style={styles.featureItem}>• Home type: SingleFamily</Text>
                        </View>
                        <View style={styles.featureColumn}>
                            <Text style={styles.featureLabel}>Condition</Text>
                            <Text style={styles.featureItem}>• New construction: No</Text>
                            <Text style={styles.featureItem}>• Year built: 2025</Text>
                        </View>
                    </View>
                </View>

                {/* Conditional Button based on User Role */}
                {userRole === 'Client' ? (
                    <GradientButton
                        title={'Contact Agent'}
                        onPress={() => router.push('/ContacAgent')}
                    />
                ) : (
                    <GradientButton
                        title={'Update Status'}
                        onPress={handleUpdateStatus}
                    />
                )}

                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Update Status Modal */}
            <Modal
                visible={showUpdateModal}
                transparent
                animationType="fade"
                onRequestClose={handleCancelUpdate}
            >
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.content}>
                        <Text style={modalStyles.title}>
                            Are you sure you want to give access to this buyer to make payment
                        </Text>

                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity
                                style={modalStyles.noButton}
                                onPress={handleCancelUpdate}
                            >
                                <Text style={modalStyles.noButtonText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={modalStyles.yesButton}
                                onPress={handleConfirmUpdate}
                            >
                                <Text style={modalStyles.yesButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    imageCarousel: {
        position: 'relative',
        width: '100%',
        height: 250,
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    carouselIndicator: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: '#DD7800',
        width: 24,
    },
    availableBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginLeft: 20,
        marginTop: 16,
        gap: 4,
    },
    availableText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
    address: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 20,
        marginTop: 12,
    },
    quickInfoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        marginTop: 16,
        gap: 8,
    },
    quickInfoCard: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    quickInfoText: {
        fontSize: 13,
        color: '#333',
    },
    propertyInfoRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 16,
        gap: 24,
    },
    propertyInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    propertyInfoText: {
        fontSize: 14,
        color: '#666',
    },
    pricePerSqft: {
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 20,
        marginTop: 12,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    listedByLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    listedByName: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    phoneNumber: {
        color: '#DD7800',
        fontWeight: '600',
    },
    mapContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        marginTop: 24,
    },
    mapImage: {
        width: '100%',
        height: '100%',
    },
    mapMarker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -40,
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 20,
        marginBottom: 12,
    },
    featuresRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 16,
    },
    featureColumn: {
        flex: 1,
    },
    featureLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    featureItem: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
        lineHeight: 20,
    },
    contactButton: {
        backgroundColor: '#DD7800',
        marginHorizontal: 20,
        marginTop: 32,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#DD7800',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 40,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    noButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    noButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#DD7800',
    },
    yesButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    yesButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
});
