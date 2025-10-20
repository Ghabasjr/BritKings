import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// A reusable component for a single payment summary item
const PaymentSummaryItem = ({ title, subtitle, amount }) => (
    <View style={summaryItemStyles.card}>
        <View>
            <Text style={summaryItemStyles.title}>{title}</Text>
            <Text style={summaryItemStyles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={summaryItemStyles.amount}>{amount}</Text>
    </View>
);

const summaryItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    }
});

// A reusable component for a single payment option item
const PaymentOptionItem = ({ title }) => (
    <TouchableOpacity style={optionItemStyles.card}>
        <Text style={optionItemStyles.title}>{title}</Text>
        <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
);

const optionItemStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 16,
        color: '#333',
    }
});

export default function PaymentPage() {
    const paymentSummary = [
        { title: 'Upcoming Payment', subtitle: 'Due on July 12', amount: '$1,250' },
        { title: 'Last Payment', subtitle: 'Paid on July 12', amount: '$1,250' },
        { title: 'Current Balance', subtitle: 'Balance as of today', amount: '$1,250' },
    ];

    const paymentOptions = [
        { title: 'Payment Dashboard' },
        { title: 'Payment Dashboard' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Payment Summary</Text>
                    {paymentSummary.map((item, index) => (
                        <PaymentSummaryItem key={index} {...item} />
                    ))}
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Payment Options</Text>
                    {paymentOptions.map((item, index) => (
                        <PaymentOptionItem key={index} {...item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 30
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    container: {
        paddingHorizontal: 16,
    },
    sectionContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: 12,
    },
});
