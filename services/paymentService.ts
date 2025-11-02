import { BASE_URL, PAYMENT_ENDPOINTS } from '@/constants/api';
import { fetchWithAuth } from '@/utils/authGuard';
import {
  InitiatePaymentRequest,
  PaymentResponse,
  VerifyPaymentRequest,
  TransactionListResponse,
  Transaction
} from '@/types/payment';

// Payment Service Class
class PaymentService {
  /**
   * Initiate a payment transaction
   * @param data - Payment initiation data (email, propertyId, amount)
   * @returns Payment response with transaction details
   */
  async initiatePayment(data: InitiatePaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}${PAYMENT_ENDPOINTS.INITIATE_PAYMENT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const rawText = await response.text();
      let result: PaymentResponse;

      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch (e) {
        throw new Error('Invalid response from payment server');
      }

      if (!response.ok) {
        throw new Error(
          result?.responseMessage || `Payment initiation failed (${response.status})`
        );
      }

      return result;
    } catch (error: any) {
      console.error('Payment Initiation Error:', error);
      throw new Error(error.message || 'Failed to initiate payment');
    }
  }

  /**
   * Verify a payment transaction
   * @param transactionReference - The transaction reference from Paystack
   * @param backendReference - Optional backend reference from initiate payment
   * @returns Payment verification response
   */
  async verifyPayment(transactionReference: string, backendReference?: string): Promise<PaymentResponse> {
    try {
      // Build URL with both references if available
      let url = `${BASE_URL}${PAYMENT_ENDPOINTS.VERIFY_PAYMENT}?transactionReference=${encodeURIComponent(transactionReference)}`;

      // If we have a backend reference, include it
      if (backendReference) {
        url += `&backendReference=${encodeURIComponent(backendReference)}`;
      }

      console.log('Verify payment URL:', url);

      const response = await fetchWithAuth(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const rawText = await response.text();
      let result: PaymentResponse;

      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch (e) {
        throw new Error('Invalid response from verification server');
      }

      if (!response.ok) {
        throw new Error(
          result?.responseMessage || `Payment verification failed (${response.status})`
        );
      }

      return result;
    } catch (error: any) {
      console.error('Payment Verification Error:', error);
      throw new Error(error.message || 'Failed to verify payment');
    }
  }

  /**
   * Get all transactions for the current user
   * @returns List of user transactions
   */
  async getUserTransactions(): Promise<TransactionListResponse> {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}${PAYMENT_ENDPOINTS.GET_USER_TRANSACTIONS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const rawText = await response.text();
      let result: TransactionListResponse;

      try {
        result = rawText ? JSON.parse(rawText) : { responseCode: '99', responseMessage: 'Invalid response', responseData: [] };
      } catch (e) {
        throw new Error('Invalid response from transaction server');
      }

      if (!response.ok) {
        throw new Error(
          result?.responseMessage || `Failed to fetch transactions (${response.status})`
        );
      }

      return result;
    } catch (error: any) {
      console.error('Get Transactions Error:', error);
      throw new Error(error.message || 'Failed to fetch transactions');
    }
  }

  /**
   * Get a specific transaction by ID
   * @param transactionId - The transaction ID
   * @returns Transaction details
   */
  async getTransactionById(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetchWithAuth(
        `${BASE_URL}${PAYMENT_ENDPOINTS.GET_TRANSACTION_BY_ID(transactionId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const rawText = await response.text();
      let result: PaymentResponse;

      try {
        result = rawText ? JSON.parse(rawText) : {};
      } catch (e) {
        throw new Error('Invalid response from transaction server');
      }

      if (!response.ok) {
        throw new Error(
          result?.responseMessage || `Failed to fetch transaction (${response.status})`
        );
      }

      return result;
    } catch (error: any) {
      console.error('Get Transaction Error:', error);
      throw new Error(error.message || 'Failed to fetch transaction');
    }
  }
}

export default new PaymentService();
