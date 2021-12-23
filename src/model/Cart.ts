import { Buyer } from "./Buyer";
import { Product } from "./Product";

export interface Cart{
    buyerId: string;
    products:Product[];

}

