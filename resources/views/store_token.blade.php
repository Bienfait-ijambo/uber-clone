<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<input type="hidden" id="token" value="{{$accessToken}}">
<input type="hidden" id="driverStatus" value="{{$driverStatus}}">
<input type="hidden" id="user" value="{{$user}}">
<input type="hidden" id="isLogged" value="true">



<script>
document.addEventListener('DOMContentLoaded', function(){
    const token=document.getElementById('token');
    const driverStatus=document.getElementById('driverStatus');
    const user=document.getElementById('user');

const userData=JSON.stringify({
        token:token.value,
        driverStatus:driverStatus.value,
        user:JSON.parse(user.value),
        isLogged:isLogged.value
    })

    localStorage.setItem('userData', userData);

    window.location.href='/app/welcome'
    
})



</script>
    
</body>
</html>