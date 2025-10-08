export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const DEFAULT_BASE_URL = 'https://britkings-realestate-b87276468d3f.herokuapp.com';
export const API_BASE_URL = DEFAULT_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    sendOtp: '/api/v1/auth/send-otp',
    validateOtp: '/api/v1/auth/validate-otp',
  },

  // User
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile/update',
    changePassword: '/user/change-password',
    deleteAccount: '/user/delete',
    uploadDocument: (id: string) => `/api/v1/user/document/upload-document?id=${id}`,
  },

  // Properties
  properties: {
    create: '/api/v1/properties',
    update: (propertyId: string) => `/api/v1/properties/${propertyId}`,
    delete: (propertyId: string) => `/api/v1/properties/${propertyId}`,
    getById: (propertyId: string) => `/api/v1/properties/${propertyId}`,
    search: '/api/v1/properties/search',
  },

  // Payments
  payments: {
    list: '/payments',
    details: (id: string) => `/payments/${id}`,
    create: '/payments/create',
    verify: '/payments/verify',
    history: '/payments/history',
  },

  // Bookings/Reservations
  bookings: {
    list: '/bookings',
    details: (id: string) => `/bookings/${id}`,
    create: '/bookings/create',
    cancel: (id: string) => `/bookings/${id}/cancel`,
    update: (id: string) => `/bookings/${id}/update`,
  },

  // Favorites/Wishlist
  favorites: {
    list: '/favorites',
    add: '/favorites/add',
    remove: (id: string) => `/favorites/${id}/remove`,
  },

  // Reviews
  reviews: {
    list: (propertyId: string) => `/properties/${propertyId}/reviews`,
    create: '/reviews/create',
    update: (id: string) => `/reviews/${id}/update`,
    delete: (id: string) => `/reviews/${id}/delete`,
  },

  // Notifications
  notifications: {
    list: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/read-all',
    delete: (id: string) => `/notifications/${id}/delete`,
  },
} as const;

// Helper function to build full URL
export const buildUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
};
