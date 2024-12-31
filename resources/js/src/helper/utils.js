import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


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
     token:data?.token
 }))
}


export function _debounce(cb,delay){
  let timer

  return function(...args){
    clearTimeout(timer)
    timer = setTimeout(()=>cb(args),delay)
  }
}