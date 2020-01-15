class louti {

    constructor() {



    }
    init() {


        //这是楼梯悬浮
        $(window).on('scroll', function () {
            let $top = $(window).scrollTop();

            if ($top > 200) {


                $('#louticopy').stop(true).animate({

                    top: 0
                })
            } else
                $('#louticopy').stop(true).animate({
                    top: -100
                })

        })

        //  这是楼梯点击滚动到对应界面

        $('#louti ul li').on('click', function () {

            let $loucengtop = $('.louceng').eq($(this).index()).offset().top

      

            $('html').animate({
                scrollTop: $loucengtop

            });
        })

        //  这是楼梯点击滚动到对应界面
        $('#louticopy ul li').on('click', function () {
            let $loucengtop = $('.louceng').eq($(this).index()).offset().top
            $('html').animate({
                scrollTop: $loucengtop
            });
        })

        $(window).on('scroll', function () {
            let $top = $(window).scrollTop();
            let $topbutton = $('#topbutton')
            if ($top > 500) {
           
                $('#topbutton').css('visibility', 'visible')
                $('#topbutton').css('position', 'fixed')
                $('#topbutton').css('top', '300px')
                $('#topbutton').on('click', function () {
                    $('html').animate({
                        scrollTop: 0
                    });

                })
            }
            else{
                $('#topbutton').css('visibility', 'hidden')
            }
        })
    }




}
new louti().init()