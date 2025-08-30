import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface CustomInputProps {
    placeholder?: string;
    icon?: any;
    value?: string;
    onChangeText?: (text: string) => void;
    [key: string]: any;
}

const CustomInput: React.FC<CustomInputProps> = ({ placeholder, icon, value, onChangeText, ...rest }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                placeholderTextColor="#888"
                {...rest}
            />
            {icon && <Image source={icon} style={styles.icon} />}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DD7800',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 50,
        color: '#000',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#888',
    },
});
