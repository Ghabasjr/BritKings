import SideModal from '@/components/SideModal/sideModal';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// A component for the featured property cards
const FeaturedPropertyCard = ({ title, location, type, rating, price, image }: any) => (
    <TouchableOpacity style={featuredStyles.card} onPress={() => router.push('/PropertyDetails')}>
        <Image
            source={{ uri: image }}
            style={featuredStyles.image}
        />
        <TouchableOpacity style={featuredStyles.favoriteButton}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={featuredStyles.content}>
            <View style={featuredStyles.detailsRow}>
                <Text style={featuredStyles.typeText}>{type}</Text>
                <View style={featuredStyles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#DD7800" />
                    <Text style={featuredStyles.ratingText}>{rating}</Text>
                </View>
            </View>
            <Text style={featuredStyles.title}>{title}</Text>
            <View style={featuredStyles.locationRow}>
                <Ionicons name="location-sharp" size={16} color="#888" />
                <Text style={featuredStyles.locationText}>{location}</Text>
            </View>
            <View style={featuredStyles.infoRow}>
                <Text style={featuredStyles.bedrooms}>2 beds, 2 baths</Text>
                <Text style={featuredStyles.price}>{price}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const featuredStyles = StyleSheet.create({
    card: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 6,
    },
    content: {
        padding: 12,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeText: {
        fontSize: 12,
        color: '#333',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bedrooms: {
        fontSize: 12,
        color: '#888',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#DD7800",
    }
});

// A component for the recent transaction cards
const RecentTransactionCard = ({ title, status, image }: any) => {
    let statusColor = status === 'Sold' ? '#888' : '#82b586';

    return (
        <TouchableOpacity style={recentStyles.card} onPress={() => router.push('/Transactions')}>
            <Image
                source={{ uri: image }}
                style={recentStyles.image}
            />
            <View style={recentStyles.content}>
                <Text style={recentStyles.title}>{title}</Text>
                <Text style={[recentStyles.status, { color: statusColor }]}>{status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const recentStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    status: {
        fontSize: 12,
        marginTop: 4,
    }
});

export default function RealEstateHomePage() {
    // Unfiltered data for properties and transactions
    const allFeaturedProperties = [
        {
            title: 'Contemporary Home',
            location: 'Kano, State, Nigeria',
            type: 'Apartment',
            rating: 4.5,
            price: '$18,000',
            image: '../assets/BritKings.png'
        },
        {
            title: 'Luxury Villa',
            location: 'Abuja, FCT, Nigeria',
            type: 'Villa',
            rating: 4.8,
            price: '$50,000',
            image: 'https://placehold.co/600x400/e0e0e0/555?text=Property+2'
        },
        {
            title: 'Modern Townhouse',
            location: 'Lagos, State, Nigeria',
            type: 'Townhouse',
            rating: 4.2,
            price: '$25,000',
            image: 'https://placehold.co/600x400/e0e0e0/555?text=Property+3'
        },
    ];

    const allRecentTransactions = [
        { title: '123 Oak Street', status: 'Sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=House' },
        { title: '456 Pine Avenue', status: 'Sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=House' },
        { title: '789 Maple Drive', status: 'Sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=House' },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [featuredProperties, setFeaturedProperties] = useState(allFeaturedProperties);
    const [recentTransactions, setRecentTransactions] = useState(allRecentTransactions);
    const [isModalVisible, setIsModalVisible] = useState(false)

    // Function to filter data based on search query
    const handleSearch = (query: any) => {
        setSearchQuery(query);
        const lowerCaseQuery = query.toLowerCase();



        // Filter featured properties
        const filteredFeatured = allFeaturedProperties.filter(property =>
            property.title.toLowerCase().includes(lowerCaseQuery) ||
            property.location.toLowerCase().includes(lowerCaseQuery) ||
            property.type.toLowerCase().includes(lowerCaseQuery)
        );
        setFeaturedProperties(filteredFeatured);

        // Filter recent transactions
        const filteredRecent = allRecentTransactions.filter(transaction =>
            transaction.title.toLowerCase().includes(lowerCaseQuery)
        );
        setRecentTransactions(filteredRecent);
    };

    const handleCreateProperty = () => {
        router.push('/createProperties');
    }


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Ionicons name='menu' size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>BGC Real Estate</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={handleCreateProperty} style={{ marginRight: 15 }}>

                            <Ionicons name="add-circle-outline" size={24} color="#333" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/notification')}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <SideModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for properties"
                        placeholderTextColor="#888"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Featured Properties Section */}
                    <Text style={styles.sectionTitle}>Featured Properties</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScrollView}>
                        {featuredProperties.map((property, index) => (
                            <FeaturedPropertyCard key={index} {...property} />
                        ))}
                    </ScrollView>

                    {/* Recent Transactions Section */}
                    <Text style={styles.sectionTitle}>Recent Transaction</Text>
                    <View style={styles.recentList}>
                        {recentTransactions.map((transaction, index) => (
                            <RecentTransactionCard key={index} {...transaction} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 30,
        paddingBottom: 0
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        // backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    featuredScrollView: {
        marginBottom: 20,
    },
    recentList: {
        marginBottom: 20,
    }
});
