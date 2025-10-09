import { BASE_URL, PROPERTIES_ENDPOINTS } from '@/constants/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Types
export interface Property {
  propertyId: string;
  name: string;
  address: string;
  description: string;
  size: number;
  bedrooms: string;
  parking: string;
  bathroom: string;
  pools: string;
  price: number;
  status: 'AVAILABLE' | 'SOLD' | 'RENTED';
  propertyImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Pagination {
  page: number;
  totalPages: number;
  totalElements: number;
}

interface PropertiesState {
  properties: Property[];
  currentProperty: Property | null;
  isLoading: boolean;
  error: string | null;
  pagination: Pagination;
}
const initialState: PropertiesState = {
  properties: [],
  currentProperty: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalElements: 0,
  },
};
export interface CreatePropertyData {
  name: string;
  address: string;
  description: string;
  size: number;
  bedrooms: string;
  parking: string;
  bathroom: string;
  pools: string;
  price: number;
  status: 'AVAILABLE' | 'SOLD';
  propertyImageUrl?: string;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  id: string;
}

export interface SearchPropertiesParams {
  name?: string;
  price?: number;
  size?: string;
  status?: 'AVAILABLE' | 'SOLD';
  page?: number;
  limit?: number;
}


// Helper function to get auth token
const getAuthToken = async () => {
  // You might need to get this from AsyncStorage or Redux state
  // For now, we'll assume it's passed or available in the state
  return null;
};

// Async Thunks
export const createProperty = createAsyncThunk(
  'properties',
  async (data: CreatePropertyData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      console.log("Token from store>>>>>>>>>>>>>>>", token);

      console.log('CreateProperty request:', `${BASE_URL}${PROPERTIES_ENDPOINTS.CREATE}`);
      console.log('CreateProperty data:', data);

      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${BASE_URL}${PROPERTIES_ENDPOINTS.CREATE}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      console.log('CreateProperty response status:', response.status);
      console.log('Token used:', token ? 'Yes' : 'No');

      // Handle 403 - Forbidden/Authentication required
      if (response.status === 403) {
        return rejectWithValue('Authentication required. Please log in to create properties.');
      }

      let result;
      try {
        const text = await response.text();
        console.log('CreateProperty raw response:', text);

        if (!text) {
          if (response.status === 403) {
            return rejectWithValue('Authentication required. Please log in to create properties.');
          }
          return rejectWithValue(`Server error: ${response.status}`);
        }

        result = JSON.parse(text);
        console.log('CreateProperty response:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        if (response.status === 403) {
          return rejectWithValue('Authentication required. Please log in to create properties.');
        }
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.responseMessage || `Failed to create property: ${response.status}`;
        console.error('CreateProperty failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('CreateProperty network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const updateProperty = createAsyncThunk(
  'properties/update',
  async (data: UpdatePropertyData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const { id, ...updateData } = data;
      const url = `${BASE_URL}${PROPERTIES_ENDPOINTS.UPDATE(id)}`;

      console.log('UpdateProperty request:', url);
      console.log('UpdateProperty data:', updateData);

      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updateData),
      });

      console.log('UpdateProperty response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('UpdateProperty response:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.responseMessage || `Failed to update property: ${response.status}`;
        console.error('UpdateProperty failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('UpdateProperty network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/delete',
  async (propertyId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const url = `${BASE_URL}${PROPERTIES_ENDPOINTS.DELETE(propertyId)}`;

      console.log('DeleteProperty request:', url);

      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      console.log('DeleteProperty response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('DeleteProperty response:', result);
      } catch (parseError) {
        // DELETE might return empty response
        if (response.ok) {
          return { id: propertyId };
        }
        console.error('Failed to parse response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.responseMessage || `Failed to delete property: ${response.status}`;
        console.error('DeleteProperty failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return { ...result, id: propertyId };
    } catch (error: any) {
      console.error('DeleteProperty network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const getPropertyById = createAsyncThunk(
  'properties/getById',
  async (propertyId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const url = `${BASE_URL}${PROPERTIES_ENDPOINTS.GET_BY_ID(propertyId)}`;

      console.log('GetPropertyById request:', url);

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

      console.log('GetPropertyById response status:', response.status);

      let result;
      try {
        result = await response.json();
        console.log('GetPropertyById response:', result);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        return rejectWithValue('Invalid server response');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || result?.responseMessage || `Failed to get property: ${response.status}`;
        console.error('GetPropertyById failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      return result;
    } catch (error: any) {
      console.error('GetPropertyById network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);

export const searchProperties = createAsyncThunk(
  'properties/search',
  async (params: SearchPropertiesParams = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      // Safely build query string
      const queryParams = new URLSearchParams();

      if (params.name?.trim()) queryParams.append('name', params.name.trim());
      if (params.price) queryParams.append('price', params.price.toString());
      if (params.size) queryParams.append('size', params.size.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const url = `${BASE_URL}${PROPERTIES_ENDPOINTS.SEARCH}${queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`;

      console.log('🔍 SearchProperties → URL:', url);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(url, { method: 'GET', headers });
      const textResponse = await response.text();

      let result;
      try {
        result = JSON.parse(textResponse);
        console.log('📦 Raw API Response:', result);
      } catch {
        console.error('❌ Invalid JSON response:', textResponse);
        return rejectWithValue('Server returned invalid JSON');
      }

      if (!response.ok || result?.responseCode !== '00') {
        const errorMessage =
          result?.message ||
          result?.error ||
          result?.responseMessage ||
          `Failed to search properties: ${response.status}`;
        console.error('SearchProperties failed:', errorMessage);
        return rejectWithValue(errorMessage);
      }

      // ✅ Extract and normalize data
      const content = result?.responseData?.content ?? [];
      const pagination = {
        page: result?.responseData?.page ?? 1,
        totalPages: result?.responseData?.totalPages ?? 1,
        totalElements: result?.responseData?.totalElements ?? content.length,
      };

      console.log('✅ Extracted properties:', content.length);

      // Return normalized structure to reducer
      return {
        properties: content,
        pagination,
        responseMessage: result?.responseMessage,
      };
    } catch (error: any) {
      console.error('🌐 SearchProperties network error:', error);
      return rejectWithValue(error.message || 'Network error - please check your connection');
    }
  }
);



// Properties Slice
const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },
  },
  extraReducers: (builder) => {
    // Create Property
    builder.addCase(createProperty.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.isLoading = false;
      // Add to properties list if the response includes the property
      if (action.payload.property || action.payload.data) {
        const newProperty = action.payload.property || action.payload.data;
        state.properties.unshift(newProperty);
      }
    });
    builder.addCase(createProperty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update Property
    builder.addCase(updateProperty.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProperty = action.payload.property || action.payload.data;
      if (updatedProperty) {
        const index = state.properties.findIndex(p => p.propertyId === updatedProperty.id);
        if (index !== -1) {
          state.properties[index] = updatedProperty;
        }
        if (state.currentProperty?.propertyId === updatedProperty.id) {
          state.currentProperty = updatedProperty;
        }
      }
    });
    builder.addCase(updateProperty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete Property
    builder.addCase(deleteProperty.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.isLoading = false;
      const propertyId = action.payload.id;
      state.properties = state.properties.filter(p => p.propertyId !== propertyId);
      if (state.currentProperty?.propertyId === propertyId) {
        state.currentProperty = null;
      }
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Get Property By ID
    builder.addCase(getPropertyById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getPropertyById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProperty = action.payload.property || action.payload.data || action.payload;
    });
    builder.addCase(getPropertyById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Search Properties
    builder.addCase(searchProperties.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(searchProperties.fulfilled, (state, action) => {
      state.isLoading = false;
      state.properties = action.payload.properties;
      state.pagination = action.payload.pagination;
    });

    builder.addCase(searchProperties.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearCurrentProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
