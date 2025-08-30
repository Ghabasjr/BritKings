// SideModal.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SideModal = ({ isVisible, onClose }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Bookings</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Refund Policy</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Archived Staffs</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Performance</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Contact Us</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Task</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Property Map View</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Biometric Settings</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Settings</Text>
                </View>
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