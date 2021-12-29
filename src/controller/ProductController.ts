import axios from "axios";
import { Pagination } from "../model/Pagination";
import { Product } from "../model/Product";




class ProductController{

    async list():Promise<Product[]>{
        return axios.get('http://localhost:3333/products').then(res=>{
            return res.data;
        });
    }

    async add(product:Product):Promise<Product[]>{
        return axios.put('http://localhost:3333/products/add',product) .then(res=>{
            return res.data;
        })
    }

    async update(product:Product):Promise<Product[]>{
        return axios.put('http://localhost:3333/products/update',product) .then(res=>{
            return res.data;
        })
    }

    async delete(productId:String):Promise<Product[]>{
        return axios.get(`http://localhost:3333/products/delete/${productId}`) .then(res=>{
            return res.data;
        })
    }

    async detail(id:String){
        return axios.get(`http://localhost:3333/product/detail/${id}`).then(res=>{
            return res.data as Product
        })
    }

    async query(info:Pagination){
        
        return axios.put('http://localhost:3333/test', info).then(res=>{
            console.log(info);
            let products:Product[]=res.data.products
            let totalPage:number[]=Array.from({length: res.data.totalPage}, (_, i) => i + 1)
            
            return {products,totalPage}
        })
    }
}

export const productController = new ProductController();