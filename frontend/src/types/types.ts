
// Interface for userFormdata
export interface IUser {
    _id?: string;
    username?: string;
    email?: string;
    password?: string;
    profilePic?: string;
    isAdmin?: string;
    del_Address?: IDelAddress;
    subscription?: boolean;
}

// Interface for product cards
export interface IProducts {
  id: number;
  title: string;
  category: string;
  image: string;
  specifications: string;
  price: string;
  quantity: number;
  discount: string;
}

//Interface for Cart
export interface ICart {
    id: string;
    quantity: number;
}

// Interfaces for SellerData
interface BankDetails {
  Bank_Name: string;
  Bank_branch: string;
  Bank_accnt_no: string;
  Bank_code: string;
}

export interface ISeller {
  name?: string;
  email?: string;
  phone?: string;
  userId?: string;
  address?:string;
  banking_details?: BankDetails;
  pdt_details?: string;
}

// Interfaces for PC configuration data
interface IRequests { 
    GPU?: string;
    PSU?: string;
    cpu?: string;
    motherboard?: string;
    ram?: string;
    ram_size?: string;
    storage?: string;
    casing?: string;
    cooling?: string;
    software?: string;
    email?: string;
}

export interface IConfigureData {
    userId?: string;
    requests?: IRequests[];
}

// Interface for Delivery address
export interface IDelAddress { 
    name?: string;
    email?: string;
    country?: string;
    street_address?: string;
    city?: string;
    region?:string;
    post_code?: string;
    phone?: number;
}

// Interface for the handleUpdate of the cart 
export interface ICartRowProps {
  item: ICart;
  product: IProducts;
  onUpdate: (id: string, qty: number) => void;
}