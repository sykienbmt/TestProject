import { OrderWithDetail } from "./Order";
import { Product } from "./Product";

export interface OrderProduct{
    id_order: string,
    id: string,
    quantity:number,
    price:number,
}

export interface OrderProductShow extends OrderProduct{
    product: Product
}