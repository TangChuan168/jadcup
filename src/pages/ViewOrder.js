import react,{useState,useEffect} from 'react'
import {BASE_URL} from '../components/API/endpoints'
import Endpoints from '../components/API/endpoints'
import { useUserInfo } from '../components/UserInfo/UserInfoProvider'
import {Link} from "react-router-dom"
import axios from 'axios'
import {
    Loading,
    Button,
    AutoCenter,
    Card,
    Image,
    List
  } from 'antd-mobile'

const ViewOrder =()=>{


    //const userInfo = useUserInfo();
    const authtoken = "Bearer "+ localStorage.getItem('token');
    const URL = BASE_URL + Endpoints.SALES_ORDER_GETALL_ORDER;

    const [orderList,setOrderList] = useState([]);

    useEffect(async()=>{
        console.log('useeffect working');
        await getAllOrders();
    },[])

    const getAllOrders = async () =>{
        const {data} = await axios({
            method:'get',
            url:URL,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }});

        console.log('view all orders #231',data.data);

        setOrderList(data.data);
        
    };

    return(
        <>
            <Link to={'/'}><Button color='primary'>return Home page</Button></Link>
            <List header='Orders'>
                {!orderList.length>0? 'Loading...':orderList.map(x=>(
                    <List.Item key={x.orderId}>
                        Order No:{x.orderNo} <br/>
                        Deliver address:{x.deliveryAddress} <br/>
                        Total price: {x.totalPrice} <br/>
                        Order Date:{x.orderDate}<br/>
                        Delivery Name:{x.deliveryName}<br/>
                    </List.Item>
                ))}
            </List>
        </>
    )

}

export default ViewOrder;

/*
            <List header='Orders'>
                {!orderList.length>0? Loading:orderList.map(x=>(
                    <List.Item key={x.orderId}>
                        Order No:{x.orderNo}
                        Deliver address:{x.deliveryAddress}
                        Total price: {x.totalPrice}
                        Order Date:{x.orderDate}
                        Delivery Name:{x.deliveryName}
                    </List.Item>
                ))}
            </List>
*/