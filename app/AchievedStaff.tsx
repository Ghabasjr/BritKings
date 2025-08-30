import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Dummy data for the list of staffs
const staffList = [
    { id: '1', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Ethan Harper', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    // Add more staff members as needed
];

const StaffItem = ({ name, role, image }) => (
    <View style={styles.staffItem}>
        <Image source={{ uri: image }} style={styles.staffImage} />
        <View>
            <Text style={styles.staffName}>{name}</Text>
            <Text style={styles.staffRole}>{role}</Text>
        </View>
    </View>
);

export default function ArchivedStaffsScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Archived Staffs</Text>
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

            {/* Staff List */}
            <View style={styles.card}>
                <Text style={styles.listTitle}>Former staffs</Text>
                <ScrollView style={styles.listScrollView}>
                    {staffList.map(staff => (
                        <StaffItem key={staff.id} name={staff.name} role={staff.role} image={staff.image} />
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
        paddingTop: 40,
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
    listScrollView: {
        flex: 1,
    },
    staffItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    staffImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    staffName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    staffRole: {
        fontSize: 14,
        color: '#888',
    },
});