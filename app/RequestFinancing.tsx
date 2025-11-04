import { fetchWithAuth } from "@/utils/authGuard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { BASE_URL, CLIENT_ENDPOINTS } from "../constants/api";

const RequestFinancingScreen = () => {
  const params = useLocalSearchParams();
  const propertyId = params.propertyId as string;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [financingAmount] = useState("10000");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!fullName.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your full name",
      });
      return;
    }
    if (!phone.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your phone number",
      });
      return;
    }
    // Financing amount is now fixed at 10,000 naira (service fee)
    // Validation removed as it's set by default
    if (!employmentStatus.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your employment status",
      });
      return;
    }
    if (!annualIncome.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your annual income",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Retrieve customerId
      let customerId = "";
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          customerId =
            userData.customerId || userData.userId || userData.id || "";
        } catch { }
      }

      if (!customerId)
        throw new Error("Missing customer ID. Please log in again.");

      const body = {
        fullName,
        phoneNumber: phone,
        employmentStatus,
        propertyId,
        budget: Number(financingAmount.replace(/,/g, "")),
        annualIncome: Number(annualIncome.replace(/,/g, "")),
        customerId,
      };

      console.log(" Sending body:", body);
      const res = await fetchWithAuth(
        `${BASE_URL}${CLIENT_ENDPOINTS.REQUEST_FINANCIAL_INFO}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      let result: any = {};
      console.log(" Status:", res.status);
      const text = await res.text();
      try {
        result = text ? JSON.parse(text) : {};
      } catch (e) {
        // Non-JSON or empty body
        result = {};
      }
      console.log(" Parsed result:", result);

      console.log(" Response:", result);

      if (!res.ok || result.responseCode !== "00") {
        const backendMessage =
          result?.responseMessage ||
          (Array.isArray(result?.errors)
            ? result.errors.join(", ")
            : "Unknown error") ||
          "Failed to submit request. Please try again.";
        throw new Error(backendMessage);
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          result.responseMessage ||
          "Your financing request has been submitted.",
      });

      const amountParam = financingAmount || String(body.budget);
      setTimeout(() => {
        router.push({
          pathname: "/SecureCheckout",
          params: {
            amount: amountParam,
            propertyId: propertyId,
          },
        });
      }, 800);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to submit request",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#DD7800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Request Financing Info</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="Please enter your name"
                placeholderTextColor="#BBB"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your contact"
                placeholderTextColor="#BBB"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Service Fee Notice */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Fee</Text>
              <View style={styles.serviceFeeContainer}>
                <View style={styles.serviceFeeContent}>
                  <Ionicons name="information-circle" size={24} color="#DD7800" />
                  <View style={styles.serviceFeeTextContainer}>
                    <Text style={styles.serviceFeeAmount}>₦10,000</Text>
                    <Text style={styles.serviceFeeDescription}>
                      One-time service fee for processing your financing request
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Employment Status */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Employment Status</Text>
              <TextInput
                style={styles.input}
                placeholder="Civil servant"
                placeholderTextColor="#BBB"
                value={employmentStatus}
                onChangeText={setEmploymentStatus}
              />
            </View>

            {/* Annual Income */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Annual Income</Text>
              <TextInput
                style={styles.input}
                placeholder="₦400,000"
                placeholderTextColor="#BBB"
                value={annualIncome}
                onChangeText={setAnnualIncome}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.proceedButton,
              isLoading && styles.proceedButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.proceedButtonText}>
              {isLoading ? "Processing..." : "Proceed"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 30 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
  headerSpacer: { width: 32 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  content: { padding: 20 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: "600", color: "#000", marginBottom: 12 },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 15,
    color: "#333",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  proceedButton: {
    backgroundColor: "#DD7800",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#DD7800",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  proceedButtonDisabled: { opacity: 0.6 },
  proceedButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  serviceFeeContainer: {
    backgroundColor: "#FFF5E6",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFE4B8",
  },
  serviceFeeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceFeeTextContainer: {
    flex: 1,
  },
  serviceFeeAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#DD7800",
    marginBottom: 4,
  },
  serviceFeeDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default RequestFinancingScreen;
