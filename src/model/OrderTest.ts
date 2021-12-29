import { ItemCart } from "./ItemCart";

export interface OrderTest{
    buyerId: string ,
    orderId:string,
    name:string ,
    address:string ,
    email:string
    phone:string ,
    time:number,
    listOrder: ItemCart[]
}