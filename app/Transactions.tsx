import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Dummy data for transaction items
const transactions = [
    {
        id: '1',
        transactionId: '$500.00',
        user: 'Olivia Bennett',
        amount: '$500.00',
        date: '2024-07-26',
        paymentMethod: 'Card',
        status: 'Successful',
        property: 'The Guard residence',
        reference: 'REF789912',
        gateway: 'Paystack',
        currency: 'USD',
    },
    {
        id: '2',
        transactionId: 'TXM726738',
        user: 'Ethan coner',
        amount: '$750.00',
        date: '2024-07-26',
        // In a real app, you would have more fields for the second transaction
    },
];

const TransactionItem = ({ transaction }) => (
    <View style={styles.transactionCard}>
        {/* Transaction ID & User */}
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Transaction ID</Text>
                <Text style={styles.value}>{transaction.transactionId}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>User</Text>
                <Text style={styles.value}>{transaction.user}</Text>
            </View>
        </View>

        {/* Amount & Date */}
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.value}>{transaction.amount}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{transaction.date}</Text>
            </View>
        </View>

        {/* Payment Method & Status */}
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Payment method</Text>
                <Text style={styles.value}>{transaction.paymentMethod}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>Status</Text>
                <Text style={[styles.value, styles.statusSuccess]}>{transaction.status}</Text>
            </View>
        </View>

        {/* Property & Reference */}
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Property</Text>
                <Text style={styles.value}>{transaction.property}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>Reference</Text>
                <Text style={styles.value}>{transaction.reference}</Text>
            </View>
        </View>

        {/* Gateway & Currency */}
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Gateway</Text>
                <Text style={styles.value}>{transaction.gateway}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.value}>{transaction.currency}</Text>
            </View>
        </View>

        {/* This section appears to be a separate, simplified transaction row */}
        {transaction.id === '2' && (
            <View style={styles.simpleRow}>
                <Text style={styles.simpleRowText}>{transaction.transactionId}</Text>
                <Text style={styles.simpleRowText}>{transaction.user}</Text>
            </View>
        )}
    </View>
);

export default function TransactionScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header} >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Transaction</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#888"
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options" size={24} color="#888" />
                </TouchableOpacity>
            </View>

            {/* Transaction List */}
            <View style={styles.card}>
                <Text style={styles.listTitle}>All Transaction</Text>
                <ScrollView>
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginTop: 40
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    filterButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#888',
    },
    value: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
    statusSuccess: {
        color: '#34A853',
    },
    simpleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    simpleRowText: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});