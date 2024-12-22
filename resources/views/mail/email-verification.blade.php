<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uber-Clone</title>
</head>
<body>
  
    <div class="container" >
	<div class="card card-body" style="margin-left: 40px;margin-left: 50px;">
	<div align="center">
		<h1>UBER CLONE</h1>
	</div>
		<h3>E-mail verification.</h3>
		<p>Hello, {{$user->name}} <br/>  <br/>
        we have sent to you this email to check if this Email : <a href="#">{{$user->email}}</a> your provide is a valid one; 
        Enter this Code :{{$user->otp_code}}

	 
	</div>

</div>

</body>
</html>


