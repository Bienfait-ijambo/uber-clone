import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


import Swal from 'sweetalert2/dist/sweetalert2.js';

const toast = useToast()

export function showError(message) {
  toast.error(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true
  })
}

export function successMsg(message) {
  toast.success(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true
  })
}

// Note : in production use cookie 
export  function getUserData(){

  try {
    const userData=localStorage.getItem('userData');

    if(typeof userData!=='object'){
      const parseUserData=JSON.parse(userData)
      return parseUserData
    }
    
  } catch (error) {

    showError(error?.message)
    
  }

}


export function setUserData(data){
  localStorage.setItem('userData',JSON.stringify({
    user: data?.user,
     token:data?.token,
     driverStatus:data?.driverStatus
 }))
}


export function _debounce(cb,delay){
  let timer

  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(()=>cb(args),delay)
  }
}




export function promptUser(message) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    })
    .then((result) => {
      if (result.isConfirmed) {
        resolve(result.isConfirmed)
      }
      reject()
    })
  })
}







export function confirmDelation(message) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Are you sure?',
      text: typeof message === undefined ? 'do you want to delete this ' : message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    })
    .then((result) => {
      if (result.isConfirmed) {
        resolve(result.isConfirmed)
      }
      reject()
    })
  })
}













