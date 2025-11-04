import GradientButton from "@/components/GradientButton/GradientButton";
import {
  AGENT_AUTH_ENDPOINTS,
  BASE_URL,
  CSTOMER_AUTH_ENDPOINTS,
} from "@/constants/api";
import { useAppSelector } from "@/store/hooks";
import { checkAuth, fetchWithAuth } from "@/utils/authGuard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import Toast from "react-native-toast-message";
import { WebView } from "react-native-webview";

interface PropertyData {
  propertyId: string;
  name: string;
  address: string;
  description: string;
  size: number;
  price: number;
  status: string;
  propertyImageUrl: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  userId?: string;
  latitude?: number;
  longitude?: number;
}

export default function PropertyDetailsScreen() {
  const params = useLocalSearchParams();
  const propertyId = params.propertyId as string;

  const [userRole, setUserRole] = useState<"Agent" | "Client">("Client");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapCoords, setMapCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const reduxUserRole = useAppSelector((state) => state.auth.userRole);
  const [agentData, setAgentData] = useState<any>(null);
  const defaultRegion = {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  // Check auth and load data on mount
  useEffect(() => {
    const initializeScreen = async () => {
      // Check authentication
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        return; // Auth guard will redirect to login
      }

      // Load user role
      await loadUserRole();

      // Fetch property data
      await fetchPropertyDetails();
    };

    initializeScreen();
  }, [propertyId]);

  const loadUserRole = async () => {
    try {
      // First check Redux store
      if (reduxUserRole) {
        setUserRole(reduxUserRole);
        return;
      }

      // Fallback to AsyncStorage
      const storedRole = await AsyncStorage.getItem("userRole");
      if (storedRole === "Agent") {
        setUserRole("Agent");
      } else {
        setUserRole("Client");
      }
    } catch (error) {
      console.error("Error loading user role:", error);
      setUserRole("Client");
    }
  };

  const fetchPropertyDetails = async () => {
    if (!propertyId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Property ID is required",
      });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Build endpoint URL - replace {propertyId} placeholder
      const endpoint = CSTOMER_AUTH_ENDPOINTS.PROPERTY.replace(
        "{propertyId}",
        propertyId
      );
      const url = `${BASE_URL}${endpoint}`;

      console.log("Fetching property details from:", url);

      // Use fetchWithAuth which handles token expiration automatically
      const response = await fetchWithAuth(url, {
        method: "GET",
      });

      console.log("Property details response status:", response.status);

      let result;
      try {
        result = await response.json();
        console.log("Property details response:", result);
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error("Invalid server response");
      }

      if (!response.ok || result.responseCode !== "00") {
        const errorMessage =
          result?.responseMessage ||
          result?.message ||
          "Failed to fetch property details";
        throw new Error(errorMessage);
      }

      // Set property data from responseData
      const propertyData = result.responseData;
      setAgentData(propertyData?.agent);
      console.log("Property Data:", propertyData);
      console.log("Property userId:", propertyData?.userId);
      setProperty(propertyData);
      if (
        typeof propertyData?.latitude === "number" &&
        typeof propertyData?.longitude === "number"
      ) {
        setMapCoords({
          latitude: propertyData.latitude,
          longitude: propertyData.longitude,
        });
      } else {
        setMapCoords(null);
      }
    } catch (error: any) {
      console.error("Fetch property details error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to load property details",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: geocode address with Nominatim if API lacks coordinates
  useEffect(() => {
    const geocodeIfNeeded = async () => {
      if (!property || mapCoords || !property.address) return;
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          property.address
        )}`;
        const res = await fetch(url, {
          headers: {
            "Accept-Language": "en",
          },
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const first = data[0];
          const lat = parseFloat(first.lat);
          const lon = parseFloat(first.lon);
          if (Number.isFinite(lat) && Number.isFinite(lon)) {
            setMapCoords({ latitude: lat, longitude: lon });
          }
        }
      } catch (e) {
        console.warn("Geocoding failed", e);
      }
    };
    geocodeIfNeeded();
  }, [property, mapCoords]);

  const handleUpdateStatus = () => {
    setShowUpdateModal(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const userDataString = await AsyncStorage.getItem("userData");

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      let agentId = "";
      if (userDataString) {
        try {
          const userData = JSON.parse(userDataString);
          agentId = userData.agentId || userData.userId || userData.id || "";
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }

      if (!agentId) {
        throw new Error("Agent ID not found. Please login again.");
      }

      // Build the endpoint URL - replace {agentId} and {propertyId}
      const endpoint = AGENT_AUTH_ENDPOINTS.AVAILABILTY.replace(
        "{agentId}",
        agentId
      ).replace("{propertyId}", propertyId);

      const availableValue = !property?.available;
      const url = `${BASE_URL}${endpoint}?available=${availableValue}`;

      console.log("Updating property availability:", url);

      // Make PUT request to update availability
      const response = await fetchWithAuth(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Update availability response status:", response.status);

      let result;
      try {
        result = await response.json();
        console.log("Update availability response:", result);
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error("Invalid server response");
      }

      if (!response.ok || result.responseCode !== "00") {
        const errorMessage =
          result?.responseMessage ||
          result?.message ||
          "Failed to update property availability";
        throw new Error(errorMessage);
      }

      // Success - close modal and show success message
      setShowUpdateModal(false);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Property availability updated successfully",
      });

      // Refresh property details to show updated status
      await fetchPropertyDetails();
    } catch (error: any) {
      console.error("Update availability error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to update property availability",
      });
    }
  };

  const handleCancelUpdate = () => {
    setShowUpdateModal(false);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#DD7800" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#DD7800" />
            <Text style={styles.loadingText}>Loading property details...</Text>
          </View>
        ) : property ? (
          <>
            {/* Map View (OpenStreetMap) */}
            <View style={styles.mapContainer}>
              {Platform.OS === "android" || Platform.OS === "web" ? (
                <WebView
                  style={{ flex: 1 }}
                  source={{
                    uri: (() => {
                      const lat = (mapCoords?.latitude ??
                        defaultRegion.latitude) as number;
                      const lon = (mapCoords?.longitude ??
                        defaultRegion.longitude) as number;
                      const delta = mapCoords ? 0.005 : 0.05;
                      const left = lon - delta;
                      const right = lon + delta;
                      const top = lat + delta;
                      const bottom = lat - delta;
                      const bbox = `${left},${bottom},${right},${top}`;
                      const base = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
                        bbox
                      )}&layer=mapnik`;
                      return mapCoords
                        ? `${base}&marker=${encodeURIComponent(
                          lat
                        )},${encodeURIComponent(lon)}`
                        : base;
                    })(),
                  }}
                />
              ) : (
                <MapView
                  provider={PROVIDER_DEFAULT}
                  style={{ flex: 1 }}
                  mapType="none"
                  initialRegion={
                    mapCoords
                      ? {
                        latitude: mapCoords.latitude,
                        longitude: mapCoords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }
                      : defaultRegion
                  }
                  scrollEnabled
                  zoomControlEnabled
                  zoomEnabled
                >
                  <UrlTile
                    urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    flipY={false}
                    tileSize={256}
                  />
                  {mapCoords && (
                    <Marker
                      coordinate={{
                        latitude: mapCoords.latitude,
                        longitude: mapCoords.longitude,
                      }}
                      title={property.name || "Property Location"}
                      description={property.address}
                    />
                  )}
                </MapView>
              )}
              {/* Price Tag on Map */}
              <View style={styles.priceTag}>
                <Text style={styles.priceTagText}>
                  ₦{property.price?.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Property Info Grid */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoValue}>
                  {property.size?.toLocaleString()}x
                  {property.size?.toLocaleString()} ft
                </Text>
                <Text style={styles.infoLabel}>Size: {property.size}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoValue}>
                  {property.address.split(",")[0] || "Lagos, Nigeria"}
                </Text>
                <Text style={styles.infoLabel}>Location</Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoValue}>Land Property</Text>
                <Text style={styles.infoLabel}>Property type</Text>
              </View>
            </View>

            {/* Land Pictures Section */}
            <View style={styles.landPicturesSection}>
              <Text style={styles.landPicturesTitle}>Land Pictures</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.picturesScroll}
              >
                <Image
                  source={{
                    uri:
                      property.propertyImageUrl ||
                      "https://placehold.co/200x150/e0e0e0/555?text=Land",
                  }}
                  style={styles.landPicture}
                />
                <Image
                  source={{
                    uri:
                      property.propertyImageUrl ||
                      "https://placehold.co/200x150/e0e0e0/555?text=Land",
                  }}
                  style={styles.landPicture}
                />
                <Image
                  source={{
                    uri:
                      property.propertyImageUrl ||
                      "https://placehold.co/200x150/e0e0e0/555?text=Land",
                  }}
                  style={styles.landPicture}
                />
              </ScrollView>
            </View>

            {/* Conditional Button based on User Role */}
            {userRole === "Client" ? (
              <GradientButton
                title={"Contact Partner"}
                onPress={() => setShowContactModal(true)}
              />
            ) : (
              <GradientButton
                title={"Update Status"}
                onPress={handleUpdateStatus}
              />
            )}

            <View style={{ height: 30 }} />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="home-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Property not found</Text>
          </View>
        )}
      </ScrollView>

      {/* Update Status Modal - Outside the ScrollView but inside SafeAreaView */}
      <Modal
        visible={showUpdateModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelUpdate}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.content}>
            <Text style={modalStyles.title}>
              Are you sure you want to give access to this buyer to make payment
            </Text>

            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.noButton}
                onPress={handleCancelUpdate}
              >
                <Text style={modalStyles.noButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={modalStyles.yesButton}
                onPress={handleConfirmUpdate}
              >
                <Text style={modalStyles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Contact Agent Modal */}
      <Modal
        visible={showContactModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={contactModalStyles.overlay}>
          <View style={contactModalStyles.bottomSheet}>
            <View style={contactModalStyles.handle} />

            <Text style={contactModalStyles.title}>Contact Partner</Text>

            <TouchableOpacity
              style={contactModalStyles.actionButton}
              onPress={() => {
                setShowContactModal(false);
                router.push({
                  pathname: "/RequestFinancing",
                  params: { propertyId: propertyId },
                });
              }}
            >
              <Ionicons name="card-outline" size={20} color="#fff" />
              <Text style={contactModalStyles.actionButtonText}>
                Request Financing Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={contactModalStyles.actionButton}
              onPress={() => {
                setShowContactModal(false);
                router.push({
                  pathname: "/ScheduleVisit",
                  params: { propertyId: propertyId },
                });
              }}
            >
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              <Text style={contactModalStyles.actionButtonText}>
                Schedule a Visit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={contactModalStyles.actionButton}
              onPress={() => {
                setShowContactModal(false);
                router.push({
                  pathname: "/AskQuestion",
                  params: { propertyId: propertyId },
                });
              }}
            >
              <Ionicons name="help-circle-outline" size={20} color="#fff" />
              <Text style={contactModalStyles.actionButtonText}>
                Ask a Question
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={contactModalStyles.cancelButton}
              onPress={() => setShowContactModal(false)}
            >
              <Text style={contactModalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    backgroundColor: "#E8E8E8",
    marginBottom: 20,
  },
  mapPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  priceTag: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DD7800",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceTagText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  infoGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#999",
  },
  landPicturesSection: {
    paddingLeft: 20,
    marginTop: 24,
    marginBottom: 20,
  },
  landPicturesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  picturesScroll: {
    flexDirection: "row",
  },
  landPicture: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#E8E8E8",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  noButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#DD7800",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  noButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#DD7800",
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#DD7800",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  yesButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
});

const contactModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#DD7800",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});
