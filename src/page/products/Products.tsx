import './Products.css'
import React from 'react'
import {ProductItem} from './ProductItem'
import { Product } from '../../model/Product'
import { useState } from 'react'
import Form from './Form'
import { v4 as uuid } from 'uuid';
import {getListProduct} from '../../model/Product'

interface State {
    products: Product[]
}

export default function Products() {
    
    const [state, setState] = useState<State>({products:getListProduct()});

    const [productEdit,setProductEdit] = useState<Product>({productId:"",name:"",price:0,image:""})

    const onDelete = (idProduct:string) => {
        let listProduct:Product[]=getListProduct();
        listProduct=listProduct.filter(item=>item.productId !== idProduct)
        setState({products:listProduct})
        setListProductToLocal(listProduct);
    };

    const onAddEditProduct=(product:Product) =>{
        let listProduct:Product[]=getListProduct();
        if(product.productId===""){
            product.productId=uuid();
            listProduct.push(product)
            let productClear={productId:"",name:"",price:0,image:"",desc:""};
            setProductEdit(productClear)
        }else{
            let index =listProduct.findIndex(item => item.productId === product.productId)
            listProduct[index] = product;
            let productClear={productId:"",name:"",price:0,image:"",desc:""};
            setProductEdit(productClear)
        }
        setState({products:listProduct})
        setListProductToLocal(listProduct);
    }

    const onClickShowInfo =(product:Product)=>{
        setProductEdit({...product})
    }

    const setListProductToLocal=(listProduct:Product[])=>{
        localStorage.setItem('listProduct',JSON.stringify(listProduct))
    }


    return (
        <section id="product-container">
            <div className="title-button">
                <h1 className="product-container-title">Danh Sách sản phẩm</h1>
            </div>
            <Form key={uuid()} onAddEditProduct={onAddEditProduct} productEdit={productEdit} />
            <div className="list-product">
                {state.products.map((item)=>  <ProductItem product={item} onDelete={onDelete} onClickShowInfo={onClickShowInfo}  key={item.productId}/>)}
            </div>
            
        </section>
    )
}
