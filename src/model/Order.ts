import { Buyer } from "./Buyer";

export interface Order{
    orderId:string;
    buyerID:Buyer;
    product:OrderProduct[];
}

interface OrderProduct{
    productId:string;
    orderId:string;
    quantity:number;
}