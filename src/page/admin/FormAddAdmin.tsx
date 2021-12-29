import React, { useState } from 'react'
import './ProductsAdmin.css'
import './FormAddAdmin.css'
import { Product } from '../../model/Product';


export interface Props {
    onAddEditProduct: (product:Product)=> void
    productEdit:Product
    isEdit:Boolean
    onEditShowPopup:(showForm:Boolean)=>void
    onEditForm:(isEdit:Boolean)=>void
};

interface State{
    newProduct:Product
    errName:string
    errPrice:string 
    errImage:string
}

export default function Form(props:Props) {

    const [state,setState]=useState<State>({
        newProduct:props.productEdit,
        errImage:"",
        errPrice:"",
        errName:""
    });

    const handleSubmit =(e:any)=>{
        e.preventDefault();
        const isValid = formValidation()
        if(isValid){
            props.onAddEditProduct(state.newProduct)
        }
    }

    const formValidation =()=>{
        let isValid=true

        if(state.newProduct.name.length===0){
            setState({...state,errName:'Name is not Valid'})
            isValid= false
        }

        if(state.newProduct.price===0){
            setState({...state,errPrice:'Price must be > 0'})
            isValid= false
        }

        if(state.newProduct.image===  ""){
            setState({...state,errName:'Image is not Valid'})
            isValid= false
        }
        return isValid
    }
    
    return (
        <div className="form-add">
            <div className="form-container">
                <h3 className="form-title">{props.isEdit? "Edit product":"Add Product"}</h3>
                <i className="far fa-times-circle" onClick={()=>{
                    props.onEditShowPopup(false); 
                    // props.onEditForm(false); 
                    setState({...state,newProduct:{id:"",name:"",price:0,image:""}})}}>
                </i>
                <form className="form-input" onSubmit={handleSubmit}>
                    <div className="input-name">
                        <label htmlFor="">Name:</label>
                        <input type="text" name="name" onChange={e=>{ setState({...state,newProduct:{...state.newProduct,name:e.target.value} })}} className="name-product" value={state.newProduct.name}/>
                        <label  className="show-err err-name">{state.errName==""? "." :state.errName}</label>
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Price:</label>
                        
                        {/* <input type="text" name="name" onChange={e=>{setNewProduct({...newProduct, price: Number(e.target.value)})}} className="price-product" value={state.newProduct.price}/> */}
                        <input type="text" name="name" onChange={e=>{ setState({...state,newProduct:{...state.newProduct,price:Number(e.target.value)} })}}  className="price-product" value={state.newProduct.price}/>
                        <label  className="show-err err-price"> {state.errPrice==""? "." :state.errPrice}</label>
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Image url:</label>
                        {/* <input type="text" name="image" onChange={e=>{setNewProduct({...newProduct, image: e.target.value})}}  className="img-product" value={state.newProduct.image} /> */}
                        <input type="text" name="image" onChange={e=>{ setState({...state,newProduct:{...state.newProduct,image:e.target.value} })}}  className="img-product" value={state.newProduct.image} />
                        <label  className="show-err err-image"> {state.errImage==""? "." :state.errImage}</label>
                    </div>
                    
                    <div className="group-button">
                    <button className="edit-product btn" type='submit'>{props.isEdit? "Edit":"Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
