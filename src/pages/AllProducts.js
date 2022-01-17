import react,{useState,useEffect} from 'react'
import {BASE_URL} from '../components/API/endpoints'
import Endpoints from '../components/API/endpoints'
import { useUserInfo } from '../components/UserInfo/UserInfoProvider'
import axios from 'axios'
import {Link} from "react-router-dom"
import {
    Loading,
    Button,
    AutoCenter,
    Card,
    Image
  } from 'antd-mobile'

const AllProducts = () =>{

    const [Products,setProducts] = useState([]);
    const URL = BASE_URL + Endpoints.GET_ALLSHOW_PRODUCTS;
    const authtoken = "Bearer "+ localStorage.getItem('token');


    useEffect(async()=>{
        await ProductsList();
                
    },[])

    const ProductsList = async () =>{

        const result = await axios({
            method:'get',
            url:URL,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }
        });
        console.log('return data is===>:123',result.data.data[0].product);
        setProducts(result.data.data[0].product);
    }

    const productShow = (
        <>
            {Products.map(x =>(
                <Card
                   
                    key={x.productId}
                >
                    <h5>{x.productName}</h5>
                </Card>
            ))}
        </>
    )

    return(
        <>
            <Link to={'/'}><Button color='primary'>return Home page</Button></Link>
            {!Products? <Loading color='primary' />:productShow}
        </>
    )
}



export default AllProducts;