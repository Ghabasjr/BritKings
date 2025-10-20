import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Message Interface
interface Message {
    id: string;
    text: string;
    isOwn: boolean;
    time?: string;
}

// Sample Chat Data
const initialMessages: Message[] = [
    {
        id: '1',
        text: 'hello I am an agent',
        isOwn: false,
        time: 'Today'
    },
    {
        id: '2',
        text: 'I viewed your request',
        isOwn: false,
    },
    {
        id: '3',
        text: 'Thanks for the complement',
        isOwn: true,
    },
    {
        id: '4',
        text: 'Check This',
        isOwn: true,
    }
];

export default function ChatDetailScreen() {
    const params = useLocalSearchParams();
    const { name = 'Kabira Yunus', avatar = 'https://i.pravatar.cc/150?img=1' } = params;
    const insets = useSafeAreaInsets();

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText,
                isOwn: true,
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    // Render Message Item
    const renderMessage = ({ item, index }: { item: Message; index: number }) => {
        // Check if we need to show the "Today" divider
        const showDivider = item.time === 'Today';

        return (
            <>
                {showDivider && (
                    <View style={styles.dateDivider}>
                        <Text style={styles.dateText}>{item.time}</Text>
                    </View>
                )}
                <View style={[styles.messageRow, item.isOwn ? styles.ownMessageRow : styles.otherMessageRow]}>
                    {!item.isOwn && (
                        <Image source={{ uri: avatar as string }} style={styles.messageAvatar} />
                    )}
                    <View style={[styles.messageBubble, item.isOwn ? styles.ownBubble : styles.otherBubble]}>
                        <Text style={[styles.messageText, item.isOwn ? styles.ownMessageText : styles.otherMessageText]}>
                            {item.text}
                        </Text>
                    </View>
                    {item.isOwn && <View style={styles.avatarPlaceholder} />}
                </View>
            </>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Image source={{ uri: avatar as string }} style={styles.headerAvatar} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{name}</Text>
                        <View style={styles.onlineStatus}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>Online</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="call" size={24} color="#4CD964" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="videocam" size={28} color="#4CD964" />
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
            >
                {/* Messages List */}
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    automaticallyAdjustKeyboardInsets={true}
                />

                {/* Input Area */}
                <View style={[styles.inputContainer,
                    //  { paddingBottom: Math.max(insets.bottom,) }
                ]}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Message"
                            placeholderTextColor="#999"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <TouchableOpacity style={styles.attachButton}>
                            <Ionicons name="image-outline" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    headerAvatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    onlineStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CD964',
        marginRight: 6,
    },
    onlineText: {
        fontSize: 12,
        color: '#4CD964',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messagesContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: 20,
    },
    dateDivider: {
        alignItems: 'center',
        marginVertical: 20,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    ownMessageRow: {
        justifyContent: 'flex-end',
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 40,
    },
    messageBubble: {
        maxWidth: '70%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    ownBubble: {
        backgroundColor: '#DD7800',
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 18,
    },
    ownMessageText: {
        color: '#fff',
    },
    otherMessageText: {
        color: '#1a1a1a',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingTop: 5,
        backgroundColor: '#fff',
        // borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 6,
        minHeight: 20,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#1a1a1a',
        maxHeight: 100,
        paddingVertical: 8,
    },
    attachButton: {
        padding: 4,
        marginLeft: 8,
    },
    sendButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#DD7800',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
