import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FilterModalProps {
    isVisible: boolean;
    onClose: () => void;
    onApplyFilters?: (filters: any) => void;
}

const FilterModal = ({ isVisible, onClose, onApplyFilters }: FilterModalProps) => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [beds, setBeds] = useState('');
    const [propertyType, setPropertyType] = useState('');

    const handleFind = () => {
        const filters = {
            country,
            state,
            city,
            zipCode,
            priceRange,
            beds,
            propertyType,
        };
        onApplyFilters?.(filters);
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Filter</Text>
                        <TouchableOpacity onPress={handleFind}>
                            <Text style={styles.findButton}>Find</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Country */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Country</Text>
                            <TextInput
                                style={styles.input}
                                value={country}
                                onChangeText={setCountry}
                                placeholder=""
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* State */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>State</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                onChangeText={setState}
                                placeholder=""
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* City */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.input}
                                value={city}
                                onChangeText={setCity}
                                placeholder=""
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* Zip Code */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Zip Code</Text>
                            <TextInput
                                style={styles.input}
                                value={zipCode}
                                onChangeText={setZipCode}
                                placeholder=""
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Price Range */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Price Range</Text>
                            <TextInput
                                style={styles.input}
                                value={priceRange}
                                onChangeText={setPriceRange}
                                placeholder=""
                                placeholderTextColor="#999"
                            />
                        </View>

                        {/* Beds */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Beds</Text>
                            <TextInput
                                style={styles.input}
                                value={beds}
                                onChangeText={setBeds}
                                placeholder=""
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Property Type */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Property type</Text>
                            <TextInput
                                style={styles.input}
                                value={propertyType}
                                onChangeText={setPropertyType}
                                placeholder=""
                                placeholderTextColor="#999"
                            />
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    findButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#DD7800',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
    },
});

export default FilterModal;
