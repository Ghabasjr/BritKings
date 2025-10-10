import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuickActionItem {
    label: string;
    onPress: () => void;
}

interface QuickActionsDropdownProps {
    visible: boolean;
    onClose: () => void;
    actions: QuickActionItem[];
    title?: string;
    anchorRight?: number;
    anchorTop?: number;
}

export default function QuickActionsDropdown({
    visible,
    onClose,
    actions,
    title = "Quick Actions",
    anchorRight = 16,
    anchorTop = 56,
}: QuickActionsDropdownProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.overlay}
                onPress={onClose}
            >
                <View style={[styles.dropdown, { right: anchorRight, top: anchorTop }]}>
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                    {actions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionBtn}
                            onPress={() => {
                                onClose();
                                // Use setTimeout to ensure modal closes before navigation
                                setTimeout(() => {
                                    action.onPress();
                                }, 100);
                            }}
                        >
                            <Text style={styles.actionText}>{action.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 10,
        minWidth: 200,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    title: {
        fontWeight: "600",
        color: "#888",
        fontSize: 14,
        paddingHorizontal: 18,
        paddingBottom: 8,
        paddingTop: 2,
    },
    actionBtn: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderBottomWidth: 0.5,
        borderBottomColor: "#f0f0f0",
    },
    actionText: {
        color: "#3CCB7F",
        fontWeight: "600",
        fontSize: 15,
    },
});
