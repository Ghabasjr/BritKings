import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Lead Card Component
const LeadCard = ({ name, status, location, address, beds, baths, sqft, message, image }: any) => (
    <View style={leadStyles.card}>
        <Text style={leadStyles.name}>{name}</Text>
        <Text style={leadStyles.status}>{status}</Text>
        <View style={leadStyles.propertyInfo}>
            <Text style={leadStyles.location}>{location}</Text>
            <Text style={leadStyles.address}>{address}</Text>
            <Text style={leadStyles.details}>{beds} Beds, {baths} Bath, {sqft} sq ft</Text>
        </View>
        {image && (
            <Image
                source={{ uri: image }}
                style={leadStyles.propertyImage}
                resizeMode="cover"
            />
        )}
        <View style={leadStyles.messageContainer}>
            <Text style={leadStyles.messageText}>{message}</Text>
        </View>
        <View style={leadStyles.actionButtons}>
            <TouchableOpacity style={leadStyles.viewDetailsButton}>
                <Text style={leadStyles.viewDetailsText}>View details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={leadStyles.contactButton}>
                <Text style={leadStyles.contactText}>Contact Buyer</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const leadStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    status: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '500',
        marginBottom: 12,
    },
    propertyInfo: {
        marginBottom: 16,
    },
    location: {
        fontSize: 14,
        color: '#DD7800',
        marginBottom: 6,
    },
    address: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        marginBottom: 6,
    },
    details: {
        fontSize: 13,
        color: '#666',
    },
    propertyImage: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    messageText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },
    actionButtons: {
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
    contactButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    contactText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});

export default function AgentDashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('New');

    const leads = [
        {
            name: 'A.S Abubakar',
            status: 'New request',
            location: 'Kano, Nigeria',
            address: '123 Mable Street',
            beds: 3,
            baths: 2,
            sqft: '15000',
            message: 'I am interested in 5381 NW Z Hwy, Bates City, MO 64011.',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=300&fit=crop'
        },
    ];

    const filterOptions = ['All', 'New', 'Contacted', 'Closed'];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Text style={styles.greeting}>HEY, Agent Aliyu</Text>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity onPress={() => router.push('/Messages')} style={styles.iconButton}>
                                <Ionicons name="chatbubble-outline" size={26} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/notification')} style={styles.iconButton}>
                                <Ionicons name="notifications-outline" size={26} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Stats Cards */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>5</Text>
                                <Text style={styles.statLabel}>New lead</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>8</Text>
                                <Text style={styles.statLabel}>In Progress</Text>
                            </View>
                        </View>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>5</Text>
                                <Text style={styles.statLabel}>Closed</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>75%</Text>
                                <Text style={styles.statLabel}>Respond Rate</Text>
                            </View>
                        </View>
                    </View>

                    {/* Lead Section Title */}
                    <Text style={styles.sectionTitle}>Lead</Text>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={22} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for properties"
                            placeholderTextColor="#999"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Filter Buttons */}
                    <View style={styles.filterContainer}>
                        {filterOptions.map((filter) => (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    activeFilter === filter && styles.filterButtonActive
                                ]}
                                onPress={() => setActiveFilter(filter)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        activeFilter === filter && styles.filterTextActive
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Leads List */}
                    <View style={styles.leadsList}>
                        {leads.map((lead, index) => (
                            <LeadCard key={index} {...lead} />
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
        backgroundColor: '#FAFAFA',
        paddingTop: 25,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.3,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        marginBottom: 28,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    statNumber: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
    },
    statLabel: {
        fontSize: 14,
        color: '#A0A0A0',
        fontWeight: '400',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 18,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        height: 54,
        fontSize: 15,
        color: '#000',
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    filterButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    filterButtonActive: {
        backgroundColor: '#DD7800',
        borderColor: '#DD7800',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    filterTextActive: {
        color: '#fff',
    },
    leadsList: {
        marginBottom: 20,
    },
});
