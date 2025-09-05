import GradientButton from '@/components/GradientButton/GradientButton';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface Submission {
    id: string;
    name: string;
    avatar: string;
    status: 'Active' | 'Pending' | 'Resolved';
    time: string;
}

const ContactUsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const submissions: Submission[] = [
        { id: '1', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
        { id: '2', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
        { id: '3', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
        { id: '4', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
        { id: '5', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
        { id: '6', name: 'Efrain Hargrave', avatar: '👨‍💼', status: 'Active', time: '2 days' },
    ];

    const filteredSubmissions = submissions.filter(submission =>
        submission.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNewSubmission = () => {
        console.log('New Submission pressed');
        // Add navigation to new submission form
    };

    const handleSubmissionPress = (submission: Submission) => {
        console.log('Submission pressed:', submission.name);
        // Add navigation to submission details
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return '#22c55e';
            case 'Pending':
                return '#f59e0b';
            case 'Resolved':
                return '#6b7280';
            default:
                return '#6b7280';
        }
    };

    const renderSubmissionItem = ({ item }: { item: Submission }) => (
        <TouchableOpacity
            style={styles.submissionItem}
            onPress={() => handleSubmissionPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarEmoji}>{item.avatar}</Text>
            </View>

            <View style={styles.submissionContent}>
                <Text style={styles.submissionName}>{item.name}</Text>
                <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{item.time}</Text>
                <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.content}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                {/* All Submissions Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>All Submissions</Text>
                </View>

                {/* Submissions List */}
                <FlatList
                    data={filteredSubmissions}
                    renderItem={renderSubmissionItem}
                    keyExtractor={(item) => item.id}
                    style={styles.submissionsList}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />

                {/* New Submission Button */}
                <View style={styles.buttonContainer}>
                    <GradientButton
                        onPress={handleNewSubmission} title={'New Submission'} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    headerSpacer: {
        width: 32,
    },
    content: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#f8f9fa',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    submissionsList: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 8,
    },
    submissionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarEmoji: {
        fontSize: 24,
    },
    submissionContent: {
        flex: 1,
    },
    submissionName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
    },
    timeContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    separator: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginLeft: 76,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    newSubmissionButton: {
        backgroundColor: '#ff6b35',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#ff6b35',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    newSubmissionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ContactUsScreen;