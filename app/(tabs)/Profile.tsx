import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface MenuItem {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
}

const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('userData');
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData));
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, [user]);

    const personalMenuItems: MenuItem[] = [
        { id: '1', title: 'Notification', icon: 'person-outline' },
        { id: '2', title: 'Privacy', icon: 'home-outline' },
        { id: '3', title: 'Help', icon: 'card-outline' },
    ];

    const handleSignOut = async () => {
        try {
            await dispatch(logout()).unwrap();
            router.replace('/login');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    const handleMenuPress = (item: MenuItem) => {
        console.log(`Pressed: ${item.title}`);

        switch (item.title) {
            case 'Notification':
                // Navigate to notification settings
                console.log('Navigate to Notification');
                break;
            case 'Privacy':
                // Navigate to privacy settings
                console.log('Navigate to Privacy');
                break;
            case 'Help':
                // Navigate to help/support
                console.log('Navigate to Help');
                break;
            default:
                console.warn(`No navigation route defined for: ${item.title}`);
                break;
        }
    };

    const renderMenuItem = (item: MenuItem) => (
        <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item)}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemContent}>
                <Ionicons name={item.icon} size={24} color="#666" style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    {/* <Ionicons name="chevron-back" size={24} color="#DD7800" /> */}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: userData?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>
                        {userData?.fullName || user?.fullName || ''}
                    </Text>
                    <Text style={styles.userEmail}>
                        {userData?.email || user?.email || 'ethancarater@gmail.com'}
                    </Text>
                </View>

                {/* Account Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuContainer}>
                        {personalMenuItems.map(renderMenuItem)}
                    </View>
                </View>

                {/* Sign Out Button */}
                <View style={styles.signOutContainer}>
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Back Button */}
                {/* <View style={styles.backButtonContainer}>
                    <TouchableOpacity
                        style={styles.backButtonLarge}
                        onPress={() => router.back()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 40,
    },
    header: {
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    headerSpacer: {
        width: 32,
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 16,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginLeft: 16,
    },
    menuContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIcon: {
        marginRight: 12,
    },
    menuText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    signOutContainer: {
        marginHorizontal: 16,
        marginTop: 8,
    },
    signOutButton: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    signOutText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    backButtonContainer: {
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 32,
    },
    backButtonLarge: {
        backgroundColor: '#DD7800',
        paddingVertical: 16,
        borderRadius: 50,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});

export default ProfileScreen;
