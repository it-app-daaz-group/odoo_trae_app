import "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      username: string;
      name: string;
      isCustomer: boolean;
      isVendor: boolean;
      companyIds: number[];
    };
  }
}
