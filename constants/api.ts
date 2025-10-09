// Base URL for API
export const BASE_URL = 'https://britkings-realestate-b87276468d3f.herokuapp.com';

// API Version
const API_VERSION = '/api/v1';

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_VERSION}/auth/login`,
  REGISTER: `${API_VERSION}/auth/register`,
  SEND_OTP: `${API_VERSION}/auth/send-otp`,
  VALIDATE_OTP: `${API_VERSION}/auth/validate-otp`,
};

// Properties Endpoints
export const PROPERTIES_ENDPOINTS = {
  CREATE: `${API_VERSION}/properties`,
  UPDATE: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  DELETE: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  GET_BY_ID: (propertyId: string) => `${API_VERSION}/properties/${propertyId}`,
  SEARCH: `${API_VERSION}/properties`,
};

// Helper function to build full URLs
export const buildUrl = (endpoint: string): string => {
  return `${BASE_URL}${endpoint}`;
};

