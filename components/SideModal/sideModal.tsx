

// SideModal.js
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SideModal = ({ isVisible, onClose }) => {
    const router = useRouter();

    if (!isVisible) {
        return null;
    }

    const handleNavigation = (destination) => {
        onClose();
        router.push(destination);
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/Bookings')}>
                    <Text style={styles.menuText}>Bookings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/RefundPolicy')}>
                    <Text style={styles.menuText}>Refund Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/AchievedStaff')}>
                    <Text style={styles.menuText}>Archived Staffs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/PerformanceScreen')}>
                    <Text style={styles.menuText}>Performance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/ContactUs')}>
                    <Text style={styles.menuText}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/ContactUs2')}>
                    <Text style={styles.menuText}>Contact Us</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/Tasks')}>
                    <Text style={styles.menuText}>Task</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/plots')}>
                    <Text style={styles.menuText}>Property Map View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/settings')}>
                    <Text style={styles.menuText}>Biometric Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('/settings')}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    modalContainer: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingLeft: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuItem: {
        marginBottom: 20,
    },
    menuText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default SideModal;