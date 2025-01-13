import { ADMIN_ROLE } from "../constants/roles";

export function hideEditButton(role) {
    return role === ADMIN_ROLE ? false : true;
}
