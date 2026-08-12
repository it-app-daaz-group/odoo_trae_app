export interface SessionData {
  id: number;
  username: string;
  name: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isVendor: boolean;
  companyIds: number[];
}
