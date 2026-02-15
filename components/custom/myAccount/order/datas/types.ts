import { CustomerOrder } from "./order.data.api";

export interface OrderCardProps {
    arrivalDate: string;
    status: string;
    productName: string;
    productDesc: string;
    imageUrl?: string;
    quantity: number;
    onClickOrderDetails: () => void;
    productImage?: string;
    productQuantity?: number;
}

export interface IOrderList {
    onClickOrderDetails: (id: string | null) => void;
    customerOrder: CustomerOrder[];
}

export interface IOrderDetails {
    onBackClick: () => void;
    orderId: string;
}
