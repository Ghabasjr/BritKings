// Base URL for API
export const BASE_URL = 'https://britkings-real-estate-backend-81b1cd203051.herokuapp.com';

// API Version
const API_VERSION = '/api/v1';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_VERSION}/auth/login`,
  REGISTER: `${API_VERSION}/auth/register`,
  SEND_OTP: `${API_VERSION}/auth/send-otp`,
  VALIDATE_OTP: `${API_VERSION}/auth/validate-otp`,
  FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,


};

// Customer controller 
export const CSTOMER_AUTH_ENDPOINTS = {
  CONTACT_AGENT: `${API_VERSION}/client/contact-agent`,
  PURCHASED_PROPERTIES: `${API_VERSION}/client/purchased-properties`,
  PROPERTIES: `${API_VERSION}/client/properties`,
  CONTACTED_PROPERTY: `${API_VERSION}/client/contacted-properties`,
  PROPERTY: `${API_VERSION}/client/properties/{propertyId}`,
};

// Agent controller 
export const AGENT_AUTH_ENDPOINTS = {
  AVAILABILTY: `${API_VERSION}/agent/{agentId}/properties/{propertyId}/availability`,
  SOLD_PROPERTY: `${API_VERSION}/agent/{agentId}/sold-properties`,
  REQUESTED_PROPERTIES: `${API_VERSION}/agent/{agentId}/requested-properties`,
  PROPERTIES: `${API_VERSION}/agent/{agentId}/properties`,
  // New Endpoints
  GET_ALL_FINANCIAL_REQUEST: (agentId: string) => `${API_VERSION}/agent/${agentId}/get-all-financial-request`,
  GET_ALL_CUSTOMER_QUESTIONS: (agentId: string) => `${API_VERSION}/agent/${agentId}/get-all-customer-questions`,
};

// Payment endpoints
export const PAYMENT_ENDPOINTS = {
  INITIATE_PAYMENT: `${API_VERSION}/payment/initiate-payment`,
};


// Properties Endpoints
export const PROPERTIES_ENDPOINTS = {
  UPDATE: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  GET_BY_ID: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  SEARCH: `${API_VERSION}/properties`,
};

// Client endpoints (for property buyers/customers)
export const CLIENT_ENDPOINTS = {
  REQUEST_FINANCIAL_INFO: `${API_VERSION}/client/financial-request`,
  ASK_QUESTION: `${API_VERSION}/client/askQuestion`,
  CONTACT_AGENT: `${API_VERSION}/client/contact-agent`,
};

// Helper function to build full URLs
export const buildUrl = (endpoint: string): string => {
  return `${BASE_URL}${endpoint}`;
};

// Paystack Public Key
export const PAYSTACK_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';

