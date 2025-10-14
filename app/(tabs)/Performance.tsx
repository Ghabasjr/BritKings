import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Performance Card Component
const PerformanceCard = ({ name, role, rating, status, onUpdateStatus }: any) => {
    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.header}>
                <View style={cardStyles.profileSection}>
                    <View style={cardStyles.avatar}>
                        <Text style={cardStyles.avatarText}>
                            {name.split(' ').map((n: string) => n[0]).join('')}
                        </Text>
                    </View>
                    <View>
                        <Text style={cardStyles.name}>{name}</Text>
                        <Text style={cardStyles.role}>{role}</Text>
                    </View>
                </View>
                <View style={cardStyles.statusBadge}>
                    <Text style={cardStyles.statusText}>{status}</Text>
                </View>
            </View>

            <View style={cardStyles.ratingSection}>
                <Text style={cardStyles.ratingLabel}>Current Rating</Text>
                <View style={cardStyles.ratingValue}>
                    <Text style={cardStyles.ratingNumber}>{rating}</Text>
                    <Ionicons name="star" size={18} color="#FFA500" />
                </View>
            </View>

            <View style={cardStyles.metricsContainer}>
                <View style={cardStyles.metricRow}>
                    <Text style={cardStyles.metricLabel}>Punctuality</Text>
                    <Text style={cardStyles.metricValue}>85%</Text>
                </View>
                <View style={cardStyles.progressBar}>
                    <View style={[cardStyles.progressFill, { width: '85%' }]} />
                </View>

                <View style={cardStyles.metricRow}>
                    <Text style={cardStyles.metricLabel}>Quality</Text>
                    <Text style={cardStyles.metricValue}>85%</Text>
                </View>
                <View style={cardStyles.progressBar}>
                    <View style={[cardStyles.progressFill, { width: '85%' }]} />
                </View>

                <View style={cardStyles.metricRow}>
                    <Text style={cardStyles.metricLabel}>Team Work</Text>
                    <Text style={cardStyles.metricValue}>85%</Text>
                </View>
                <View style={cardStyles.progressBar}>
                    <View style={[cardStyles.progressFill, { width: '85%' }]} />
                </View>
            </View>

            <View style={cardStyles.reviewDates}>
                <Text style={cardStyles.reviewDate}>Last Review: 2024-01-15</Text>
                <Text style={cardStyles.reviewDate}>Last Review: 2024-01-15</Text>
            </View>

            <TouchableOpacity
                style={cardStyles.viewButton}
                onPress={onUpdateStatus}
            >
                <Text style={cardStyles.viewButtonText}>View Full Review</Text>
            </TouchableOpacity>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    role: {
        fontSize: 14,
        color: '#999',
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4CAF50',
    },
    ratingSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    ratingLabel: {
        fontSize: 14,
        color: '#666',
    },
    ratingValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    metricsContainer: {
        marginBottom: 16,
    },
    metricRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        marginTop: 12,
    },
    metricLabel: {
        fontSize: 14,
        color: '#666',
    },
    metricValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    progressBar: {
        height: 6,
        backgroundColor: '#F0F0F0',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 3,
    },
    reviewDates: {
        marginBottom: 16,
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    viewButton: {
        borderWidth: 1.5,
        borderColor: '#DD7800',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
    },
    viewButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#DD7800',
    },
});

// Confirmation Modal Component
const ConfirmationModal = ({ visible, onClose, onConfirm }: any) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={modalStyles.overlay}>
                <View style={modalStyles.content}>
                    <Text style={modalStyles.title}>
                        Are you sure you want to give access to this buyer to make payment
                    </Text>

                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={modalStyles.noButton}
                            onPress={onClose}
                        >
                            <Text style={modalStyles.noButtonText}>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={modalStyles.yesButton}
                            onPress={onConfirm}
                        >
                            <Text style={modalStyles.yesButtonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 40,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
        textAlign: 'center',
        lineHeight: 36,
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    noButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    noButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#DD7800',
    },
    yesButton: {
        flex: 1,
        backgroundColor: '#DD7800',
        borderRadius: 30,
        paddingVertical: 16,
        alignItems: 'center',
    },
    yesButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
});

// Main Performance Screen
export default function Performance() {
    const [activeTab, setActiveTab] = useState('Performance Review');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

    const staffData = [
        {
            id: '1',
            name: 'John Doe',
            role: 'Security Guard',
            rating: 4.5,
            status: 'Excellent',
        },
        {
            id: '2',
            name: 'John Doe',
            role: 'Security Guard',
            rating: 4.5,
            status: 'Excellent',
        },
        {
            id: '3',
            name: 'John Doe',
            role: 'Security Guard',
            rating: 4.5,
            status: 'Excellent',
        },
    ];

    const handleUpdateStatus = (staffId: string) => {
        setSelectedStaff(staffId);
        setModalVisible(true);
    };

    const handleConfirm = () => {
        // Handle the confirmation logic here
        console.log('Access granted for staff:', selectedStaff);
        setModalVisible(false);
        setSelectedStaff(null);
    };

    const handleClose = () => {
        setModalVisible(false);
        setSelectedStaff(null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>BCG ESTATE</Text>
                    <View style={styles.userSection}>
                        <Text style={styles.adminText}>Admin</Text>
                        <View style={styles.adminAvatar}>
                            <Text style={styles.adminAvatarText}>A</Text>
                        </View>
                    </View>
                </View>

                {/* Sidebar Navigation */}
                <View style={styles.sidebar}>
                    <View style={styles.sidebarItem}>
                        <Ionicons name="grid-outline" size={20} color="#666" />
                        <Text style={styles.sidebarText}>Dashboard</Text>
                    </View>
                    <View style={[styles.sidebarItem, styles.sidebarItemActive]}>
                        <Ionicons name="people-outline" size={20} color="#DD7800" />
                        <Text style={[styles.sidebarText, styles.sidebarTextActive]}>
                            Staff Directory
                        </Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Ionicons name="bar-chart-outline" size={20} color="#666" />
                        <Text style={styles.sidebarText}>Performance</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Ionicons name="star-outline" size={20} color="#666" />
                        <Text style={styles.sidebarText}>Best Staffs</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Ionicons name="archive-outline" size={20} color="#666" />
                        <Text style={styles.sidebarText}>Archive</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Ionicons name="settings-outline" size={20} color="#666" />
                        <Text style={styles.sidebarText}>Settings</Text>
                    </View>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.pageTitle}>Performance</Text>
                        <TouchableOpacity style={styles.newReviewButton}>
                            <Text style={styles.newReviewButtonText}>New Review</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'Performance Review' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('Performance Review')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'Performance Review' && styles.tabTextActive
                                ]}
                            >
                                Performance Review
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'Analytics' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('Analytics')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'Analytics' && styles.tabTextActive
                                ]}
                            >
                                Analytics
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                activeTab === 'Review schedule' && styles.tabActive
                            ]}
                            onPress={() => setActiveTab('Review schedule')}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === 'Review schedule' && styles.tabTextActive
                                ]}
                            >
                                Review schedule
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Performance Cards */}
                    <ScrollView
                        style={styles.cardsContainer}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <View style={styles.cardsGrid}>
                            {staffData.map((staff) => (
                                <PerformanceCard
                                    key={staff.id}
                                    name={staff.name}
                                    role={staff.role}
                                    rating={staff.rating}
                                    status={staff.status}
                                    onUpdateStatus={() => handleUpdateStatus(staff.id)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={20} color="#E53E3E" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Confirmation Modal */}
            <ConfirmationModal
                visible={modalVisible}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    adminText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    adminAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#DD7800',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adminAvatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    sidebar: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sidebarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 4,
    },
    sidebarItemActive: {
        backgroundColor: '#FFF8F0',
    },
    sidebarText: {
        fontSize: 15,
        color: '#666',
    },
    sidebarTextActive: {
        color: '#DD7800',
        fontWeight: '600',
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
    },
    newReviewButton: {
        backgroundColor: '#DD7800',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
    },
    newReviewButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    tabs: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    tab: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: '#fff',
    },
    tabActive: {
        backgroundColor: '#DD7800',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    tabTextActive: {
        color: '#fff',
    },
    cardsContainer: {
        flex: 1,
    },
    cardsGrid: {
        gap: 16,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E53E3E',
    },
});
