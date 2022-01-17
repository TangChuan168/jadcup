import React from 'react'
import { useState,useEffect } from 'react'
import { useUserInfo } from '../../components/UserInfo/UserInfoProvider'
import endpoints,{BASE_URL} from '../../components/API/endpoints'
import {Link} from "react-router-dom"
import axios from 'axios'
import {
    Loading,
    Button,
    AutoCenter,
    Card,
    Image
  } from 'antd-mobile'

  const ProductList =({updateProduct,show})=> {

    const [Products,setProducts] = useState([]);
    const [pics,setPic] = useState([]);

    const userInfo = useUserInfo();
    const URL = BASE_URL + endpoints.GET_PRODUCT_BYID_QUOTA + '?id='+ userInfo.customerId;
    const authtoken = "Bearer "+ localStorage.getItem('token');
    //console.log('authToken is:',authtoken);

    useEffect(async () => {
      await GetList();
    },[]);


    //use for update selected product
    const UpdateData = (value) =>{
      console.log('selected product is##112',value);
      updateProduct(value);
      show(false);
    }

    const GetList = async () =>{

      const {data} = await axios({
        method:'get',
        url:URL,
        responseType:"json",
        headers:{
          Authorization:authtoken,         
        }
      });
      console.log('my productList return data is222:@',data.data);   
      
      const pic =  data.data.map(x =>{
        if(x.images){
          return {...x,images:JSON.parse(x.images)}
        }
        return x;
      }
      );
      console.log('obj is ####123:',pic);
      setProducts(pic);
      //setPic(pic);
      //console.log('pics is@@@@@@@@@@@@@@@@@@@@@ 333:',Products);
    }

    
    //use this is img when images is null
    const img = 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';
    const productList = (
      
        <>
          <Link to={'/'}><Button color='primary'>return Home page</Button></Link>
          {Products.map( x =>
            (             
                <>
                <Card 
                  title={x.productName}
                  key={x.productId}
                  
                >             
                  <Image 
                    src={x.images? x.images.url:img}
                    key={x.productId}
                    width={45}
                    height={45}
                    fit='cover'
                    style={{ borderRadius: 8 }}
                  />
                  <h5>
                    ProductID: {x.baseProductId}
                  </h5> <br />
                  <Button color='success' onClick={()=>UpdateData(x)} >
                    ADD
                  </Button>
                </Card>
                </>          
            )
          )
          }
        </>
    );
        

    return(
        <>
          {!Products? <Loading color='primary' />:productList}
        </>
    )
  }

  export default ProductList;

