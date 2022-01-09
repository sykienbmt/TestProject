import './ProductsAdmin.css'
import React, { useContext, useEffect, useState } from 'react'
import {ProductItem} from './ProductItemAdmin'
import { Product } from '../../model/Product'
import Form from './FormAddAdmin'
import { v4 as uuid } from 'uuid';
import { productController } from '../../controller/ProductController'
import { Pagination } from '../../model/Pagination'
import PaginationItem from '../../component/Pagination'
import { UserContext } from '../../context/UserContext'
import { CartConText } from '../../context/CartContext'
import { userController } from '../../controller/UserController'


interface Props{
    setMessage:(mess:string)=>void
}
export interface State {
    products: Product[]
    product: Product
    isEdit:Boolean
    showPopup:Boolean
    currentPage:number,
    totalPage:number[],
    pagination:Pagination,
  }

export default function Products(props:Props) {

  const [state, setState] = useState<State>({
      products: [],
      product:  {id:"",name:"",price:0,image:""},
      isEdit:false,
      showPopup:false,
      currentPage:1,
      totalPage:[],
      pagination:{page:1,filter:"",perPage:8,search:""},
  });

      
  useEffect(() => {
    productController.list(state.pagination).then(res=>{
      setState({...state,products:res.products,totalPage:res.totalPage})
    })
  }, []);

  const userConText = useContext(UserContext)
  const cartContext = useContext(CartConText)
  useEffect(()=>{
      userController.getMe().then(res=>{
          userConText.changeUser(res);
          cartContext.getInfoCart(res.id_user)
      })
  },[])
  //is
  const onEditForm =(isEdit:Boolean)=>{
    setState({...state,isEdit:isEdit})
  }
    
  const onDelete = (idProduct:string) => {
    productController.delete(idProduct).then(()=>
      productController.list(state.pagination).then(res=>
        {setState({...state,products:res.products,totalPage:res.totalPage})}
      ))
    props.setMessage("Delete Successfully")
  };
    
  //add-edit product
  const onAddEditProduct=(product:Product) =>{
    // let listProduct:Product[]=state.products;
    if(product.id===""){
        product.id=uuid();
        productController.add(product).then(()=>
          productController.list(state.pagination).then(res=>
            {setState({...state,products:res.products,totalPage:res.totalPage})}
          ))
        props.setMessage("Add Successfully")
    }else{
        productController.update(product).then(()=>
          productController.list(state.pagination).then(res=>
            {setState({...state,products:res.products,totalPage:res.totalPage})}
          ))
        props.setMessage("Update Successfully")
    }
    // setState({...state,products:listProduct})
    let productClear={id:"",name:"",price:0,image:""};
    setState({...state,product:productClear})
  }

  //set product to show edit
  const onClickShowInfo =(productShow:Product)=>{
    setState({...state,product:productShow,isEdit:true,showPopup:true})
  }

  //show popup
  const onEditShowPopup = (showPopup:Boolean)=>{
    setState({...state,isEdit:false,showPopup: showPopup,product:{id:"",name:"",price:0,image:""}})
  }
    
  //Pagination  

  const setPage=(pagination:Pagination)=>{
    productController.list(pagination).then(res=>
        setState({...state,products:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
    ))
}

const onClickNextPage=()=>{
    let pagination = state.pagination
    pagination.page= Number(state.pagination.page)+1
    if(pagination.page>state.totalPage.length){
        pagination.page=state.totalPage.length
    }
    productController.list(state.pagination).then(res=>
        setState({...state,products:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
    ))
}

const onClickPrevPage=()=>{
    let pagination = state.pagination
    pagination.page= Number(state.pagination.page)-1
    if(pagination.page<1){
        pagination.page=1
    }
    productController.list(state.pagination).then(res=>
        setState({...state,products:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
    ))
}


  return (
      <>
          {state.showPopup===true ? <Form key={uuid()} onAddEditProduct={onAddEditProduct} productEdit={state.product} isEdit={state.isEdit} onEditForm={onEditForm} onEditShowPopup={onEditShowPopup}/>:""}
          <section id="product-container">
              <div className="title-button">
                  <h1 className="product-container-title">ADMIN PAGE</h1>
                  <button className="btn-add-product btn" onClick={()=>{onEditShowPopup(true)}}>Add Product</button>
              </div>

              <div className='list-product-container'>
                <div className="list-product">
                    {state.products.map((item)=>  <ProductItem product={item} onDelete={onDelete} onClickShowInfo={onClickShowInfo}  key={item.id}/>)}
                </div>
              </div>

              <div className="shop-pagination-container">
                    <button className="pagination-prev btn" onClick={onClickPrevPage}> Back </button>
                        
                        {state.totalPage.map(item=> < PaginationItem key={item} page={item} setPage={setPage} currentPage={state.currentPage} paginationInfo={state.pagination}/>)}
                        
                        <span>...</span>
                    <button className="pagination-next btn" onClick={onClickNextPage}>Next</button>
            </div>
          </section>
      </>
  )
}
