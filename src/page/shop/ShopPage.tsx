import './ShopPage.css'
import React, { useEffect, useState } from 'react'
import { productController } from '../../controller/ProductController'
import {ItemCart, getListFromLocal, setCartsToLocal } from '../../model/ItemCart'
import { Pagination } from '../../model/Pagination'
import { Product } from '../../model/Product'
import PaginationItem from '../shop/Pagination'
import ShopItem from './ShopItem'
import { Order } from '../../model/Order'

interface Props{
    setMessage:(mess:string)=>void,
    order:Order
}
interface State{
    listShow:Product[],
    inputSearch:string,
    currentPage:number,
    totalPage:number[],
    carts:ItemCart[],
    countItemCart:number,
    pagination:Pagination,

}

export default function ProductsShow(props:Props) {

    const [state,setState]=useState<State>({
        listShow:[],
        inputSearch:"",
        currentPage:1,
        totalPage:[],
        carts:getListFromLocal(),
        countItemCart:getListFromLocal().length,
        pagination:{page:1,filter:"",perPage:10,search:""}
    })

    useEffect(() => {
        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage}
        ))
    }, [])
    

    const onCLickSearch=()=>{
        let pagi = state.pagination
        pagi.search=state.inputSearch
        pagi.perPage=10
        setState({...state,pagination:pagi})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagi,currentPage:1}
        ))
    }
    
    const onClickAddToCart = (id:string) => {

        const findIndex=state.carts.find(item => item.id === id);
        const list:ItemCart[] = state.carts
        let indexList = state.listShow.findIndex(item=>item.id===id)

        if (findIndex) {
          let index =state.carts.findIndex(item => item.id === id)
          state.carts[index].quantity=+list[index].quantity + 1
          state.carts[index].id=id
        } else {
          const newItemCart:ItemCart={
              id:id,quantity:1,
              name:state.listShow[indexList].name,
              price:state.listShow[indexList].price,
              image:state.listShow[indexList].image
            }
          list.push(newItemCart)
        }
        setState({...state,carts:list,countItemCart:list.length})
        setCartsToLocal(list)
        props.setMessage("Add to cart Successfully")
    }

    const sortArray =(e:any)=>{
        let pagi = state.pagination
        pagi.page=1
        pagi.filter=e
        setState({...state,pagination:pagi})
        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagi,currentPage:1}
        ))
    }

    const setPage=(pagination:Pagination)=>{
        productController.query(pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:Number(pagination.page)}
        ))
    }

    const onClickNextPage=()=>{
        let pagi = state.pagination
        pagi.page= Number(state.pagination.page)+1
        if(pagi.page>state.totalPage.length){
            pagi.page=state.totalPage.length
        }
        setState({...state,pagination:pagi})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagi,currentPage:Number(pagi.page)}
        ))
    }

    const onClickPrevPage=()=>{
        let pagi = state.pagination
        pagi.page= Number(state.pagination.page)-1
        if(pagi.page<1){
            pagi.page=1
        }
        setState({...state,pagination:pagi})

        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagi,currentPage:Number(pagi.page)}
        ))
    }

    const onChangeProductPerPage = (e:any)=>{
        let pagi = state.pagination
        pagi.perPage=e
        productController.query(state.pagination).then(res=>
            setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagi,currentPage:1}
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
                    onClickAddToCart={()=>onClickAddToCart(item.id)}
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
