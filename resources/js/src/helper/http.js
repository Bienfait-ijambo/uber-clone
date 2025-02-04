import { App } from "../api/api";
import { getUserData } from "./utils";

function getHeaders(){
    const headers= {
        Accept: "application/json",
        "content-type": "application/json",
    }

    const userData=getUserData()

    if(typeof headers?.authorization!=='undefined'){
        return headers
    }else{
        headers['authorization']='Bearer '+userData?.token
        return headers
    }
}

export function postData(endpoint, input) {
    const headers=getHeaders()
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apiBaseUrl + endpoint, {
                headers:headers,
                method: "POST",
                body: JSON.stringify(input),
            });

            const data = await res.json();
            handleHttpError(data,resolve,reject)
        } catch (error) {
           
            reject(error);
        }
    });
}

export function putData(endpoint, input) {
    const headers=getHeaders()
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apiBaseUrl + endpoint, {
                headers:headers,
                method: "PUT",
                body: JSON.stringify(input),
            });

            const data = await res.json();
            handleHttpError(data,resolve,reject)
        } catch (error) {
            reject(error);
        }
    });
}


export function deleteData(endpoint, input) {
    const headers=getHeaders()
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apiBaseUrl + endpoint, {
                headers:headers,
                method: "DELETE",
                body: JSON.stringify(input),
            });

            const data = await res.json();
            handleHttpError(data,resolve,reject)
        } catch (error) {
            reject(error);
        }
    });
}


export function getData(endpoint) {
    const headers=getHeaders()

    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(App.apiBaseUrl + endpoint, {
                  headers: headers,
                method: "GET",
            });

            const data = await res.json();

            handleHttpError(data,resolve,reject)
        } catch (error) {
            reject(error);
        }
    });
}




export function handleHttpError(data,resolve,reject){
    if (typeof data?.errors !== "undefined") {
        const errors = Array.isArray(data?.errors)
            ? data?.errors
            : Object.values(data?.errors);
        reject(errors);
    } 
    else if(data?.message==='Unauthenticated.'){
        window.location.href='/app/login'
    }
    else {
        resolve(data);
    }
}

