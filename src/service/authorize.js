export const authenticate = (res , next) =>{
    if(window !== "undefined"){
        sessionStorage.setItem("token" , JSON.stringify(res.data.token));
        sessionStorage.setItem("username" , JSON.stringify(res.data.username));
        if(res.data.admin_token){
            sessionStorage.setItem("admin_token" , JSON.stringify(res.data.admin_token));
        }
    }
    next();
}

export const getToken = ()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"));
        }
    }
}

export const logout = (next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("admin_token");
    }
    next();
}

export const getUser = ()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"));
        }
    }
}

export const getAdmin = ()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("admin_token")){
            return JSON.parse(sessionStorage.getItem("admin_token"));
        }
    }
}