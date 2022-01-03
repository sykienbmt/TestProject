import './ShopPage.css'
import React, { useEffect, useState } from 'react'
import { productController } from '../../controller/ProductController'
import {getListFromLocal, ItemCart } from '../../model/ItemCart'
import { Pagination } from '../../model/Pagination'
import { Product } from '../../model/Product'
import PaginationItem from '../shop/Pagination'
import ShopItem from './ShopItem'
import { Order } from '../../model/Order'
import { cartController } from '../../controller/CartController'
import { OrderProduct } from '../../model/OrderProduct'
import { userController } from '../../controller/UserController'

interface Props{
    setMessage:(mess:string)=>void,
    order:Order,
    // setTotalMoney:(total:number)=>void
}
interface State{
    listShow:Product[],
    inputSearch:string,
    currentPage:number,
    totalPage:number[],
    pagination:Pagination,
    carts:ItemCart[],
    countItemCart:number,
    order:Order
}

export default function ProductsShow(props:Props) {

    const [state,setState]=useState<State>({
        listShow:[],
        inputSearch:"",
        currentPage:1,
        totalPage:[],
        carts:getListFromLocal(),
        countItemCart:getListFromLocal().length,
        pagination:{page:1,filter:"",perPage:10,search:""},
        order:{...props.order}
    })
    console.log(props.order);
    
    useEffect(() => {
        userController.getUser(state.order.id_user).then(order=>{
            productController.query(state.pagination).then(res=>
                setState({...state,listShow:res.products,totalPage:res.totalPage,order:order}
            ))
        })
    }, [])
    console.log(state.order);
    

    const onCLickSearch=()=>{
        let pagination = state.pagination
        pagination.search=state.inputSearch
        pagination.perPage=10
        setState({...state,pagination:pagination})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        ))
    }
    
    const onClickAddToCart = (id:string,price:number) => {
        const order_product:OrderProduct={id_order:state.order.id_order,id:id,quantity:1,price:price}
        cartController.addToCart(order_product)


        // const findIndex=state.carts.find(item => item.id === id);
        // const list:ItemCart[] = state.carts
        // let indexList = state.listShow.findIndex(item=>item.id===id)

        // if (findIndex) {
        //   let index =state.carts.findIndex(item => item.id === id)
        //   state.carts[index].quantity=+list[index].quantity + 1
        //   state.carts[index].id=id
        // } else {
        //   const newItemCart:ItemCart={
        //       id:id,quantity:1,
        //       name:state.listShow[indexList].name,
        //       price:state.listShow[indexList].price,
        //       image:state.listShow[indexList].image
        //     }
        //   list.push(newItemCart)
        // }
        // setState({...state,carts:list,countItemCart:list.length})
        // setCartsToLocal(list)
        props.setMessage("Add to cart Successfully")
    }

    const sortArray =(e:any)=>{
        let pagination = state.pagination
        pagination.page=1
        pagination.filter=e
        setState({...state,pagination:pagination})
        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        ))
    }

    const setPage=(pagination:Pagination)=>{
        productController.query(pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onClickNextPage=()=>{
        let pagination = state.pagination
        pagination.page= Number(state.pagination.page)+1
        if(pagination.page>state.totalPage.length){
            pagination.page=state.totalPage.length
        }
        setState({...state,pagination:pagination})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onClickPrevPage=()=>{
        let pagination = state.pagination
        pagination.page= Number(state.pagination.page)-1
        if(pagination.page<1){
            pagination.page=1
        }
        setState({...state,pagination:pagination})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onChangeProductPerPage = (e:any)=>{
        let pagination = state.pagination
        pagination.perPage=e
        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        ))
    }
    

    return (
        <div id="shopping-container">
            <div className="shop-show">
                <div className="title-bar">
                    <div className="group-search">
                        <input type="text" className="search-product" placeholder='Search' 
                                            onChange={e=> setState({...state,inputSearch:e.target.value})}/>
                        <button className="btn" onClick={onCLickSearch}>Search</button>
                        <label htmlFor="">Number perPage</label>
                        <select id="show-product-perPage" onChange={(e) => onChangeProductPerPage(e.target.value)}>
                            <option value={10} className="txtSort">10 perPage</option>
                            <option value={3}>3 Products</option>
                            <option value={5}>5 Products</option>
                        </select>
                        
                    </div>
                    
                    <select id="dropdown" onChange={(e) => sortArray(e.target.value)}>
                        <option value="N/A" className="txtSort">Sort</option>
                        <option value="AZ">Name: A-Z</option>
                        <option value="ZA">Name: Z-A</option>
                        <option value="Ascend">Price: Ascending</option>
                        <option value="Descend">Price: Descending</option>
                    </select>
                </div>
                <div className="shop-list-container">
                    {state.listShow.map((item)=><ShopItem key={item.id}  product={item} 
                    onClickAddToCart={()=>onClickAddToCart(item.id,item.price)}
                    />)}
                </div>
            </div>
            <div className="shop-pagination-container">
                    <button className="pagination-prev btn" onClick={onClickPrevPage}> Back </button>
                        
                        {state.totalPage.map(item=> < PaginationItem key={item} page={item} setPage={setPage} currentPage={state.currentPage} paginationInfo={state.pagination}/>)}
                        
                        <span>...</span>
                    <button className="pagination-next btn" onClick={onClickNextPage}>Next</button>
            </div>
        </div>
    )
}
