export interface Address {
    id?: number;
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    region: RegionAtPost;
    postcode: string;
    country_code: string;
    telephone: string;
    company: string;
    vat_id: string;
    default_shipping: boolean;
    default_billing: boolean;
}

export interface AddressCardProps {
    address: Address;
    onEdit?: () => void;
    onDelete?: (id: string) => void;
}

export interface RegionAtPost {
    region: string; // e.g. "Daman and Diu" or empty string
    region_code: string; // e.g. "DD" or empty string
    region_id: number; // e.g. 599
}

export type ShippingFormData = {
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    region: RegionAtPost;
    postcode: string;
    country_code: string;
    telephone: string;
    company: string;
    vat_id: string;
    default_shipping: boolean;
    default_billing: boolean;
};
