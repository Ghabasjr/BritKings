import { AGENT_AUTH_ENDPOINTS, BASE_URL } from '@/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Fetch all properties for a specific agent
 * @param agentId - The ID of the agent
 * @returns Promise with properties data
 */
export const fetchAgentProperties = async (agentId: string) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const endpoint = AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId);
        const url = `${BASE_URL}${endpoint}`;

        console.log('Fetching agent properties:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.responseCode !== '00') {
            throw new Error(result.responseMessage || 'Failed to fetch properties');
        }

        return result.responseData || [];
    } catch (error: any) {
        console.error('fetchAgentProperties error:', error);
        throw error;
    }
};

/**
 * Fetch agent properties with optional status filter
 * @param agentId - The ID of the agent
 * @param status - Optional status filter (AVAILABLE, SOLD, etc.)
 * @returns Promise with properties data
 */
export const fetchAgentPropertiesWithFilter = async (agentId: string, status?: string) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        let endpoint = AGENT_AUTH_ENDPOINTS.PROPERTIES.replace('{agentId}', agentId);

        // Add status filter if provided
        if (status && status !== 'All') {
            endpoint = `${endpoint}?status=${encodeURIComponent(status)}`;
        }

        const url = `${BASE_URL}${endpoint}`;

        console.log('Fetching agent properties with filter:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.responseCode !== '00') {
            throw new Error(result.responseMessage || 'Failed to fetch properties');
        }

        return result.responseData || [];
    } catch (error: any) {
        console.error('fetchAgentPropertiesWithFilter error:', error);
        throw error;
    }
};

/**
 * Fetch requested properties for an agent
 * @param agentId - The ID of the agent
 * @returns Promise with requested properties data
 */
export const fetchRequestedProperties = async (agentId: string) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const endpoint = AGENT_AUTH_ENDPOINTS.REQUESTED_PROPERTIES.replace('{agentId}', agentId);
        const url = `${BASE_URL}${endpoint}`;

        console.log('Fetching requested properties:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.responseCode !== '00') {
            throw new Error(result.responseMessage || 'Failed to fetch requested properties');
        }

        return result.responseData || [];
    } catch (error: any) {
        console.error('fetchRequestedProperties error:', error);
        throw error;
    }
};

/**
 * Fetch sold properties for an agent
 * @param agentId - The ID of the agent
 * @returns Promise with sold properties data
 */
export const fetchSoldProperties = async (agentId: string) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const endpoint = AGENT_AUTH_ENDPOINTS.SOLD_PROPERTY.replace('{agentId}', agentId);
        const url = `${BASE_URL}${endpoint}`;

        console.log('Fetching sold properties:', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok || result.responseCode !== '00') {
            throw new Error(result.responseMessage || 'Failed to fetch sold properties');
        }

        return result.responseData || [];
    } catch (error: any) {
        console.error('fetchSoldProperties error:', error);
        throw error;
    }
};

/**
 * Update property availability
 * @param agentId - The ID of the agent
 * @param propertyId - The ID of the property
 * @param availability - The new availability status
 * @returns Promise with updated property data
 */
export const updatePropertyAvailability = async (
    agentId: string,
    propertyId: string,
    availability: boolean
) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            throw new Error('Authentication token not found');
        }

        const endpoint = AGENT_AUTH_ENDPOINTS.AVAILABILTY
            .replace('{agentId}', agentId)
            .replace('{propertyId}', propertyId);
        const url = `${BASE_URL}${endpoint}`;

        console.log('Updating property availability:', url);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ available: availability }),
        });

        const result = await response.json();

        if (!response.ok || result.responseCode !== '00') {
            throw new Error(result.responseMessage || 'Failed to update property availability');
        }

        return result.responseData;
    } catch (error: any) {
        console.error('updatePropertyAvailability error:', error);
        throw error;
    }
};

/**
 * Get agent ID from stored user data
 * @returns Promise with agent ID
 */
export const getAgentId = async (): Promise<string> => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');

        if (!userDataString) {
            throw new Error('User data not found');
        }

        const userData = JSON.parse(userDataString);
        const agentId = userData.agentId || userData.userId || userData.id || '';

        if (!agentId) {
            throw new Error('Agent ID not found in user data');
        }

        return agentId;
    } catch (error: any) {
        console.error('getAgentId error:', error);
        throw error;
    }
};

/**
 * Get agent name from stored user data
 * @returns Promise with agent name
 */
export const getAgentName = async (): Promise<string> => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');

        if (!userDataString) {
            throw new Error('User data not found');
        }

        const userData = JSON.parse(userDataString);
        const agentName = userData.fullName || userData.name || userData.firstName || 'Agent';

        return agentName;
    } catch (error: any) {
        console.error('getAgentName error:', error);
        return 'Agent'; // Return default value on error
    }
};

// Type definitions
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
    status: string;
    propertyImageUrl: string;
    available: boolean;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ApiResponse<T> {
    responseCode: string;
    responseMessage: string;
    errors: string[];
    responseData: T;
}
