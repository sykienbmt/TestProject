import { randomUUID } from 'crypto'
import React, { useEffect, useState } from 'react'
import { orderController } from '../../controller/OrderController'
import { OrderTest } from '../../model/OrderTest'
import ItemOrderList from './ItemOrderList'
import './OrderList.css'
import {v4 as uuid} from 'uuid'

interface State{
    listOrder:OrderTest[],
}


export default function OrderList() {
    const [state,setState] = useState<State>({listOrder:[]})
    useEffect(() => {
        orderController.get().then(res=>{
            setState({listOrder:res})
        })
    }, [])

    return (
        <section id="order-history-container" >
            <div className="order-history">
                <h2 className="order-history-title">Order History</h2>
                {state.listOrder.map(item=><ItemOrderList key={uuid()} orderTest={item}/>)}
            </div>
        </section>
    )
}
