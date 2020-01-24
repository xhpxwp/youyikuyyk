<?php

include "conn.php";

if(isset($_POST['users']) && isset($_POST['passs'])){
    $users=$_POST['user'];
    $passs=$_POST['pass'];

    $result=$conn->query("select * from usertable where username='$users' and password='$passs' ");

    if($result->fetch_assoc()){//匹配
        echo true;
    }else{//不匹配
        echo false;
    }

}