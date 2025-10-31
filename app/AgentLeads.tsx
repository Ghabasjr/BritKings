import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';

export default function AgentLeadsPage() {
  const [financialRequests, setFinancialRequests] = useState([]);
  const [customerQuestions, setCustomerQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAgentData();
  }, []);

  const fetchAgentData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userDataString = await AsyncStorage.getItem('userData');
      if (!token || !userDataString) throw new Error('Not authenticated.');
      const userData = JSON.parse(userDataString);
      const agentId = userData.agentId || userData.userId || userData.id || '';
      if (!agentId) throw new Error('Missing agent ID');

      // Fetch financial requests
      const fRes = await fetch(
        `${BASE_URL}${AGENT_AUTH_ENDPOINTS.GET_ALL_FINANCIAL_REQUEST(agentId)}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const fData = await fRes.json();
      if (!fRes.ok || fData.responseCode !== '00') throw new Error(fData?.responseMessage || 'Failed to get financial requests');
      setFinancialRequests(Array.isArray(fData.responseData) ? fData.responseData : []);

      // Fetch customer questions
      const qRes = await fetch(
        `${BASE_URL}${AGENT_AUTH_ENDPOINTS.GET_ALL_CUSTOMER_QUESTIONS(agentId)}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const qData = await qRes.json();
      if (!qRes.ok || qData.responseCode !== '00') throw new Error(qData?.responseMessage || 'Failed to get customer questions');
      setCustomerQuestions(Array.isArray(qData.responseData) ? qData.responseData : []);
      Toast.show({ type: 'success', text1: 'Data loaded.' });
    } catch (e: any) {
      setError(e.message || 'Failed to load data');
      setFinancialRequests([]);
      setCustomerQuestions([]);
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#DD7800" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leads</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchAgentData}>
          <Ionicons name="refresh-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#DD7800" />
            <Text style={styles.loadingText}>Loading data...</Text>
          </View>
        )}
        {error ? (
          <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>
        ) : null}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Requests</Text>
          {financialRequests.length === 0 ? <Text style={styles.emptyText}>No financial requests</Text> : (
            financialRequests.map((req: any, idx: number) => (
              <View key={req.id || idx} style={styles.itemCard}>
                <Text style={styles.itemTitle}>{req.fullName} ({req.phoneNumber})</Text>
                <Text>Employment: {req.employmentStatus}</Text>
                <Text>Budget: {req.budget?.toLocaleString?.()}</Text>
                <Text>Annual Income: {req.annualIncome?.toLocaleString?.()}</Text>
                {req.customer && (<Text>Customer: {req.customer.fullName} - {req.customer.email}</Text>)}
                {req.property && (<Text>Property: {req.property.name} - NGN {req.property.price?.toLocaleString?.()}</Text>)}
              </View>
            ))
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Questions</Text>
          {customerQuestions.length === 0 ? <Text style={styles.emptyText}>No questions yet</Text> : (
            customerQuestions.map((q: any, idx: number) => (
              <View key={q.id || idx} style={styles.itemCard}>
                <Text style={styles.itemTitle}>{q.fullName} ({q.email} | {q.phone})</Text>
                <Text>Message: {q.message}</Text>
                {q.agentDetails && (<Text>Agent: {q.agentDetails.staffName} ({q.agentDetails.department})</Text>)}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 25 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', elevation: 3 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  refreshButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  emptyText: { color: '#888', fontSize: 15, fontStyle: 'italic' },
  itemCard: { backgroundColor: '#fff', borderRadius: 10, marginBottom: 12, padding: 14, borderWidth: 1, borderColor: '#eee' },
  itemTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 3 },
  loadingContainer: { alignItems: 'center', marginVertical: 16 },
  loadingText: { marginTop: 8, color: '#999' },
  errorContainer: { marginVertical: 16 },
  errorText: { color: '#f00', fontWeight: 'bold' },
});
