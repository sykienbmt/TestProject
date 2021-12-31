import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { productController } from '../../controller/ProductController';
import { Product } from '../../model/Product'
import './ProductDetail.css'

interface State{
    product:Product
}


export default function ProductDetail() {
    const [state, setState] = useState<State>({
        product:{id:window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1),name:"",price:0,image:""}
    });

    useEffect(() => {
        var id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
        productController.detail(id).then(res=>{
           setState({...state,product:res})
        })
    },[])
    
    return (
        <div id="product-detail-container">
            <div className="product-detail">
                <div className="product-detail-img">
                    <img src={state.product.image}  alt="" />
                </div>
                <div className="product-detail-content">
                    <h4 className="product-detail-title">Product/ IphoneXXX </h4>
                    <h1 className="product-detail-name">Name: {state.product.name}</h1>
                    <h3 className="product-detail-price">Price: {state.product.price} $</h3>
                    <select className="product-detail-size" id="">
                        <option value="L">Size L</option>
                        <option value="M">Size M</option>
                        <option value="XL">Size XL</option>
                    </select>
                    <div className="product-change-quantity">
                        <button><i className="fas fa-minus"></i></button>
                        <input type="number" name="" id="" className="product-input-quantity" />
                        <button><i className="fas fa-plus"></i></button>
                    </div>
                    <button className="btn">Add to Cart</button>
                    <h5 className="product-desc-title">Product desc:</h5>
                    <p className="product-detail-desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate dolore ipsam provident voluptatibus quod optio sed ad nobis cupiditate vitae!</p>
                </div>
            </div>
        </div>
    )
}
