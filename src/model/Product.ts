

export interface Product{
    id:string;
    price:number;
    name:string;
    // image:Image[];
    image?:string;
}

export const listIphone:Product[]=[
    {
        id:"12",
        price:10,
        name:"iphone 13",
        image:"https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
    }
]


// export const getListProduct =()=>{
//     let listIphoneLocal = localStorage.getItem('listProduct')
//     let listPro:Product[]=[];
//     if (listIphoneLocal) {
//         const list = JSON.parse(listIphoneLocal)
//         if(list.length===0){
//             localStorage.setItem('listProduct',JSON.stringify(listIphone))
//             listPro=listIphone
//         }else{
//             listPro=list
//         }
//     }else{
//         localStorage.setItem('listProduct',JSON.stringify(listIphone))
//         listPro=listIphone
//     }
//     return listPro
// }

