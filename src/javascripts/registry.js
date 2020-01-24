class Registry{
    constructor(){
      
           
           this.btns = $('.btns')
    }
    init(){
        $('.btns').on('click', function () {
            $.ajax({
                type: 'post',
                url: 'http://localhost/JS1912/youyiku/php/registry.php',
                data: {
                    users: $('.usernames').val(),
                    passs:  hex_sha1($('.passwords').val())
                }
            }).done(function (result) {
                if (result) { //匹配成功
                    location.href = 'index1.html';
                  
                } else { //匹配失败
                  
                    $('.passwords').val('');
                    alert('用户名或者密码错误');
                }
            });
        });
    }
}

export{
    Registry
}