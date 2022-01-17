import React from 'react'
import { useState } from 'react'
import {
    Form,
    Input,
    Button,
    TextArea,
    AutoCenter,
    ImageUploader
  } from 'antd-mobile'


  const AddProduct =()=>{


    const [product, setProduct] = useState({
        productName:"",
        description:"",
        imege:"",
    });

    const onFinish=()=>{
        console.log('addproduct onfinish is work fine');
    }

    return(
            <>
                <Form
                onFinish={onFinish}
                footer={
                <AutoCenter>
                    <Button block type='submit' color='primary'>
                        Create Product
                    </Button>
                </AutoCenter>
                }
            >
                <Form.Item
                    name='productName'
                    label='Product Name'
                    rules={[{ required: true, message: 'please enter the product name' }]}
                    
                >
                    <Input  />
                </Form.Item>
               
                <Form.Item
                    name='description'
                    label='Product Description'
                >
                        <TextArea />
                </Form.Item>

                <Form.Item
                    name='image'
                    label='Image'
                >
                    <ImageUploader
                        style={{ '--cell-size': '90px' }}
                        //value={fileList}
                        //onChange={setFileList}
                        //upload={mockUpload}
                    />
                </Form.Item>
            </Form>
        </>
    )
  }

  export default AddProduct;