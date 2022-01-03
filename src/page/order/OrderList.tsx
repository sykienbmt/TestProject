import { randomUUID } from 'crypto'
import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController'
import ItemOrderList from './ItemOrderList'
import './OrderList.css'
import {v4 as uuid} from 'uuid'
import { Order, OrderWithDetailAddress } from '../../model/Order'
import { OrderPagination } from '../../model/OrderPagination'
import PaginationItem from './Pagination'
interface Props{
    order:Order
}

interface State{
    listOrder:OrderWithDetailAddress[],
    currentPage:number,
    totalPage:number[],
    orderPagination:OrderPagination
}


export default function OrderList(props:Props) {
    const [state,setState] = useState<State>({listOrder:[],currentPage:1,totalPage:[],orderPagination:{id_user:props.order.id_user,page:1,perPage:3},})

    useEffect(() => {
        orderController.getListOrderWithPagination(state.orderPagination).then(res=>{
            setState({...state,listOrder:res.listOrder,totalPage:res.totalPage})
        })
    }, [])
    


    const onClickNextPage=()=>{
        let pagination = state.orderPagination
        pagination.page= Number(state.orderPagination.page)+1
        if(pagination.page>state.totalPage.length){
            pagination.page=state.totalPage.length
        }
        setState({...state,orderPagination:pagination})

        orderController.getListOrderWithPagination(state.orderPagination).then(res=>{
            setState({...state,listOrder:res.listOrder,totalPage:res.totalPage,currentPage:Number(pagination.page)})
        })
    }

    const onClickPrevPage=()=>{
        let pagination = state.orderPagination
        pagination.page= Number(state.orderPagination.page)-1
        if(pagination.page<1){
            pagination.page=1
        }
        setState({...state,orderPagination:pagination})

        orderController.getListOrderWithPagination(state.orderPagination).then(res=>{
            setState({...state,listOrder:res.listOrder,totalPage:res.totalPage,currentPage:Number(pagination.page)})
        })
    }

    const setPage=(orderPagination:OrderPagination)=>{

        orderController.getListOrderWithPagination(orderPagination).then(res=>{
            setState({...state,listOrder:res.listOrder,totalPage:res.totalPage,currentPage:Number(orderPagination.page)})
        })
    }


    const onChangeProductPerPage = (e:any)=>{
        let pagination = state.orderPagination
        pagination.perPage=e
        // productController.query(state.pagination).then(res=>
        //     setState({...state,listShow:res.products,totalPage:res.totalPage,pagination:pagination,currentPage:1}
        // ))
    }
    
    return (
        <section id="order-history-container" >
            <div className="order-history">
                <h2 className="order-history-title">Order History</h2>
                {state.listOrder.map(item=><ItemOrderList key={uuid()} itemOrder={item}/>)}
                {/* {state.id_order_list.map(item=><ItemOrderList key={uuid()} id_order={item} id_user={props.order.id_user}/>)} */}
            </div>
            <div className="shop-pagination-container">
                    <button className="pagination-prev btn" onClick={onClickPrevPage}> Back </button>
                        
                        {state.totalPage.map(item=> < PaginationItem key={item} page={item} setPage={setPage} currentPage={state.currentPage} paginationInfo={state.orderPagination}/>)}
                        
                        {/* <span>...</span> */}
                    <button className="pagination-next btn" onClick={onClickNextPage}>Next</button>
            </div>
        </section>
    )
}
