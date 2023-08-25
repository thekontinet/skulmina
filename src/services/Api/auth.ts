// import request from "@/services/Api/base";

export const login = async (data: { email: string; password: string }) => {
    console.log('Login in with', data);
    localStorage.setItem('token', 'test-token');
    return Promise.resolve()
}

export const logout = async () => {
    console.log('Login out');
    localStorage.removeItem('token');
    return Promise.resolve()
}
                

export const getAuthUser = async () => {
    console.log('Fetching user');
    if(!localStorage.getItem('token')) return Promise.reject()
    return Promise.resolve({name: 'test name', email: 'test@email.com'})
}


    
