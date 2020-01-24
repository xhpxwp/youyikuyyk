<?php

include "conn.php";

if(isset($_POST['username'])){
    $user=$_POST['username'];
    $result=$conn->query("select * from usertable where username='$user'");//如果存在结果，注册的用户名存在。
    if($result->fetch_assoc()){//存在
        echo true;//显示1
    }else{
        echo false;//空隙
    }
}


if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $password=($_POST['password']);
  

    $conn->query("insert usertable values(null,'$username','$password',NOW()) ");
    header('location:http://localhost/JS1912/youyiku/dist/registry.html');//php页面的跳转。
}