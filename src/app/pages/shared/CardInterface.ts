import { ReceiptData } from './ReceiptData'

export interface CardInterface {
    newProduct: boolean;
    productID: string;
    producerID: string;
    orderID: string;
    imageURL: string;
    title: string;
    rating: number;
    ETA: string;
    description: string;
    category: string;
    unit: string;
    availability: number;
    receiptData: ReceiptData;
}