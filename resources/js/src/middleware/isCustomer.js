

import { ADMIN_ROLE,CUSTOMER_ROLE } from "../constants/roles"
import { getUserData } from "../helper/utils"

export function isCustomer(to, from,next){
    const userData=getUserData()
    if(userData?.user?.role===CUSTOMER_ROLE){
        next()
    }else{
        return false
    }


}
