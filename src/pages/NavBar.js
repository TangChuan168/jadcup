import React, { useState,useEffect } from 'react'
import { NavBar, Space, Toast, AutoCenter } from 'antd-mobile'
//import { DemoBlock } from 'demos'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'
import {Link} from "react-router-dom"
import { useUserInfo } from '../components/UserInfo/UserInfoProvider'
import { useNavigate } from 'react-router-dom'

export default ({loggedIn}) => {

    
    const userInfo = useUserInfo();
    let navigate = useNavigate();

    useEffect(()=>{
        loginCheck(loggedIn);
    },[]);

    //checking if loggedin return to login page if not logged in
    const loginCheck =(loggedIn)=>{
        return loggedIn? 'loggedIn': navigate('/login')
    }

    const right = (
        <div style={{ fontSize: 18 }}>
          <Space>
            <SearchOutline />
            <MoreOutline />
          </Space>
        </div>)
    
    const back = () =>
        Toast.show({
        content: '点击了返回区域',
        duration: 1000,
    });
    
    return(
        <>
            <AutoCenter>

                    <NavBar>
                        <Link to={'/createSalesOrder'} >Create Sales Order</Link>
                    </NavBar>

                    <NavBar>
                        <Link to={'/vieworder'}>View Orders</Link>                 
                    </NavBar>

                    <NavBar>
                        <Link to={'/productList'}>MY Products List</Link>                 
                    </NavBar>

                    <NavBar>
                        <Link to={'/allproducts'}>ALL products</Link>                 
                    </NavBar>

                    <NavBar>
                        {userInfo == null? <Link to={'/login'}>Login</Link> :"logOUT"}                 
                    </NavBar>

            </AutoCenter>
        </>
    )
}

