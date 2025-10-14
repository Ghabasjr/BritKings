import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Property Card Component
const PropertyCard = ({ title, location, beds, baths, sqft, status, price, image, type }: any) => (
    <View style={propertyStyles.card}>
        <View style={propertyStyles.imageContainer}>
            <Image
                source={{ uri: image }}
                style={propertyStyles.image}
            />
            <View style={propertyStyles.typeTag}>
                <Text style={propertyStyles.typeText}>{type}</Text>
            </View>
            <TouchableOpacity style={propertyStyles.favoriteButton}>
                <Ionicons name="heart" size={24} color="#DD7800" />
            </TouchableOpacity>
        </View>
        <View style={propertyStyles.content}>
            <View style={propertyStyles.priceRow}>
                <Text style={propertyStyles.price}>{price}</Text>
                <View style={propertyStyles.locationRow}>
                    <Ionicons name="location-sharp" size={16} color="#666" />
                    <Text style={propertyStyles.locationText}>{location}</Text>
                </View>
            </View>
            <View style={propertyStyles.detailsRow}>
                <Text style={propertyStyles.detailsText}>{beds} beds</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>{baths} bath</Text>
                <Text style={propertyStyles.separator}>|</Text>
                <Text style={propertyStyles.detailsText}>{sqft} sqft - {status}</Text>
            </View>
            <Text style={propertyStyles.address}>{title}</Text>

            {/* Action Buttons */}
            <View style={propertyStyles.buttonRow}>
                <TouchableOpacity
                    style={propertyStyles.viewDetailsButton}
                    onPress={() => router.push('/PropertyDetails')}
                >
                    <Text style={propertyStyles.viewDetailsText}>View details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={propertyStyles.proceedButton}
                    onPress={() => router.push('/paymentPage')}
                >
                    <Text style={propertyStyles.proceedText}>Proceed To Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const propertyStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    typeTag: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#DD7800',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    favoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        padding: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 14,
        color: '#888',
    },
    separator: {
        fontSize: 14,
        color: '#ddd',
        marginHorizontal: 8,
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    viewDetailsButton: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#DD7800',
    },
    proceedButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    proceedText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});

export default function PropertiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('want to buy');

    const properties = [
        {
            title: '12345 Idris adamu yobe way, kano state',
            location: 'Kano state Nigeria',
            type: 'Apartment',
            beds: 3,
            baths: 1,
            sqft: '1,234',
            status: 'Active',
            price: '$450,999',
            image: 'https://placehold.co/600x400/e0e0e0/555?text=Property+1'
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Properties</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'want to buy' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('want to buy')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'want to buy' && styles.tabTextActive
                                ]}
                            >
                                want to buy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'Purchased Properties' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('Purchased Properties')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'Purchased Properties' && styles.tabTextActive
                                ]}
                            >
                                Purchased Properties
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Property Cards */}
                    <View style={styles.propertyList}>
                        {properties.map((property, index) => (
                            <PropertyCard key={index} {...property} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    filterButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 16,
    },
    tab: {
        paddingBottom: 8,
    },
    tabActive: {
        borderBottomWidth: 3,
        borderBottomColor: '#DD7800',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#999',
    },
    tabTextActive: {
        color: '#1a1a1a',
        fontWeight: '600',
    },
    propertyList: {
        marginBottom: 20,
    },
});
