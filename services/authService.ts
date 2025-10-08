import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

// Types
export interface LoginRequest {
  emailOrPhoneNumber: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  dob: string;
  nationality: string;
  address: string;
  occupation: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface OTPValidateRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: any;
  token?: string;
  user?: any;
}

// API Service
class AuthService {
  private async request(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ): Promise<AuthResponse> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      console.log('API Request:', `${API_BASE_URL}${endpoint}`, method, body);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const data = await response.json();
      console.log('API Response:', response.status, data);

      // Check if response has explicit success field, otherwise use HTTP status
      const isSuccess = data.success !== undefined ? data.success : response.ok;

      return {
        success: isSuccess,
        message: data.message || data.error,
        ...data,
      };
    } catch (error: any) {
      console.error('API Request Error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please try again.',
      };
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request(API_ENDPOINTS.auth.login, 'POST', credentials);
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request(API_ENDPOINTS.auth.register, 'POST', userData);
  }

  async sendOtp(email: string): Promise<AuthResponse> {
    return this.request(`${API_ENDPOINTS.auth.sendOtp}?email=${email}`, 'GET');
  }

  async validateOtp(otpData: OTPValidateRequest): Promise<AuthResponse> {
    return this.request(API_ENDPOINTS.auth.validateOtp, 'POST', otpData);
  }
}

export default new AuthService();
