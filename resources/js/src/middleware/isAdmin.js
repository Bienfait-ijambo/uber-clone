import { ADMIN_ROLE } from "../constants/roles"
import { getUserData } from "../helper/utils"

export function isAdmin(to, from,next){
    const userData=getUserData()
    if(userData?.user?.role===ADMIN_ROLE){
        next()
    }else{
        return false
    }


}
