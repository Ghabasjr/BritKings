/**
 */

// Agent Details
export interface AgentDetails {
  agentId: string;
  staffName: string;
  email: string;
  active: boolean;
  phoneNumber: string;
  department: string;
  startDate: string;
  propertyContactResponses?: any[];
}

// Customer Question
export interface CustomerQuestion {
  id: string;
  message: string;
  fullName: string;
  email: string;
  phone: string;
  agentDetails: AgentDetails;
}

// Customer for Financial Request
export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

// Property for Financial Request
export interface PropertyInFinancialRequest {
  propertyId: string;
  name: string;
  address: string;
  size: number;
  price: number;
  status: string;
  propertyImageUrl: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  agent: AgentDetails;
}

// Financial Request
export interface FinancialRequest {
  id: string;
  fullName: string;
  phoneNumber: string;
  employmentStatus: string;
  budget: number;
  annualIncome: number;
  customer: Customer;
  property: PropertyInFinancialRequest;
}

// API Response Types
export interface CustomerQuestionsResponse {
  responseCode: string;
  responseMessage: string;
  responseData: CustomerQuestion[];
}

export interface FinancialRequestsResponse {
  responseCode: string;
  responseMessage: string;
  responseData: FinancialRequest[];
}
