class Cartlist {
    constructor() {
        this.itemlist = $('.item-list');
    }
    init() {
        //1.获取本地存储
        if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
         
            let csid = localStorage.getItem('cartsid').split(','); //sid
            let cnum = localStorage.getItem('cartnum').split(','); //数量
         
            for (let i = 0; i < csid.length; i++) {
                this.render(csid[i], cnum[i]);
               
            }
        }

        //调用全选方法。
        this.allselect();
        //值的改变
        this.valuechange();
        //删除调用
        this.delgoods();
    }
    //2.渲染
    render(sid, num) { //sid:当前渲染的购物车列表的编号，num:数量。

        $.ajax({
            url: 'http://localhost/JS1912/youyiku/php/dressdata.php',
            dataType: 'json'
        }).done((data) => {
            let $strhtml=''
            $.each(data, (index, value) => {
                if (sid == value.sid) {
                  $strhtml+=`  <div class="goods-item goods-item-sele" >
                  <div class="goods-info">
                      <div class="cell b-checkbox">
                          <div class="cart-checkbox">
                              <input type="checkbox" checked="" name="" id="" value="" />
                              <span class="line-circle"></span>
                          </div>
                      </div>
                      <div class="cell b-goods">
                          <div class="goods-name">
                              <div class="goods-pic">
                                  <a href=""><img src="${value.ul}" alt="" /></a>
                              </div>
                              <div class="goods-msg">
                                  <div class="goods-d-info">
                                      <a href="">${value.title}</a>
                                  </div>
                              </div>
                          </div>  
                      </div>

                      <div class="cell b-price">
                          <strong>${value.price}</strong>
                      </div>
                      <div class="cell b-quantity">
                          <div class="quantity-form">
                              <a class="quantity-down" href="javascript:void(0)">-</a>
                              <input type="text" value="${num}" />
                              <a class="quantity-add" href="javascript:void(0)">+</a>
                          </div>
                      </div>
                      <div class="cell b-sum">
                          <strong>${(value.price*num).toFixed(2)}</strong>
                      </div>
                      <div class="cell b-action">
                          <a href="javascript:void(0)">删除</a>
                      </div>
                  </div>
              </div>`
              $('.item-list').append($strhtml)
         
                    
                    this.allprice();
                }
            });
        });
    }

    //计算总价
    allprice() {
        let $goodsnum = 0; //商品的件数
        let $goodsprice = 0; //商品的总价
        $('.goods-item').each(function (index, element) {
            if ($(element).find('input:checkbox').is(':checked')) {
                $goodsnum += parseInt($(element).find('.quantity-form input').val());
                $goodsprice += parseFloat($(element).find('.b-sum strong').html());
            }
        });
        $('.amount-sum em').html($goodsnum);
        $('.totalprice').html('￥' + $goodsprice);
    }

    //全选
    allselect() {
        $('.allsel').on('change', () => {
            $('.goods-item').find('input:checkbox').prop('checked', $('.allsel').prop('checked'));
            this.allprice(); //求和
           
        });
        let $checkinput = $('.goods-item').find('input:checkbox'); 
        $('.item-list').on('click', $checkinput, () => {
            let $inputs = $('.goods-item').find('input:checkbox');
            if ($('.goods-item').find('input:checked').length === $inputs.length) {
                $('.allsel').prop('checked', true);
               
            } else {
                $('.allsel').prop('checked', false);
               
            }
            this.allprice(); 
        });
    }
    //文本框值的改变
    valuechange() {
        //++
        $('.quantity-add').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            $(this).prev('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this))); //求单价
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num); //存储数量
        });
        //--
        $('.quantity-down').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;
            }
            $(this).next('input').val($num);
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $num);
        });
        //直接输入
        $('.quantity-form input').on('input', function () {
            let $reg = /^\d+$/;
            let $inputvlaue = $(this).val();
            if ($reg.test($(this).val())) {
                if ($inputvlaue < 1) {
                    $(this).val(1)
                } else {
                    $(this).val($(this).val())
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.goods-info').find('.b-sum strong').html(singleprice($(this)));
            local($(this).parents('.goods-info').find('.goods-pic img').attr('sid'), $(this).val());
        });
        //封装计算单价
        function singleprice(obj) {
            let $dj = parseFloat(obj.parents('.goods-info').find('.b-price strong').html());
            let $count = parseFloat(obj.parents('.goods-info').find('.quantity-form input').val());
            return $dj * $count.toFixed(2);
        }

        //改变数量--重新本地存储。
        //通过sid获取数量的位置，将当前改变的值存放到对应的位置。
        function local(sid, value) { //sid:当前的索引   value：数量
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                let arrsid = localStorage.getItem('cartsid').split(',');
                let arrnum = localStorage.getItem('cartnum').split(',');
                let index = $.inArray(sid, arrsid); //sid在数组中的位置索引。
                arrnum[index] = value;
                localStorage.setItem('cartnum', arrnum.toString());
            }
        }
    }
    //删除
    delgoods() {
        let arrsid = [];
        let arrnum = [];
        let _this = this;

        function getstorage() {
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                arrsid = localStorage.getItem('cartsid').split(',');
                arrnum = localStorage.getItem('cartnum').split(',');
            }
        }


        //删除本地存储数组项的值。确定删除的索引。
        function delstorage(sid, arrsid) { //sid:删除的索引，sidarr:数组   delstorage(3,[2,3,4,5])
            let $index = -1;
            $.each(arrsid, function (index, value) {
                if (sid === value) {
                    $index = index; //接收索引值。  
                }
            });

            arrsid.splice($index, 1);
            arrnum.splice($index, 1);
            localStorage.setItem('cartsid', arrsid.toString());
            localStorage.setItem('cartnum', arrnum.toString());
        }

        //单条删除
        $('.item-list').on('click', '.b-action a', function () {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $(this).parents('.goods-item').remove();
            }
            delstorage($(this).parents('goods-item').find('.goods-pic img').attr('sid'), arrsid);
            _this.allprice();
        });


        //删除选中
        $('.operation a').on('click', function () {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $('.goods-item:visible').each(function (index, element) {
                    if ($(this).find('input:checkbox').is(':checked')) {
                        $(this).remove();
                    }
                    delstorage($(this).find('.goods-pic img').attr('sid'), arrsid);
                });
            }
            _this.allprice();
        });
    }



}




export {
    Cartlist
}