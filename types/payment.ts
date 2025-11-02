/**
 * Payment Types
 * Defines all TypeScript interfaces for payment operations
 */

export interface InitiatePaymentRequest {
  email: string;
  propertyId: string;
  amount: number;
}

export interface PaymentResponse {
  responseCode: string;
  responseMessage: string;
  errors?: string[];
  responseData?: {
    [key: string]: any;
  };
}

export interface VerifyPaymentRequest {
  transactionReference: string;
}

export interface PaystackResponse {
  transactionRef?: {
    reference: string;
  };
  reference?: string;
  status?: string;
  message?: string;
}

// Transaction Receipt Types
export interface Transaction {
  id: string;
  transactionReference: string;
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  paymentMethod?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  property?: {
    propertyId: string;
    name: string;
    address: string;
    price: number;
    propertyImageUrl?: string;
  };
  customer?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface TransactionListResponse {
  responseCode: string;
  responseMessage: string;
  responseData: Transaction[];
}
