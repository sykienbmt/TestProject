import './ShopPage.css'
import React, { useContext, useEffect, useState } from 'react'
import { productController } from '../../controller/ProductController'
import { Pagination } from '../../model/Pagination'
import { ItemCart, Product } from '../../model/Product'
import ShopItem from './ShopItem'
import { Order } from '../../model/Order'
import { cartController } from '../../controller/CartController'
import { OrderProduct } from '../../model/OrderProduct'
import { userController } from '../../controller/UserController'
import PaginationItem from '../../component/Pagination'
import { User } from '../../model/User'
import { OrderContext } from '../../context/OrderContext'
import { UserContext } from '../../context/UserContext'

interface Props{
    setMessage:(mess:string)=>void,
    order:Order
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
        carts:[],
        countItemCart:1,
        pagination:{page:1,filter:"",perPage:10,search:""},
        order:props.order
    })

    const {order,changeOrder}= useContext(OrderContext)
    const {changeUser}= useContext(UserContext)

    useEffect(() => {
        userController.getMe().then(res=>{
            changeUser(res);
        }).then(res=>{
            productController.list(state.pagination).then(res=>{
                setState({...state,listShow:res.products,totalPage:res.totalPage,order:order});
                changeOrder(order)
            })
        })
        
    }, [])
    
    const onCLickSearch=()=>{
        let pagination = {...state.pagination}
        pagination.search=state.inputSearch
        pagination.perPage=10
        setState({...state,pagination:pagination})

        productController.list(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        ))
    }
    
    const onClickAddToCart = (id:string,price:number) => {
        const order_product:OrderProduct={id_order:state.order.id_order,id:id,quantity:1,price:price}
        cartController.add(order_product)
        props.setMessage("Add to cart Successfully")
    }

    const sortArray =(e:any)=>{
        let pagination = state.pagination
        pagination.page=1
        pagination.filter=e
        productController.list(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        ))
    }

    const setPage=(pagination:Pagination)=>{
        productController.list(pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onClickNextPage=()=>{
        let pagination = state.pagination
        pagination.page= Number(state.pagination.page)+1
        if(pagination.page>state.totalPage.length){
            pagination.page=state.totalPage.length
        }
        productController.list(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onClickPrevPage=()=>{
        let pagination = state.pagination
        pagination.page= Number(state.pagination.page)-1
        if(pagination.page<1){
            pagination.page=1
        }
        productController.list(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onChangeProductPerPage = (e:any)=>{
        let pagination = state.pagination
        pagination.perPage=e
        productController.list(state.pagination).then(res=>
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
                    {state.listShow && state.listShow.length>0 && state.listShow.map((item)=><ShopItem key={item.id}  product={item} 
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
