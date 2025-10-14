import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Lead Card Component matching the design from the image
interface LeadCardProps {
    name: string;
    status: string;
    location: string;
    address: string;
    beds: number;
    baths: number;
    sqft: string;
    message: string;
    image: string;
}

const LeadCard = ({ name, status, location, address, beds, baths, sqft, message, image }: LeadCardProps) => (
    <View style={styles.card}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>

        <View style={styles.propertyRow}>
            <View style={styles.propertyInfo}>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.details}>{beds} Beds, {baths} Bath, {sqft} sq ft</Text>
            </View>

            {image && (
                <Image
                    source={{ uri: image }}
                    style={styles.propertyImage}
                    resizeMode="cover"
                />
            )}
        </View>

        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
        </View>

        <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
    </View>
);

export default function LeadPage() {
    // Sample lead data - replace with actual data from API
    const leads: LeadCardProps[] = [
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

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lead</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.container}>
                    {/* Leads List */}
                    {leads.map((lead, index) => (
                        <LeadCard key={index} {...lead} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FAFAFA',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    status: {
        fontSize: 15,
        color: '#10B981',
        fontWeight: '500',
        marginBottom: 16,
    },
    propertyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    propertyInfo: {
        flex: 1,
        paddingRight: 12,
    },
    location: {
        fontSize: 14,
        color: '#DD7800',
        marginBottom: 6,
    },
    address: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 6,
    },
    details: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 4,
    },
    propertyImage: {
        width: 140,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    messageContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    messageText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    viewDetailsButton: {
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    viewDetailsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
