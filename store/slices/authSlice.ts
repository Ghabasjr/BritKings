import { AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface SignupData {
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

export interface LoginData {
  emailOrPhoneNumber: string;
  password: string;
}

export interface OTPValidation {
  otp: string;
  email?: string;
  phoneNumber?: string;
}

interface AuthState {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  pendingVerificationEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  pendingVerificationEmail: null,
};

// Async Thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (data: SignupData, { rejectWithValue }) => {
    try {
      console.log('Signup request:', `${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`);
      console.log('Signup data:', { ...data, password: '***', confirmPassword: '***' });

      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Signup response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('Signup response:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.msg || `Server error: ${response.status}`;
        console.error('Signup failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('Signup network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Token response in a store", result);

      if (result.responseCode !== "00") {
        return rejectWithValue(result.responseMessage || 'Login failed');
      }

      // Store token in AsyncStorage
      const resultData: any = result.responseData;
      console.log("Token single>>>>>>>>>>>>", resultData.token)
      if (resultData?.token) {
        await AsyncStorage.setItem('authToken', resultData.token);
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (email: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const url = `${BASE_URL}${AUTH_ENDPOINTS.SEND_OTP}?email=${encodeURIComponent(email)}`;
      console.log('SendOTP request:', url);
      console.log('Using token:', token ? 'Token present' : 'No token');

      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      console.log('SendOTP response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('SendOTP response:', result);
      } catch (parseError) {
        console.error('Failed to parse OTP response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.msg || result?.responseMessage || `Failed to send OTP: ${response.status}`;
        console.error('SendOTP failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('SendOTP network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const validateOTP = createAsyncThunk(
  'auth/validateOTP',
  async (data: OTPValidation, { rejectWithValue }) => {
    try {
      console.log('ValidateOTP request:', `${BASE_URL}${AUTH_ENDPOINTS.VALIDATE_OTP}`);
      console.log('ValidateOTP data:', data);

      const response = await fetch(`${BASE_URL}${AUTH_ENDPOINTS.VALIDATE_OTP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('ValidateOTP response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('ValidateOTP response:', result);
      } catch (parseError) {
        console.error('Failed to parse OTP validation response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.msg || result?.responseMessage || `OTP validation failed: ${response.status}`;
        console.error('ValidateOTP failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('ValidateOTP network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('authToken');
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setPendingVerificationEmail: (state, action: PayloadAction<string>) => {
      state.pendingVerificationEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      // Store token if returned from signup
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      // Store email for verification
      if (action.payload.user?.email) {
        state.pendingVerificationEmail = action.payload.user.email;
      }
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      const resultData = action.payload?.responseData;
      state.user = resultData?.user || null;
      state.token = resultData?.token || null;
      state.isAuthenticated = !!resultData?.token;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Send OTP
    builder.addCase(sendOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOTP.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(sendOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Validate OTP
    builder.addCase(validateOTP.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(validateOTP.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(validateOTP.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError, setToken, setPendingVerificationEmail } = authSlice.actions;
export default authSlice.reducer;
