import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

// Types
export interface CreatePropertyRequest {
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
  propertyImageUrl: string;
}

export interface UpdatePropertyRequest extends CreatePropertyRequest {
  id: string;
}

export interface PropertyResponse {
  success: boolean;
  message?: string;
  data?: any;
  property?: any;
  properties?: any[];
}

export interface UploadDocumentResponse {
  success: boolean;
  message?: string;
  url?: string;
  data?: {
    url: string;
  };
}

// API Service
class PropertyService {
  private async request(
    endpoint: string,
    method: string = 'GET',
    body?: any,
    token?: string
  ): Promise<PropertyResponse> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      console.log('Property API Request:', `${API_BASE_URL}${endpoint}`, method, body);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

      // Check if response has content before parsing
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      console.log('Property API Response:', response.status, data);

      const isSuccess = data.success !== undefined ? data.success : response.ok;

      return {
        success: isSuccess,
        message: data.message || data.error,
        ...data,
      };
    } catch (error: any) {
      console.error('Property API Request Error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please try again.',
      };
    }
  }

  async createProperty(propertyData: CreatePropertyRequest, token?: string): Promise<PropertyResponse> {
    return this.request(API_ENDPOINTS.properties.create, 'POST', propertyData, token);
  }

  async updateProperty(propertyId: string, propertyData: CreatePropertyRequest, token?: string): Promise<PropertyResponse> {
    return this.request(API_ENDPOINTS.properties.update(propertyId), 'PUT', propertyData, token);
  }

  async deleteProperty(propertyId: string, token?: string): Promise<PropertyResponse> {
    return this.request(API_ENDPOINTS.properties.delete(propertyId), 'DELETE', undefined, token);
  }

  async getPropertyById(propertyId: string): Promise<PropertyResponse> {
    return this.request(API_ENDPOINTS.properties.getById(propertyId), 'GET');
  }

  async searchProperties(params?: any): Promise<PropertyResponse> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`${API_ENDPOINTS.properties.search}${queryString}`, 'GET');
  }

  async getAllProperties(token?: string): Promise<PropertyResponse> {
    return this.request(API_ENDPOINTS.properties.search, 'GET', undefined, token);
  }

  async uploadDocument(userId: string, file: any, token: string): Promise<UploadDocumentResponse> {
    try {
      const formData = new FormData();

      // Extract filename and create proper file object
      const uriParts = file.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('file', {
        uri: file,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      } as any);

      const endpoint = API_ENDPOINTS.user.uploadDocument(userId);
      console.log('Upload Document Request:', `https://globalroot-gateway-service-816009aa3954.herokuapp.com${endpoint}`);

      const response = await fetch(`https://globalroot-gateway-service-816009aa3954.herokuapp.com${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      console.log('Upload Document Response:', response.status, data);

      return {
        success: response.ok,
        message: data.message,
        url: data.url || data.data?.url,
        data: data.data,
      };
    } catch (error: any) {
      console.error('Upload Document Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to upload image',
      };
    }
  }
}

export default new PropertyService();
