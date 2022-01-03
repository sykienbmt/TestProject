import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import { OrderPagination } from '../../model/OrderPagination';
import { Pagination } from '../model/Pagination';



interface Props{
    page:number
    setPage:(pagination:Pagination)=>void
    currentPage:number,
    paginationInfo:Pagination
}

export default function PaginationItem(props:Props) {
    return (
        <span onClick={()=>props.setPage({...props.paginationInfo,page:props.page})} 
        className= {props.currentPage===props.page? "pagination-class" : "" }    >{props.page}</span> 
    )
}