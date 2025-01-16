import { DRIVER_ROLE } from "../constants/roles";
import { getUserData } from "../helper/utils";

export function hideBookButton() {
    const userData=getUserData()
    const role=userData?.user?.role
    return role === DRIVER_ROLE ? false : true;
}
