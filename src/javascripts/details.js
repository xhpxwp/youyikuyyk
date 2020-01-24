
    class Details {
        
        constructor() {
            this.sid = location.search.substring(1).split('=')[1];
            this.wrap = $('.wrap');
            this.spic = $('#spic');
            this.sf = $('#sf');
            this.bf = $('#bf');
            this.bpic = $('#bpic');
            this.left = $('.left');
            this.right = $('.right');
            this.imglist = $('#imglist');
            this.list = $('#imglist li');
            this.wrapmiddle = $('.wrap-middle')
            this.count = $('#count');
           
        }
        init() {
            //这是渲染商品图片标题价格
            $.ajax({
                url: 'http://localhost/JS1912/youyiku/php/getsid.php',
                data: {
                    sid: this.sid
                },
                dataType: 'json'
            }).done((objdata) => {
                $('#spic img').attr('src', objdata.ul);
                $('#bpic ').attr('src', objdata.ul);
                $('.loadtitle').html(objdata.title);
                $('.loadpcp').html(objdata.price);
    
                let piclist = objdata.urls.split(',');
                let $strhtml = '';
                $.each(piclist, function (index, value) {
                    $strhtml += `<li><img src="${value}" /></li>`;
                });
    
                this.imglist.html($strhtml)
               
    
            })
            //执行添加购物车操作
            this.addcart()
        
           //这是放大镜和图片列表
            let _this = this;
           
            this.spic.hover(() => {
                $('#sf,#bf').css('visibility', 'visible');

              
                this.sf.css({
                    width: this.spic.outerWidth() * this.bf.outerWidth() / this.bpic.outerWidth(),
              
                 
                    height: this.spic.outerHeight() * this.bf.outerHeight() / this.bpic.outerHeight()
                });
               
                this.bili = this.bpic.outerWidth() / this.spic.outerWidth();



                
                this.spic.on('mousemove', (e) => {
                    let $l = e.pageX - this.wrapmiddle.offset().left - this.sf.width() / 2;
                    let $t = e.pageY - this.wrapmiddle.offset().top - this.sf.height() / 2;
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

                   
                    this.bpic.css({
                        left: -$l * this.bili,
                        top: -$t * this.bili
                    });
                });
            }, () => {
                $('#sf,#bf').css('visibility', 'hidden');
            });


        
            this.imglist.on('click', 'li', function () {
                let $imgurl = $(this).find('img').attr('src');
                _this.spic.find('img').attr('src', $imgurl);
                _this.bpic.attr('src', $imgurl);
            });


            
            let $num = 4; 
            let $liheight = this.list.eq(0).outerHeight(true); 
            if (this.list.size() <= $num) {
              
              
                this.right.css('display', 'none');
            }


            this.right.on('click', () => {
                
                if (this.list.size() > $num) {
                    $num++;
                    this.left.css('display', 'block');
                    if ($num === this.list.length) {
                        this.right.css('display', 'none');
                    }
                    this.imglist.animate({
                        top: -($num - 4) * $liheight
                    });
                }

            });

            this.left.on('click', () => {
                if ($num > 4) {
                    $num--;
                    this.right.css('display', 'block');
                    if ($num === 4) {
                        this.left.css('display', 'none');
                    }
                    this.imglist.animate({
                        top: -($num - 4) * $liheight
                    });
                }
            });
        }   
         
        //添加购物车操作
        addcart() {
            let goodsnum = []; //商品的数量
            let goodsid = []; //商品的编号
            //cartnum  cartsid:本地存储的key值
            function getcookie() {
                if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                    goodsnum = localStorage.getItem('cartnum').split(',');
                    goodsid = localStorage.getItem('cartsid').split(',');
                }
            }
            $('.p-btn a').on('click', () => {
                getcookie();
                if ($.inArray(this.sid, goodsid) === -1) { //第一次点击,将sid传入，取到数量直接传入
                    goodsid.push(this.sid);
                    localStorage.setItem('cartsid', goodsid); //存入sid
                    goodsnum.push(this.count.val());
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                } else {
                    let index = $.inArray(this.sid, goodsid); //当前sid在数组中对应的位置
                    let newnum = parseInt(goodsnum[index]) + parseInt(this.count.val()); //原来存储的值+当前的值
                    goodsnum[index] = newnum; //新的数量
                    localStorage.setItem('cartnum', goodsnum); //存入数量
                }
            });
        }
    
        }

        // 接口地址：http://localhost/JS1912/youyiku/php/getsid.php
       

    

    
   export{
       Details
   }

