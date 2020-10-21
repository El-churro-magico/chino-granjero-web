import { DisplayerData } from './DisplayerData';

export interface ReceiptData {
    clientID: string,
    products: DisplayerData[];
    receiptID: string,
    deliveryAddress: string,
    total: number,
    time: string
}