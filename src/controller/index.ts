import axios from "axios";
const authAxios=axios.create({
    baseURL: 'http://localhost:3333/',
    timeout:30000
})
const token = localStorage.getItem('accessToken') || ""
authAxios.defaults.headers.common['Authorization'] = token

authAxios.interceptors.response.use(response=>response,err=>{
    if(err.response.status===401 || err.response.status===403){
        alert(`Pls login to use this function`)
        window.location.href='/login'
    }
})

export {authAxios}
