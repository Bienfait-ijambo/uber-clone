


 const AVAILABLE_STATUS=1;
const BUSY_STATUS=0;

const AVAILABLE_STATUS_NAME='AVAILABLE';
const BUSY_STATUS_NAME='BUSY';


export function getDriverStatusName(status){

    if(AVAILABLE_STATUS===status){
        return AVAILABLE_STATUS_NAME
    }

    if(BUSY_STATUS===status){
        return BUSY_STATUS_NAME
    }

}