import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Property {
    id: string;
    status: string;
    address: string;
    beds: number;
    baths: number;
    sqft: number;
    image: string;
}

export default function MyPropertiesPage() {
    const [activeTab, setActiveTab] = useState<'want' | 'purchased'>('want');
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data - replace with actual data from your API
    const properties: Property[] = [
        {
            id: '1',
            status: 'In Process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
        {
            id: '2',
            status: 'In process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
        {
            id: '3',
            status: 'In Process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
        {
            id: '4',
            status: 'In Process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
        {
            id: '5',
            status: 'In Process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
        {
            id: '6',
            status: 'In Process',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: 15000,
            image: 'https://placehold.co/150x120/e0e0e0/555?text=Property'
        },
    ];

    const renderPropertyCard = ({ item }: { item: Property }) => (
        <TouchableOpacity style={styles.propertyCard} onPress={() => router.push('/PropertyDetails')}>
            <View style={styles.propertyInfo}>
                <Text style={styles.statusText}>{item.status}</Text>
                <Text style={styles.addressText}>{item.address}</Text>
                <Text style={styles.detailsText}>
                    {item.beds} Beds, {item.baths} Bath, {item.sqft} sq ft
                </Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.propertyImage} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Properties</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'want' && styles.activeTab]}
                    onPress={() => setActiveTab('want')}
                >
                    <Text style={[styles.tabText, activeTab === 'want' && styles.activeTabText]}>
                        want to buy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'purchased' && styles.activeTab]}
                    onPress={() => setActiveTab('purchased')}
                >
                    <Text style={[styles.tabText, activeTab === 'purchased' && styles.activeTabText]}>
                        Purchased Properties
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Property List */}
            <FlatList
                data={properties}
                renderItem={renderPropertyCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 50,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        alignItems: 'flex-end',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 48,
        fontSize: 16,
        color: '#333',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        gap: 16,
    },
    tab: {
        paddingBottom: 8,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#DD7800',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#1a1a1a',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    propertyCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    propertyInfo: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 12,
    },
    statusText: {
        fontSize: 14,
        color: '#DD7800',
        fontWeight: '600',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 13,
        color: '#888',
    },
    propertyImage: {
        width: 120,
        height: 90,
        borderRadius: 12,
    },
});
