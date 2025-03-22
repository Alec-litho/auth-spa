export interface DataItem {
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  }
  
  export interface AuthState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface DataState {
    items: DataItem[];
    isLoading: boolean;
    error: string | null;
    isSaving: boolean;
  }