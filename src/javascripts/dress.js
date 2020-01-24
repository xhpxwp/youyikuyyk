//数据接口：http://localhost/JS1912/youyiku/php/dressdata.php

class Render{
    constructor(){
         this.dresslist=$('#dresslist')
    }

    init(){
        $.ajax({
        url:'http://localhost/JS1912/youyiku/php/dressdata.php',
        dataType:'json'
        }).done((data) => {
          let $strhtml='<p>新品上市</p>';
          $strhtml+='<ul>';
          $.each(data, function(index,value){
         
            $strhtml+=`<li>
            <a href="datails.html?sid=${value.sid}">
            <img src="${value.ul}">
            <p>${value.title}</p>
            <p>￥${value.price}</p>
            </a>
            </li>  `
          });
           
        
         
         
              $strhtml+='</ul>'
              this.dresslist.html($strhtml)
            });
         

        
    }
}


export{
    Render
}

// $.each(data, function(attr,value){
//     $.each(value, function(index,v){
//     $strhtml+=`<li>
//     <a href="datails.html?sid=${v.sid}">
//     <img src="${v.ul}">
//     <p>${v.title}</p>
//     <p>￥${v.price}</p>
//     </a>
//     </li>  `})
