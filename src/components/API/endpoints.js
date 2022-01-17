export const BASE_URL = "http://45.76.123.59:5020/api";

export default {
    USER_LOGIN:"/OnlineUser/OnlineUserLogin",
    GET_PRODUCT_BYID_QUOTA:"/Product/GetProductByCustomerIdWithQuota",
    GET_ALLSHOW_PRODUCTS:"/ProductForShowing/GetAllShowingProducts",

    GET_ORDER_BY_ID:'/SalesOrder/GetOrderById',
    CREATE_ORDER:'/OrderFromCustomer/AddOrders',

//---------------------------------------------------------------------------------------------
    SALES_ORDER_ADDORDER:'/SalesOrder/AddOrder',
    SALES_ORDER_GETALL_ORDER:'/SalesOrder/GetAllOrder', // ?start=2021/09/23&end=2021/12/24
    GET_PRODUCT_OPTION_BYID:'/ProductOption/GetProductOptionById', //?id=1
    GET_QUOTATION_CUSTOMERID:'/Quotation/GetQuotationByCustomerId',//?id=115&draft=0
    GET_PRODUCT_BYID:'/Product/GetProductById',//?id=269
    GET_EXTRAADDRESS:'/ExtraAddress/GetAllExtraAddress',//?customerId=115
    GET_CUSTOMER_BYID:"/Customer/GetCustomerById",//?id=115"

    GET_ALL_CUSTOMERS:"/Customer/GetAllCustomer",
    Get_DELIVERYMethod:'/DeliveryMethod/GetAllDeliveryMethod',
    
}