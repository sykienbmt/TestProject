import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { OrderPagination } from '../../model/OrderPagination';
import { Pagination } from '../../model/Pagination';


interface Props{
    page:number
    setPage:(orderPagination:OrderPagination)=>void
    currentPage:number,
    paginationInfo:OrderPagination
}

export default function PaginationItem(props:Props) {
    return (
        <span onClick={()=>props.setPage({...props.paginationInfo,page:props.page})} 
        className= {props.currentPage===props.page? "pagination-class" : "" }    >{props.page}</span> 
    )
}