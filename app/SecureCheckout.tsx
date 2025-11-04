import { PAYSTACK_PUBLIC_KEY } from "@/constants/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState, useEffect } from "react";
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
import { usePaystack } from "react-native-paystack-webview";
import Toast from "react-native-toast-message";
import paymentService from "../services/paymentService";

const SecureCheckoutScreen = () => {
  const params = useLocalSearchParams();
  const rawAmount = (params.amount as string) || "10000";

  console.log('[SecureCheckout] Render - rawAmount:', rawAmount);

  const formattedAmount = useMemo(() => {
    const clean = rawAmount.toString().replace(/,/g, "");
    const num = Number(clean);
    console.log('[SecureCheckout] Formatting - clean:', clean, 'num:', num);
    if (Number.isNaN(num) || num <= 0) return "₦0";
    const formatted = `₦${num.toLocaleString()}`;
    console.log('[SecureCheckout] Formatted amount:', formatted);
    return formatted;
  }, [rawAmount]);

  const [paymentMethod, setPaymentMethod] = useState<"mastercard" | "visa">(
    "mastercard"
  );
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveForLater, setSaveForLater] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const amountInKobo = useMemo(() => {
    try {
      const clean = rawAmount.toString().replace(/,/g, "");
      const naira = Number(clean);
      if (Number.isNaN(naira) || naira <= 0) return 0;
      return Math.round(naira * 100);
    } catch {
      return 0;
    }
  }, [rawAmount]);

  const { popup } = usePaystack();

  // Add logging to debug the amount issue
  useEffect(() => {
    console.log('SecureCheckout - rawAmount:', rawAmount);
    console.log('SecureCheckout - formattedAmount:', formattedAmount);
    console.log('SecureCheckout - amountInKobo:', amountInKobo);
    console.log('SecureCheckout - popup object:', popup);
    console.log('SecureCheckout - popup.checkout exists:', typeof popup?.checkout);
  }, [rawAmount, formattedAmount, amountInKobo, popup]);

  const handlePayment = async () => {
    // Validation
    if (!cardName.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter card name",
      });
      return;
    }

    if (!cardNumber.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter card number",
      });
      return;
    }

    if (!expiryDate.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter expiry date",
      });
      return;
    }

    if (!cvv.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter CVV",
      });
      return;
    }

    if (
      !PAYSTACK_PUBLIC_KEY ||
      PAYSTACK_PUBLIC_KEY.includes("your_public_key_here")
    ) {
      Toast.show({
        type: "error",
        text1: "Paystack not configured",
        text2: "Set EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY",
      });
      return;
    }

    if (amountInKobo <= 0) {
      Toast.show({
        type: "error",
        text1: "Invalid amount",
        text2: "Amount must be greater than 0",
      });
      return;
    }

    setIsLoading(true);
    try {
      const paramEmail = Array.isArray(params.email)
        ? params.email[0]
        : (params.email as string | undefined);
      const paramPropertyId = Array.isArray(params.propertyId)
        ? params.propertyId[0]
        : (params.propertyId as string | undefined);
      let email = paramEmail || "";
      let propertyId = paramPropertyId || "";
      if (!email || !propertyId) {
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (!email) email = userData.email || userData.username || "";
        }
        if (!propertyId && paramPropertyId) propertyId = paramPropertyId;
      }
      if (!email) throw new Error("Missing email for payment.");
      if (!propertyId) throw new Error("Missing property ID for payment.");

      const result = await paymentService.initiatePayment({
        email,
        propertyId,
        amount: amountInKobo / 100,
      });

      console.log('Payment initiation result:', result);

      if (result.responseCode !== "00") {
        throw new Error(
          result.responseMessage || "Could not initiate payment"
        );
      }


      const backendReference = result.responseData?.reference ||
        result.responseData?.transactionReference ||
        result.responseData?.transaction_reference;

      console.log('Backend reference:', backendReference);
      console.log('Full initiate payment response:', JSON.stringify(result, null, 2));

      // Paystack expects amount in Naira (not kobo)
      const amountInNaira = amountInKobo / 100;

      console.log('=== PAYMENT INITIATION ===');
      console.log('Email:', email);
      console.log('Amount in Naira:', amountInNaira);
      console.log('Amount in Kobo:', amountInKobo);
      console.log('Backend Reference:', backendReference);
      console.log('Popup object exists:', !!popup);
      console.log('Popup.checkout exists:', typeof popup?.checkout);

      if (!popup || typeof popup.checkout !== 'function') {
        throw new Error('Paystack popup not initialized properly');
      }

      popup.checkout({
        email,
        amount: amountInNaira,
        reference: backendReference,
        onSuccess: async (res: any) => {
          console.log('✅ Paystack Success Response:', JSON.stringify(res, null, 2));

          try {
            const paystackReference = res?.transactionRef?.reference ||
              res?.reference ||
              res?.data?.reference ||
              res?.trxref;

            console.log('Paystack reference:', paystackReference);
            console.log('Backend reference:', backendReference);

            if (!paystackReference) {
              console.error('Full Paystack response:', res);
              throw new Error("No transaction reference available from Paystack");
            }

            console.log('Verifying payment with Paystack reference:', paystackReference);
            console.log('Including backend reference:', backendReference);

            console.log('Verifying payment using backend reference:', backendReference);

            const verificationResult = await paymentService.verifyPayment(
              backendReference
            );

            console.log('Verification result:', verificationResult);

            if (verificationResult.responseCode === "00") {
              setIsLoading(false);
              Toast.show({
                type: "success",
                text1: "Payment Verified",
                text2: "Your payment has been confirmed"
              });
              setTimeout(() => {
                router.push("/PaymentSuccess");
              }, 200);
            } else {
              throw new Error(verificationResult.responseMessage || "Payment verification failed");
            }
          } catch (error: any) {
            console.error('Payment verification error:', error);
            setIsLoading(false);
            Toast.show({
              type: "error",
              text1: "Verification Error",
              text2: error.message || "Failed to verify payment",
            });
          }
        },
        onCancel: () => {
          console.log('❌ Payment cancelled by user');
          setIsLoading(false);
          Toast.show({ type: "error", text1: "Payment cancelled" });
        },
        onError: (error: any) => {
          console.error('❌ Paystack Error:', error);
          setIsLoading(false);
          Toast.show({
            type: "error",
            text1: "Payment Error",
            text2: error.message || "Payment failed",
          });
        },
        onLoad: () => {
          console.log('📱 Paystack WebView loaded');
        }
      });

      console.log('✅ Paystack checkout method called successfully');
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Payment Error",
        text2: error.message || "Payment initiation failed",
      });
      setIsLoading(false);
      return;
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
            <Ionicons name="chevron-back" size={24} color="#10B981" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Secure Checkout</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Payment Method Toggle */}
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  paymentMethod === "mastercard" && styles.paymentMethodActive,
                ]}
                onPress={() => setPaymentMethod("mastercard")}
              >
                <View style={styles.mastercardIcon}>
                  <View style={[styles.cardCircle, styles.cardCircleRed]} />
                  <View style={[styles.cardCircle, styles.cardCircleYellow]} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.paymentMethodButton,
                  paymentMethod === "visa" && styles.paymentMethodActive,
                ]}
                onPress={() => setPaymentMethod("visa")}
              >
                <Text style={styles.visaText}>Visa</Text>
              </TouchableOpacity>
            </View>

            {/* Card Name */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Card name"
                placeholderTextColor="#BBB"
                value={cardName}
                onChangeText={setCardName}
              />
            </View>

            {/* Card Number */}
            <View style={styles.inputGroup}>
              <View style={styles.cardNumberContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Card number"
                  placeholderTextColor="#BBB"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={16}
                />
                <View style={styles.cardIconInInput}>
                  <View
                    style={[
                      styles.cardCircle,
                      styles.cardCircleRed,
                      styles.smallCircle,
                    ]}
                  />
                  <View
                    style={[
                      styles.cardCircle,
                      styles.cardCircleYellow,
                      styles.smallCircle,
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Expiry Date and CVV */}
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <TextInput
                  style={styles.input}
                  placeholder="Expiry date"
                  placeholderTextColor="#BBB"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  placeholderTextColor="#BBB"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="number-pad"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Save for Later */}
            <TouchableOpacity
              style={styles.saveForLaterContainer}
              onPress={() => setSaveForLater(!saveForLater)}
            >
              <View
                style={[styles.checkbox, saveForLater && styles.checkboxActive]}
              >
                {saveForLater && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.saveForLaterText}>Save for later</Text>
            </TouchableOpacity>

            {/* Total Amount Box */}
            <View style={styles.totalAmountBox}>
              <Text style={styles.totalAmountLabel}>Total Amount</Text>
              <Text style={styles.totalAmountValue}>{formattedAmount}</Text>
            </View>
          </View>
        </ScrollView>

        {/* Pay Now Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.payNowButton,
              isLoading && styles.payNowButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={isLoading}
          >
            <Text style={styles.payNowButtonText}>
              {isLoading ? "Processing..." : "Pay Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 20,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  paymentMethodButton: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  paymentMethodActive: {
    borderColor: "#DD7800",
    backgroundColor: "#FFF8F0",
  },
  mastercardIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  cardCircleRed: {
    backgroundColor: "#EB001B",
  },
  cardCircleYellow: {
    backgroundColor: "#F79E1B",
    marginLeft: -10,
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  visaText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1F71",
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 15,
    color: "#333",
  },
  cardNumberContainer: {
    position: "relative",
  },
  cardIconInInput: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -10 }],
    flexDirection: "row",
    alignItems: "center",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  saveForLaterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#DD7800",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: "#DD7800",
  },
  saveForLaterText: {
    fontSize: 15,
    color: "#999",
  },
  totalAmountBox: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginTop: 20,
  },
  totalAmountLabel: {
    fontSize: 16,
    color: "#999",
    marginBottom: 8,
  },
  totalAmountValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#DD7800",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  payNowButton: {
    backgroundColor: "#DD7800",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#DD7800",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payNowButtonDisabled: {
    opacity: 0.6,
  },
  payNowButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SecureCheckoutScreen;
