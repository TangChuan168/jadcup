import React from 'react'
import { useState,useEffect } from 'react'
import { useUserInfo } from '../UserInfo/UserInfoProvider'
import endpoints,{BASE_URL} from '../API/endpoints'
import {Link} from "react-router-dom"
import dayjs from 'dayjs'
import axios from 'axios'
import {
    Loading,
    Button,
    AutoCenter,
    Stepper,
    Input,
    TextArea,
    DatePicker,
    Modal,
    Card,
    Image,
    Form,
    Cascader,
    Space, 
    Toast,
    Switch,
    List

  } from 'antd-mobile'
  import { useToggle } from 'ahooks'
  import {UnorderedListOutline, CalendarOutline, AddOutline,DeleteOutline } from 'antd-mobile-icons'

const CreateSalesOrder = () =>{


    const [pickerVisible, setPickerVisible] = useState(false);

    //FORM data
    /*
    const [FormData,setFormData] = useState({
        customer:[],
        deliveryAddress:'',
        orderDate:'',
        reqDate:'',
        deliveryNote:'',
        po:'',
        deliveryMethod:'',
        DeliveryName:'',
        postCode:'',
        warehouseNote:'',
        productionNote:'',
        accountNote:'',
        DeliveryASAP:false,
        selectedProduct:[],
        Option:{
            ProductOption:'',
            unitPrice:'',
            quantity:0,
            price:0
        }
    });
    */

    //select customer
    const [customerShow,setCustomerShow] = useState(false);
    const [customer,setCustomer] = useState([]);
    const [selectedCustomer,setSelectedC] = useState();
    const [ selectedCustomerID,setSelectedCustomerID] = useState();

    //delivery method
    const [deMethodShow,setDeMethodShow] = useState(false);
    const [deMethod,setDeMethod] = useState([]);
    const [selectedDeMethod,setSelectedDeMethod] = useState();

    //select address
    const [addressShow,setAddressShow] = useState(false);
    const [address,setAddress] = useState([]);
    const [selectedAddress,setSelectedAddress] = useState();

    // time picker
    const [pickerVisible1, setPickerVisible1] = useState(false);
    const [pickerVisible2, setPickerVisible2] = useState(false);
    const [time1,setTime1] = useState();
    const [time2,setTime2] = useState();

    const now = new Date();
    const newday = new Date();

    // PO
    const [po,setPo] = useState();

    // Delivery name
    const [DeName,setDeName] = useState();

    //Post code
    const [postCode,setPostCode] = useState();

    // deliver asap
    const [checked, { toggle: toggleChecked }] = useToggle(false)

    //add product
    const [step,setStep] = useState();
    const [customerProduct,setCustomerProduct] = useState([]);
    const [customerProductShow,setCustomerProductShow] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState();
    const [products,setProducts] = useState([]); // use as selected products container

    const [totalprice,setTotalPrice] = useState(0);

    
    


   

    const userInfo = useUserInfo();
    //console.log('user info from create order component:100',userInfo);
    const authtoken = "Bearer "+ localStorage.getItem('token');
    const CreateOrderURL = BASE_URL + endpoints.SALES_ORDER_ADDORDER;
    const getALLCustomerURL = BASE_URL + endpoints.GET_ALL_CUSTOMERS;
    const getDeMethodRUL = BASE_URL + endpoints.Get_DELIVERYMethod;
    
    

    useEffect(async()=>{
        //await GetCustomerList();
        await GetDeliveryMethod();
        console.log('products list data is',products)
        sumPrice();
    },[products]);

    //customer list
    const GetCustomerList = async ()=>{
        const {data} = await axios({
            method:"GET",
            url:getALLCustomerURL,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }
        });
        console.log('get all customer return data 113',data.data);
        const CustomerList = data.data.map(x=>(
            {label:`${x.company}-${x.customerCode}`,
            value:`${x.company}-${x.customerCode}`,
            dataForUpload:x.company,
            customerId:x.customerId

        } 
        ));

        //console.log('nwe list is ##',CustomerList);
        setCustomer(CustomerList);

    }

    //get Products List
    const GetProductList = async ()=>{
        const GetProductList_by_Customer = BASE_URL + endpoints.GET_PRODUCT_BYID_QUOTA + '?id=' + selectedCustomerID;
        const {data} = await axios({
            method:"GET",
            url: GetProductList_by_Customer,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }
        });
        console.log('get all product by customerID$ 678',data.data);
        const ProductsList = data.data.map(x=>(
            {label:`${x.productName}-${x.productId}`,
            value:`${x.productName}-${x.productId}`,
            price:x.minPrice,
            marginOfError:x.marginOfError,
            instock:x.minOrderQuantity

        } 
        ));
        setCustomerProduct(ProductsList);
    }

    //get delivery method

    const GetDeliveryMethod = async ()=>{
        const {data} = await axios({
            method:"GET",
            url:getDeMethodRUL,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }
        });
        //console.log('get all customer return data 113',data.data);
        const DeMethodList = data.data.map(x=>(
            {label:x.deliveryMethodName,value:x.deliveryMethodId,dataForUpload:x.deliveryMethodName} 
        ));

        //console.log('new delivery method list is ##',deMethod);
        setDeMethod(DeMethodList);

    }


    //get deliver address

    const GetAddress = async () =>{
        const getaddressURL = BASE_URL + endpoints.GET_EXTRAADDRESS + '?customerId=' + selectedCustomerID;
        const {data} = await axios({
            method:"GET",
            url:getaddressURL,
            responseType:"json",
            headers:{
              Authorization:authtoken,         
            }
        });

        const AddressList = data.data.map(x=>(
            {
                label:x.address,
                value:x.address,
                addressId:x.addressId
            }
        ));

        setAddress(AddressList);
        console.log('address data is 237',address);
    }


    // add product to list
    const postProduct = ()=>{
        console.log('postProduct is working 000');

        const addedProduct = {

            productName:selectedProduct[0].value,
            Price:selectedProduct[0].price,
            marginOfError:selectedProduct[0].marginOfError,
            stock:selectedProduct[0].instock,
            quantity:step
        };
        
        const newList = [...products,addedProduct];
        console.log('ready product',newList);
        setProducts(newList);
    }

    // remove product from list
    const removeProduct =(data)=>{
        const removed = products.filter(x=>x.productName !== data);
        console.log('removed list is',removed);
        setProducts(removed);
    }

    // sum of price
    // x=>parseInt(x.price)*parseInt(x.quantity)
    const sumPrice =()=>{
        if(products.length >0){
            const sumlist = products.map(x=>parseInt(x.price)*parseInt(x.quantity));
            let totalPrice = sumlist.reduce((a,b)=>(a+b));          
            setTotalPrice(totalPrice);
            console.log('sum of price is',totalPrice);

        }
        else{
            return null;
        }
    }


    const onFinish =()=>{
        console.log('onfinish is working');
        const addUrl = BASE_URL + endpoints.SALES_ORDER_ADDORDER;

        const newOrder = {
            customerId:selectedCustomerID,
            totalPrice:totalprice,
            employeeId:0,
            requiredDate:time1,
            orderDate:time2,
            deliveryAddress:selectedAddress,
            deliveryAsap:checked,
            orderProduct:products,


        };

        const result = axios({
            method:"POST",
            url:addUrl,
            responseType:"json",
            data:newOrder,
            headers:{
              Authorization:authtoken,         
            }
        });
        
    }



    return(
        <>
        <Link to={'/'}><Button color='primary'>return Home page</Button></Link>
                <AutoCenter>
                    <Form
                        onFinish={onFinish}
                        footer={<Button block type='submit' color='primary'>
                            Create Order
                        </Button>}
                    >
                        <Form.Item
                            name='Customer'
                            label='Customer'
                            rules={[{ required: true, message: 'Please select a customer' }]}
                            
                        >
                            <Space align='center'>
                                <Button
                                    onClick={() => {
                                    GetCustomerList();
                                    setCustomerShow(true)
                                    }}
                                >
                                    <UnorderedListOutline />
                                    
                                </Button>
                                <Cascader
                                    options={customer}
                                    visible={customerShow}
                                    onClose={() => {
                                    setCustomerShow(false)
                                    }}
                                    value={selectedCustomer}
                                    onConfirm={()=>{console.log('selected value124',selectedCustomer,selectedCustomerID)}} //clearn the values after selection
                                    onSelect={(val, extend) => {
                                    setSelectedC(val);
                                    setSelectedCustomerID(extend.items[0].customerId);

                                    console.log('onSelect@456', val, extend.items);                                   
                                    }}
                                >
                                    {items => {
                                        if (items.every(item => item === null)) {
                                            return 'Please select Customer'
                                        } else {
                                            return items.map(item => item?.label ?? 'Null').join('-')
                                        }
                                    }}
                                </Cascader>
                                </Space>
                        </Form.Item>

                        <Form.Item
                            name='address'
                            label='Delivery Address'
                            rules={[{ required: true, message: 'Please enter your Delivery Address' }]}
                        >
                            <Space align='center'>
                                <Button
                                    onClick={() => {
                                    GetAddress();
                                    setAddressShow(true)
                                    }}
                                >
                                    <UnorderedListOutline />
                                </Button>
                                <Cascader
                                    options={address}
                                    visible={addressShow}
                                    onClose={() => {
                                    setAddressShow(false)
                                    }}
                                    value={selectedAddress}
                                    onConfirm={()=>console.log('conformed')}
                                    onSelect={(val, extend) => {
                                    setSelectedC(val);
                                    console.log('onSelect', val, extend.items,selectedAddress);                                   
                                    }}
                                >
                                    {items => {
                                    if (items.every(item => item === null)) {
                                        return 'Please select Delivery Address'
                                    } else {
                                        return items.map(item => item?.label ?? 'Null').join('-')
                                    }
                                    }}
                                </Cascader>
                            </Space>
                        </Form.Item>

                        <Form.Item
                            name='deliveryMethod'
                            label='Delivery Method'
                            rules={[{ required: true, message: 'Delivery Method is required' }]}
                        >
                            <Space align='center'>
                                <Button
                                    onClick={() => {
                                    setDeMethodShow(true)
                                    }}
                                >
                                    <UnorderedListOutline />
                                </Button>
                                <Cascader
                                    options={deMethod}
                                    visible={deMethodShow}
                                    onClose={() => {
                                    setDeMethodShow(false)
                                    }}
                                    value={selectedDeMethod}
                                    onConfirm={()=>console.log('conformed')}
                                    onSelect={(val, extend) => {
                                    setSelectedDeMethod(val);
                                    console.log('onSelect', val, extend.items);                                   
                                    }}
                                >
                                    {items => {
                                    if (items.every(item => item === null)) {
                                        return 'Plese select Delivery Method'
                                    } else {
                                        return items.map(item => item?.label ?? 'Null').join('-')
                                    }
                                    }}
                                </Cascader>
                            </Space>
                        </Form.Item>

                        <Form.Item
                            name='OrderDate'
                            label='Order Date'
                            trigger='onConfirm'
                            onClick={() => {setPickerVisible1(true)}}
                            rules={[{ required: true, message: 'Order Date is required' }]}
                        >
                            <CalendarOutline />
                            <DatePicker
                                visible={pickerVisible1}
                                defaultValue={now}
                                onChange={(value)=>setTime1(value)}
                                onClose={() => {
                                    setPickerVisible1(false)
                                }}
                                >
                                {value =>
                                    value ? dayjs(value).format('YYYY-MM-DD') : ''
                                }
                                
                            </DatePicker>
                        </Form.Item>

                        <Form.Item
                            name='REQdate'
                            label='REQ Date'
                            trigger='onConfirm'
                            onClick={() => {setPickerVisible2(true)}}
                            rules={[{ required: true, message: 'REQ Date is Required ' }]}
                        >
                            <CalendarOutline />
                            <DatePicker
                                //title='REQ Date'
                                visible={pickerVisible2}
                                defaultValue={newday}
                                onChange={(value)=>setTime2(value)}
                                onClose={() => {
                                    setPickerVisible2(false)
                                }}
                                >
                                {value =>
                                    value ? dayjs(value).format('YYYY-MM-DD') : ''
                                }
                                
                            </DatePicker>
                        </Form.Item>

                        <Form.Item
                            name='po'
                            label='PO'                           
                        >
                            <Input 
                                value={po}
                                onChange = {val=>setPo(val)} 
                                clearable                           
                            />
                        </Form.Item>

                        <Form.Item
                            name='delivername'
                            label='Delivery Name'                           
                        >
                            <Input 
                                value={DeName}
                                onChange = {val=>setDeName(val)} 
                                clearable                           
                            />
                        </Form.Item>

                        <Form.Item
                            name='postalCode'
                            label='PostalCode'                           
                        >
                            <Input 
                                value={postCode}
                                onChange = {val=>setPostCode(val)} 
                                clearable                           
                            />
                        </Form.Item>

                        <Form.Item
                            name='accountNote'
                            label='Note to Account'
                        >
                                <TextArea           
                                    showCount
                                    maxLength={150} 
                                />
                        </Form.Item>

                        <Form.Item
                            name='productionNote'
                            label='Note to Production'
                        >
                                <TextArea           
                                    showCount
                                    maxLength={150} 
                                />
                        </Form.Item>

                        <Form.Item
                            name='WarehouseNote'
                            label='Note to Warehouse'
                        >
                                <TextArea           
                                    showCount
                                    maxLength={150} 
                                />
                        </Form.Item>

                        <Form.Item
                            name='asap'
                            label='Delivery ASAP'
                        >
                             <Switch
                                checked={checked}
                                onChange={checked => {
                                    toggleChecked(checked)
                                  }}
                             />
                        </Form.Item>

                        <Form.Item
                            name='productselect'                            
                        >
                            <Button                                                            
                            onClick={() => {
                            GetProductList();
                            setCustomerProductShow(true);
                            }}

                            >
                                <UnorderedListOutline />
                            </Button>
                            <Space align='center'>
                            <Cascader
                                options={customerProduct}
                                visible={customerProductShow}
                                onClose={()=>{setCustomerProductShow(false)}}
                                value={selectedProduct}
                                onSelect={(val,extend)=>{
                                    setSelectedProduct(extend.items);
                                    console.log("selected product",val,extend.items);
                                }}
                                onConfirm={console.log('selected product',selectedProduct)}
                            >
                                {items => {
                                if (items.every(item => item === null)) {
                                    return 'Please Select Products'
                                } else {
                                    return items.map(item => item?.label ?? 'Null').join('-')
                                }
                                }}
                            </Cascader> 
                            
                            </Space > 
                        </Form.Item>
                        <Form.Item label='QTY' required>
                            <Stepper onChange={(val)=>setStep(val)} value={step} />
                        </Form.Item>
                        <Form.Item label='Price'>
                            <Input readOnly value={selectedProduct? selectedProduct[0].price:''}></Input>
                        </Form.Item>
                        <Form.Item label='Stock'>
                            <Input readOnly value={selectedProduct? selectedProduct[0].instock:''}></Input>
                        </Form.Item>
                        <Form.Item label='marginOfError'>
                            <Input readOnly value={selectedProduct? selectedProduct[0].marginOfError:''}></Input>
                        </Form.Item>
                        <Button
                            onClick={()=>postProduct()}
                            color='warning'
                        >
                            <AddOutline /> ADD Product
                        </Button>
                        <List header="Selected Products List">
                                {!products? '':products.map(x=>(
                                    <List.Item
                                        key={x.productName}
                                        //description={`${x.productName}/QTY:${x.quantity}/Price:${x.price? x.price:''}`}
                                    >
                                        
                                        Product Name:{x.productName} <br/>
                                        QTY:{x.quantity} <br/>
                                        Price:{x.price}<br/>
                                        MarginOfError:{x.marginOfError}<br/>
                                        Stock:{x.stock}<br/>
                                        <Button
                                            color='danger'
                                            onClick={()=>removeProduct(x.productName)}
                                            
                                        ><DeleteOutline />Del</Button>
                                    </List.Item>
                                ))}
                        </List>
                        <Card
                            title='Total Price '
                        >
                            $:{totalprice} NZD
                        </Card>
                    </Form>





                </AutoCenter>
        </>
    )
}

export default CreateSalesOrder;

