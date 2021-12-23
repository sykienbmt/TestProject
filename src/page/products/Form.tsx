import React, { useState } from 'react'
import { Product } from '../../model/Product';


export interface Props {
    onAddEditProduct: (product:Product)=> void
    productEdit:Product
    error?:  {
                field:{},
                errs:{}
            }   
};

export default function Form(props:Props) {

    const [newProduct, setNewProduct] = useState<Product>(props.productEdit);

    const [errName,setErrName] =useState('')
    const [errPrice,setErrPrice] =useState('')
    const [errImage,setErrImage] =useState('')

    // const [isValid, setIsValid] = useState(false);
    // const [isBlur, setIsBlur] = useState(false);

    // const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    //     setIsBlur(false);
    // };

    // const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    //     setIsBlur(true);
    
    //     if(newProduct.name.length==0){
    //       setIsValid(true);
    //     } else {
    //       setIsValid(false);
    //     }
    // };

    const handleSubmit =(e:any)=>{
        e.preventDefault();
        const isValid = formValidation()
        if(isValid){
            props.onAddEditProduct(newProduct)
        }
    }




    const formValidation =()=>{
        let nameErr = '';
        let priceErr = '';
        let imageErr = '';
        let isValid=true

        if(newProduct.name.length===0){
            nameErr='Ten khong duoc de trong';
            isValid= false
        }

        if(newProduct.price===0){
            priceErr='Gia phai lon hon 0';
            isValid= false
        }

        if(newProduct.image===  ""){
            imageErr='Hinh anh khong duoc de trong';
            isValid= false
        }

        setErrName(nameErr)
        setErrPrice(priceErr)
        setErrImage(imageErr)
        console.log(isValid);
        
        return isValid
    }


    return (
        <div className="form-add">
            <div className="form-container">
                <form className="form-input" onSubmit={handleSubmit}>
                    <div className="input-name">
                        <label htmlFor="">Name:</label>
                        <input type="text" name="name" onChange={e=>{setNewProduct({...newProduct, name: e.target.value})}} className="name-product" value={newProduct.name}/>
                        <label  className="show-err err-name">{errName}</label>
                        {/* {isBlur && !isValid && <label  className="show-err err-name">Your name is not valid</label>}
                        {isBlur && isValid && <label  className="show-err err-name">Your name Valid</label>} */}
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Price:</label>
                        <input type="text" name="name" onChange={e=>{setNewProduct({...newProduct, price: Number(e.target.value)})}} className="price-product" value={newProduct.price}/>
                        <label  className="show-err err-price"> {errPrice}</label>
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Image url:</label>
                        <input type="text" name="image" onChange={e=>{setNewProduct({...newProduct, image: e.target.value})}}  className="img-product" value={newProduct.image} />
                        <label  className="show-err err-image"> {errImage}</label>
                    </div>
                    <div className="input-name">
                        <label htmlFor="">Desc:</label>
                        <input type="text" name="desc" onChange={e=>{setNewProduct({...newProduct, desc: e.target.value})}}  className="desc-product" value={newProduct.desc}/>
                        <label  className="show-err err-desc"> &nbsp;</label>
                    </div>
                    
                    <div className="group-button">
                    <button className="edit-product btn" type='submit'>Add</button>
                    <button className="edit-product btn" type='submit'>Edit</button>
                    <button className="edit-product btn" >Remove</button>
                </div>
                </form>
                
            </div>
        </div>
    )
}
