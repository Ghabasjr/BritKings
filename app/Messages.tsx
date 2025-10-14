import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Message Item Interface
interface MessageItem {
    id: string;
    name: string;
    message: string;
    time: string;
    unread: number;
    avatar: string;
}

// Sample Messages Data
const messagesData: MessageItem[] = [
    {
        id: '1',
        name: 'Aliyu Shuaibu',
        message: 'Please can we meet tomorrow',
        time: '12 Min',
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: '2',
        name: 'Aliyu Shuaibu',
        message: 'Please can we meet tomorrow',
        time: '12 Min',
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: '3',
        name: 'Aliyu Shuaibu',
        message: 'Please can we meet tomorrow',
        time: '12 Min',
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        id: '4',
        name: 'Aliyu Shuaibu',
        message: 'Please can we meet tomorrow',
        time: '12 Min',
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
        id: '5',
        name: 'Aliyu Shuaibu',
        message: 'Please can we meet tomorrow',
        time: '12 Min',
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?img=5'
    }
];

// Message Item Component
const MessageItem = ({ item }: { item: MessageItem }) => (
    <TouchableOpacity
        style={styles.messageItem}
        onPress={() => router.push({ pathname: '/ChatDetail', params: { name: item.name, avatar: item.avatar } })}
    >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.messageFooter}>
                <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </View>
    </TouchableOpacity>
);

export default function MessagesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#DD7800" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Messages</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Search Bar Placeholder */}
            <View style={styles.searchPlaceholder} />

            {/* Messages List */}
            <FlatList
                data={messagesData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MessageItem item={item} />}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    placeholder: {
        width: 40,
    },
    searchPlaceholder: {
        height: 60,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
        borderRadius: 12,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    messageContent: {
        flex: 1,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    time: {
        fontSize: 14,
        color: '#999',
    },
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontSize: 15,
        color: '#666',
        flex: 1,
        marginRight: 12,
    },
    unreadBadge: {
        backgroundColor: '#4CD964',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    separator: {
        height: 12,
    }
});
