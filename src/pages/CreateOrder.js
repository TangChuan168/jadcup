import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import ProductList from './Product/ProductList'
import {Link} from "react-router-dom"
import axios from 'axios'
import { useUserInfo } from '../components/UserInfo/UserInfoProvider'
import endpoints,{BASE_URL} from'../components/API/endpoints'
import CreateSalesOrder from '../components/OderServices/createSalesOrder'
import {
    Form,
    Input,
    Button,
    TextArea,
    DatePicker,
    AutoCenter,
  } from 'antd-mobile'
  import {AddOutline} from 'antd-mobile-icons'


const CreateOrder = () => {

    //const [formData, setFormData] = useState({});
    const [selectedProduct,setSelectedProduct] = useState({});
    const [pickerVisible, setPickerVisible] = useState(false);
    const [modalVisible,setModalvisible] = useState(false);

    const userInfo = useUserInfo();
    console.log('user info$:1234',userInfo);
    const authtoken = "Bearer "+ localStorage.getItem('token');
    const URL = BASE_URL + endpoints.CREATE_ORDER;



    const onFinish= async (values)=>{
        console.log('submit form data',values);
        // ajax call
       
        const NewOrder = {
            orderStatusId:1,
            customerId:userInfo.customerId,
            //requiredDate
            totalPrice: 0,
            deliveryAddress:values.address,
            orderDate:values.date,
            custOrderNo: values.number,
            accountNote: values.note,
            orderProduct: [
                {
                  productId: selectedProduct.productId,
                  quantity: 1,
                  unitPrice: selectedProduct.minPrice,
                  price: selectedProduct.minPrice,
                }
              ]
        }
        console.log('input data of new order%342',NewOrder);

        const result = await axios({
            method:"POST",
            url:URL,
            responseType:"json",
            data:NewOrder,
            headers:{
              Authorization:authtoken,         
            }

        });
        console.log('create order result###434',result);
        
    }

    const handleProduct = ()=>{
        setModalvisible(!modalVisible);
    }

    const updateProduct =(data)=>{
        setSelectedProduct(data);
    }

    const show = (value) => {
        setModalvisible(value);
    }

    return (
        <>
        <Link to={'/'}><Button color='primary'>return Home page</Button></Link>
        <CreateSalesOrder />
            <AutoCenter>


                    <Form.Item
                        name='product'
                        //label='Select Product'
                    >
                        <Button onClick={handleProduct} color='warning' >
                            <AddOutline /> ADD Product
                        </Button>

                    {modalVisible? <ProductList updateProduct={updateProduct} show={show} />:''}   
                    </Form.Item>
                
            </AutoCenter>
        </>
    )
}

export default CreateOrder;
