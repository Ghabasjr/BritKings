import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// A reusable component for each plot item
const PlotItem = ({ title, location, status, image }) => {
    let statusColor = '#82b586'; // Available
    let statusText = 'Available';

    if (status === 'sold') {
        statusColor = '#888';
        statusText = 'Sold';
    } else if (status === 'selected') {
        statusColor = '#ffa500';
        statusText = 'Selected';
    }

    return (
        <TouchableOpacity style={plotItemStyles.card}>
            <Image
                source={{ uri: image }}
                style={plotItemStyles.image}
            />
            <View style={plotItemStyles.content}>
                <Text style={plotItemStyles.title}>{title}</Text>
                <Text style={plotItemStyles.location}>{location}</Text>
            </View>
            <View style={plotItemStyles.statusContainer}>
                <View style={[plotItemStyles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[plotItemStyles.statusText, { color: statusColor }]}>{statusText}</Text>
                <Ionicons name="bookmark" size={24} color="#ffa500" style={plotItemStyles.bookmarkIcon} />
            </View>
        </TouchableOpacity>
    );
};

const plotItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
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
    location: {
        fontSize: 12,
        color: '#888',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    bookmarkIcon: {
        marginLeft: 10,
    }
});

export default function PlotsPage() {
    const plots = [
        { title: 'Plot 101', location: 'Kano, State', status: 'available', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 102', location: 'Kano, State', status: 'sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 103', location: 'Kano, State', status: 'sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 104', location: 'Kano, State', status: 'selected', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 105', location: 'Kano, State', status: 'selected', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 106', location: 'Kano, State', status: 'available', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
        { title: 'Plot 107', location: 'Kano, State', status: 'sold', image: 'https://placehold.co/100x100/e0e0e0/555?text=Plot' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#ffa500" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Plots</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.listContainer}>
                    {plots.map((plot, index) => (
                        <PlotItem
                            key={index}
                            title={plot.title}
                            location={plot.location}
                            status={plot.status}
                            image={plot.image}
                        />
                    ))}
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fcfcfcff',
        paddingTop: 30
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
        color: '#030303ff',
    },
    scrollContent: {
        padding: 16,
        backgroundColor: '#fff',
    },
    listContainer: {
        flex: 1,
    },
    bottomNav: {
        height: 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navText: {
        color: '#888',
    },
});
