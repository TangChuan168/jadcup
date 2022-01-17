import react,{useState} from 'react'
import {BASE_URL} from '../components/API/endpoints'
import Endpoints from '../components/API/endpoints'
import {useSetUserInfo} from '../components/UserInfo/UserInfoProvider'
import {useUserInfo} from '../components/UserInfo/UserInfoProvider'
import {
    Form,
    Input,
    Button,
    AutoCenter
  } from 'antd-mobile'
import {useNavigate} from 'react-router-dom'

const URL = BASE_URL + Endpoints.USER_LOGIN;

const Login = ({setloggedIn}) => {

//[ loading, setLoading ] = useState(false);

const SetUser = useSetUserInfo();
const userInfo = useUserInfo();

let navigate = useNavigate();

const onFinish = async (values) => {
    console.log('form data is:#121',values);
    //ajax call
    const response = await fetch(URL,{
        method:"post",
        body:JSON.stringify(values),
        headers: {'Content-Type': 'application/json'}
        

    });

    if(!response){console.log('user is not exist')};
    const {data} = await response.json();
    console.log('return data is ',data);
    
    //set loggedin as true
    setloggedIn(true);

    //save token to local storage
    localStorage.setItem('token',data.token);
    navigate('/');

    //set usercontext
    SetUser(data);
    console.log("user info global#login",userInfo);

}

const Login = (
    <>
        <AutoCenter>
            <Form
                onFinish={onFinish}
                footer={<Button block type='submit' color='primary'>
                    Login
                </Button>}
            >
                <Form.Item
                    name='UserName'
                    label='Account'
                    rules={[{ required: true, message: 'Please enter your Account' }]}
                    initialValue="Hollywood"
                >
                    <Input placeholder='Account@example.com' clearable />
                </Form.Item>

                <Form.Item
                    name='password'
                    label='PassWord'
                    rules={[{ required: true, message: 'Please enter your password' }]}
                    
                >
                    <Input 
                        type="password" 
                        placeholder='******' 
                        clearable 
                       
                    />
                </Form.Item>
            </Form>
        </AutoCenter>
    </>
)

    return(
        <>
            {Login}
        </>
    )
}

export default Login;