import { Buyer } from "./Buyer";
import { Product } from "./Product";

export interface ItemCart{
    id:string;
    price:number;
    name:string;
    // image:Image[];
    image?:string;
    quantity:number
}


export const getListFromLocal =()=>{
    let cartsFromLocal = localStorage.getItem('carts')
    let carts:ItemCart[]=[];
    if (cartsFromLocal) {
        const list = JSON.parse(cartsFromLocal)
        if(list.length===0){
            localStorage.setItem('carts',JSON.stringify([]))
            carts=[]
        }else{
            carts=list
        }
    }else{
        localStorage.setItem('carts',JSON.stringify([]))
        carts=[]
    }
    return carts
}

export const setCartsToLocal = (list:ItemCart[])=>{
    localStorage.setItem('carts',JSON.stringify(list))
}

