

export interface Product{
    productId:string;
    price:number;
    name:string;
    desc?:string;
    // image:Image[];
    image?:string;
}

export const listIphone:Product[]=[
    {
        productId:"12",
        price:10,
        name:"iphone 13",
        desc:"lorem11111",
        image:"https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
    },
    {
        productId:"13",
        price:103,
        name:"iphone 12",
        desc:"lorem1113333",
        image:"https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
    },
    {
        productId:"14",
        price:1033,
        name:"iphone 11",
        desc:"lorem111444",
        image:"https://cdn.tgdd.vn/Products/Images/42/213033/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg"
    }
]



export const getListProduct =()=>{
    let listIphoneLocal = localStorage.getItem('listProduct')
    let listPro:Product[]=[];
    if (listIphoneLocal) {
        const list = JSON.parse(listIphoneLocal)
        if(list.length===0){
            localStorage.setItem('listProduct',JSON.stringify(listIphone))
            listPro=listIphone
        }else{
            listPro=list
        }
    }else{
        localStorage.setItem('listProduct',JSON.stringify(listIphone))
        listPro=listIphone
    }
    return listPro
}


