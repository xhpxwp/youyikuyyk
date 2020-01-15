! function ($) {
    class Fdj {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('#spic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.bpic = $('#bpic');
            this.left = $('#left');
            this.right = $('#right');
            this.ulmove = $('#list ul');
            this.list = $('#list ul li');
        }
        init() {
            //1.鼠标移入移出显示隐藏小放和大放。
            let _this = this;
            this.spic.hover(() => {
                $('#sf,#bf').css('visibility', 'visible');

                //3.求小放的尺寸和比例
                this.sf.css({
                    width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
                    height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
                });
                //求比例
                this.bili = this.bpic.outerWidth() / this.spic.outerWidth();



                //2.鼠标在小图中移动，小放跟随鼠标
                this.spic.on('mousemove', (e) => {
                    let $l = e.pageX - this.wrap.offset().left - this.sf.width() / 2;
                    let $t = e.pageY - this.wrap.offset().top - this.sf.height() / 2;
                    if ($l < 0) {
                        $l = 0;
                    } else if ($l >= this.spic.outerWidth() - this.sf.outerWidth()) {
                        $l = this.spic.outerWidth() - this.sf.outerWidth() - 2;
                    }

                    if ($t < 0) {
                        $t = 0;
                    } else if ($t >= this.spic.outerHeight() - this.sf.outerHeight()) {
                        $t = this.spic.outerHeight() - this.sf.outerHeight() - 2;
                    }

                    this.sf.css({
                        left: $l,
                        top: $t
                    });

                    //大图进行赋值
                    this.bpic.css({
                        left: -$l * this.bili,
                        top: -$t * this.bili
                    });
                });
            }, () => {
                $('#sf,#bf').css('visibility', 'hidden');
            });


            //4.点击对应的li切换缩放的图片
            //#list ul li:委托的元素
            //$(this):委托的元素。
            this.ulmove.on('click', 'li', function () {
                let $imgurl = $(this).find('img').attr('src');
                _this.spic.find('img').attr('src', $imgurl);
                _this.bpic.attr('src', $imgurl);
            });


            //5.点击左右箭头，进行图片运动
            let $num = 6; //可视的li的长度。
            let $liwidth = this.list.eq(0).outerWidth(true); //1个li的宽度
            if (this.list.size() <= $num) {
                this.right.css('color', '#fff');
            }


            this.right.on('click', () => {
                if (this.list.length > $num) {
                    $num++;
                    this.left.css('color', '#333');
                    if ($num === this.list.length) {
                        this.right.css('color', '#fff');
                    }
                    this.ulmove.animate({
                        left: -($num - 6) * $liwidth
                    });
                }

            });

            this.left.on('click', () => {
                if ($num > 6) {
                    $num--;
                    this.right.css('color', '#333');
                    if ($num === 6) {
                        this.left.css('color', '#fff');
                    }
                    this.ulmove.animate({
                        left: -($num - 6) * $liwidth
                    });
                }
            });
        }
    }

    new Fdj().init();
}(jQuery);