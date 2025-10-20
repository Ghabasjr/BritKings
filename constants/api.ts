// Base URL for API
export const BASE_URL = 'https://britkings-backend-dbb2700a6f0d.herokuapp.com';

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
};


// Properties Endpoints
export const PROPERTIES_ENDPOINTS = {
  UPDATE: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  GET_BY_ID: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  SEARCH: `${API_VERSION}/properties`,
};

// Helper function to build full URLs
export const buildUrl = (endpoint: string): string => {
  return `${BASE_URL}${endpoint}`;
};

