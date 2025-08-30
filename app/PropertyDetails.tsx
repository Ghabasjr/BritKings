import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PropertyDetailsScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>

                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Property Details</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Property Images */}
            <View style={styles.imageContainer}>
                <View style={styles.imageCard}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.propertyImage} />
                    <Text style={styles.imageLabel}>Modern House</Text>
                </View>
                <View style={styles.imageCard}>
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.propertyImage} />
                    <Text style={styles.imageLabel}>Modern House</Text>
                </View>
            </View>

            {/* Property Description */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Modern House</Text>
                <Text style={styles.descriptionText}>
                    This stunning modern house offers a blend of luxury and comfort, perfect for families or individuals seeking a stylish living space. Located in a prime neighborhood, it boasts state-of-the-art amenities and breathtaking views.
                </Text>
            </View>

            {/* Property Size */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Property Size</Text>
                <View style={styles.gridContainer}>
                    {renderPropertyDetail('Size', '3000 sq ft')}
                    {renderPropertyDetail('Bedroom', '5')}
                    {renderPropertyDetail('Bathroom', '3')}
                    {renderPropertyDetail('Parking', '2 car garage')}
                </View>
            </View>

            {/* Key Features */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Key Features</Text>
                {renderFeature('Modern design')}
                {renderFeature('Spacious living')}
                {renderFeature('Gourmet Kitchen')}
                {renderFeature('Private Backyard')}
            </View>

            {/* Payment & Pricing */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Payment & Pricing</Text>
                <View style={styles.gridContainer}>
                    {renderPropertyDetail('Price', '$500,000')}
                    {renderPropertyDetail('Payment', 'Mortgage')}
                </View>
            </View>

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const renderPropertyDetail = (title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, value: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => (
    <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const renderFeature = (text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => (
    <View style={styles.featureItem}>
        <Ionicons name="checkmark-circle" size={20} color="#FFC107" style={styles.featureIcon} />
        <Text style={styles.featureText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 50,
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    imageCard: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    propertyImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    imageLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descriptionText: {
        color: '#555',
        lineHeight: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    detailCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FFC107',
    },
    detailTitle: {
        color: '#FFC107',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    featureIcon: {
        marginRight: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#555',
    },
    backButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});