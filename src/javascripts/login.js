class Login {
    constructor() {
        this.input = $('.zhanghao')
        this.span = $('.zhanghaospan')
        this.inputs = $('.mima')
        this.spans = $('.mimaspan')
        var userlock = true;
        var passlock = true;
        this.btn = $('.btn')

    }

    init() {

        this.input.on('blur', () => {
            if ($('.zhanghao').val() == '') {
                var userlock = false;
                $('.zhanghaospan').html('请输入用户名').css('color', 'red');
                $('.zhanghaospan').html('请输入用户名').css('font-size', '12px');
            }
            else {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/JS1912/youyiku/php/login.php',
                    data: {
                        username: this.input.val()

                    }
                }).done(function (result) {
                    if (!result) {

                        $('.zhanghaospan').html('√').css('color', 'black')

                        var userlock = true;
                    } else {
                        $('.zhanghaospan').html('用户名已经存在').css('color', 'red');
                        $('.zhanghaospan').html('用户名已经存在').css('font-size', '12px');

                        var userlock = false;;
                    }
                })

            }




        })


        this.inputs.on('blur', () => {
            if ($('.mima').val() == '') {
                var userlock = false;
                $('.mimaspan').html('请输入密码').css('color', 'red');
                $('.mimaspan').html('请输入密码').css('font-size', '12px');
            }
            else {
                $('.mimaspan').html('');
                var userlock = true;
            }
        })



        this.btn.on('submit', () => {


            if ($('.zhanghao').val() == '') {
                var userlock = false;
                $('.zhanghaospan').html('请输入用户名').css('color', 'red');
                $('.zhanghaospan').html('请输入用户名').css('font-size', '12px');
            }
            else {
                $('.zhanghaospan').html('');
                var userlock = true;
            }

            if ($('.mima').val() == '') {
                var userlock = false;
                $('.mimaspan').html('请输入密码').css('color', 'red');
                $('.mimaspan').html('请输入密码').css('font-size', '12px');
            }
            else {
                $('.mimaspan').html('');
                var userlock = true;
            }

            if (!userlock || !passlock) {

                return false;
            }



        })
    }
}
export {
    Login
}
