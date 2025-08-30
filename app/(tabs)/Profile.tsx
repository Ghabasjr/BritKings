// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React from 'react';
// import {
//     Image,
//     SafeAreaView,
//     ScrollView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// interface MenuItem {
//     id: string;
//     title: string;
//     icon: keyof typeof Ionicons.glyphMap;
//     onPress?: () => void;
// }

// const ProfileScreen = () => {
//     const personalMenuItems: MenuItem[] = [
//         { id: '1', title: 'Personal Information', icon: 'person-outline' },
//         { id: '2', title: 'KYC Status', icon: 'checkmark-circle-outline' },
//         { id: '3', title: 'Property Listing', icon: 'home-outline' },
//         { id: '4', title: 'Payment Information', icon: 'card-outline' },
//     ];

//     const accountMenuItems: MenuItem[] = [
//         { id: '5', title: 'Notification', icon: 'notifications-outline' },
//         { id: '6', title: 'Language', icon: 'language-outline' },
//         { id: '7', title: 'Help & Support', icon: 'help-circle-outline' },
//         { id: '8', title: 'Settings', icon: 'settings' }
//         { id: '9', title: 'Logout', icon: 'log-out-outline' },
//     ];

//     const handleMenuPress = (item: MenuItem) => {
//         console.log(`Pressed: ${item.title}`);
//         // Add navigation logic here
//         router.push('/')
//     };

//     const renderMenuItem = (item: MenuItem) => (
//         <TouchableOpacity
//             key={item.id}
//             style={styles.menuItem}
//             onPress={() => handleMenuPress(item)}
//             activeOpacity={0.7}
//         >
//             <View style={styles.menuItemContent}>
//                 <Ionicons name={item.icon} size={24} color="#666" style={styles.menuIcon} />
//                 <Text style={styles.menuText}>{item.title}</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="#ccc" />
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton}>
//                     <Ionicons name="chevron-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Profile</Text>
//                 <View style={styles.headerSpacer} />
//             </View>

//             <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//                 {/* Profile Section */}
//                 <View style={styles.profileSection}>
//                     <View style={styles.avatarContainer}>
//                         <Image
//                             source={{
//                                 uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
//                             }}
//                             style={styles.avatar}
//                         />
//                     </View>
//                     <Text style={styles.userName}>Efrain Carter</Text>
//                 </View>

//                 {/* Personal Section */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Personal</Text>
//                     <View style={styles.menuContainer}>
//                         {personalMenuItems.map(renderMenuItem)}
//                     </View>
//                 </View>

//                 {/* Account Section */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Account</Text>
//                     <View style={styles.menuContainer}>
//                         {accountMenuItems.map(renderMenuItem)}
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f8f9fa',
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: '#fff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#f0f0f0',
//     },
//     backButton: {
//         padding: 4,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//     },
//     headerSpacer: {
//         width: 32,
//     },
//     scrollView: {
//         flex: 1,
//     },
//     profileSection: {
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         paddingVertical: 32,
//         marginBottom: 16,
//     },
//     avatarContainer: {
//         marginBottom: 16,
//     },
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         backgroundColor: '#f0f0f0',
//     },
//     userName: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#333',
//     },
//     section: {
//         marginBottom: 24,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#666',
//         marginBottom: 12,
//         marginLeft: 16,
//     },
//     menuContainer: {
//         backgroundColor: '#fff',
//         marginHorizontal: 16,
//         borderRadius: 12,
//         overflow: 'hidden',
//     },
//     menuItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f5f5f5',
//     },
//     menuItemContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//     },
//     menuIcon: {
//         marginRight: 12,
//     },
//     menuText: {
//         fontSize: 16,
//         color: '#333',
//         flex: 1,
//     },
// });

// export default ProfileScreen;

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
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
    const personalMenuItems: MenuItem[] = [
        { id: '1', title: 'Personal Information', icon: 'person-outline' },
        { id: '2', title: 'KYC Status', icon: 'checkmark-circle-outline' },
        { id: '3', title: 'Property Listing', icon: 'home-outline' },
        { id: '4', title: 'Payment Information', icon: 'card-outline' },
    ];

    const accountMenuItems: MenuItem[] = [
        { id: '5', title: 'Notification', icon: 'notifications-outline' },
        { id: '6', title: 'Language', icon: 'language-outline' },
        { id: '7', title: 'Help & Support', icon: 'help-circle-outline' },
        { id: '8', title: 'Settings', icon: 'settings' },
        { id: '9', title: 'Logout', icon: 'log-out-outline' },
    ];

    const handleMenuPress = (item: MenuItem) => {
        console.log(`Pressed: ${item.title}`);

        switch (item.title) {
            case 'Personal Information':
                router.push('/ContactUs');
                break;
            case 'KYC Status':
                router.push('/AchievedStaff');
                break;
            case 'Property Listing':
                router.push('/property');
                break;
            case 'Payment Information':
                router.push('/Tasks');
                break;
            case 'Notification':
                router.push('/notification');
                break;
            case 'Language':
                router.push('/paymentPage');
                break;
            case 'Help & Support':
                router.push('/RefunPolicy');
                break;
            case 'Settings':
                router.push('/settings');
                break;
            case 'Logout':
                // Implement your logout logic here
                console.log('Logging out...');
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
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Efrain Carter</Text>
                </View>

                {/* Personal Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal</Text>
                    <View style={styles.menuContainer}>
                        {personalMenuItems.map(renderMenuItem)}
                    </View>
                </View>

                {/* Account Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuContainer}>
                        {accountMenuItems.map(renderMenuItem)}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
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
});

export default ProfileScreen;
