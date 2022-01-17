import React,{useContext,useState,createContext} from 'react'

const UserInfoContext = createContext();
const SetUserInfoContext = createContext();

export const useUserInfo = () =>{
    return useContext(UserInfoContext)
};

export const useSetUserInfo = () =>{
    return useContext(SetUserInfoContext)
};

export const UserInfoProvider = ({children}) =>{

    const [User,setUser] = useState(null);

    const setUserInfo = (data) =>{
        setUser(data);
    }

    return(
        <UserInfoContext.Provider value ={User}>
            <SetUserInfoContext.Provider value ={setUserInfo}>
                {children}
            </SetUserInfoContext.Provider>
        </UserInfoContext.Provider>
    )
}