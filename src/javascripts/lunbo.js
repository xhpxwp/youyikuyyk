class youyiku {
    constructor() {
        this.lunbo = $('#lunbo');
        this.ullist = $(' .lunboul');//运动的ul
        this.btnli = $('.button ul li');//8个小按钮
        this.pics = $('.lunboul li ');//8张图片
        this.nextbutton = $('.next-button');
        this.prevbutton = $('.prev-button');
        this.index = 0;//存储索引。
        this.timer = null;
        this.flag=true;//标记。
    }
    // let lunbo = document.querySelector('#lunbo');
    // let ullist = document.querySelector(' .lunboul');//运动的ul
    // let btnli = document.querySelectorAll('.button ul li');//8个小按钮
    // let pics = document.querySelectorAll('.lunboul li ');//8张图片
    // let nextbutton = document.querySelector('.next-button');
    // let prevbutton = document.querySelector('.prev-button');
    // let index = 0;//存储索引。
    // let timer = null;
    // let flag=true;//标记。
    init() {
        //1.改变布局 
        let firstpic=$(this.pics)[0].clone(true,true)
        // let firstpic=$this.pics[0].cloneNode(true)
     let lastpic= $(this.pics[this.pics.length-1]).clone(true,true)
     $(' .lunboul').append($firstpic);
     $(' .lunboul').insertBefore($lastpic, $(this.pics[0]));

        //2.ul赋值宽度和定位--运动的盒子
        this.pics = $('.lunboul li ');//10张图片,结构改变了
     
        this.liwidth = $(this.pics[0].offsetWidth);
        this.ullist.style.width = $(this.pics.length)* $(this.liwidth + 'px';//设置宽度
        this.ullist.style.left = -this.liwidth + 'px';//设置位置

        //3.按钮添加事件
        $('btnli').on('click', function(){
            $('this')
            addClass('active')


        })
        for (let i = 0; i < this.btnli.length; i++) {
            this.btnli[i].onclick = () => {
                this.index = i;//存储索引
                this.tabswitch();
                this.btnli[this.index].className = 'active';//给当前点击的按钮添加背景
            }
        }

        //4.显示隐藏左右箭头
        this.lunbo.onmouseover = () => {
            this.prevbutton.style.display = 'block';
            this.nextbutton.style.display = 'block';
            clearInterval(this.timer);
        };

        this.lunbo.onmouseout = () => {
            this.prevbutton.style.display = 'block';
            this.nextbutton.style.display = 'block';
            this.autoplay();
        };

        //5.点击左右箭头
        this.nextbutton.onclick = () => {
            if(this.flag){//保证bufferMove()必须完成。
                this.flag=false;
                this.rightclick();
            }
            
        }

        this.prevbutton.onclick = () => {
            if(this.flag){//保证bufferMove()必须完成。
                this.flag=false;
                this.leftclick();
            }
            
        }

        //6.调用自动播放
        this.autoplay();

    }

    //切换过程
    tabswitch() {
        for (let j = 0; j < this.btnli.length; j++) {
            this.btnli[j].className = '';
        }

        bufferMove(this.ullist, { left: -this.liwidth * (this.index + 1) }, () => {
            //右箭头的判断
            if (this.index > this.btnli.length - 1) {
                this.ullist.style.left = -this.liwidth + 'px';//重置位置
                this.index = 0;//重置索引
            }
            //左箭头的判断
            if (this.index < 0) {
                this.ullist.style.left = -(this.liwidth*this.btnli.length) + 'px';
                this.index = this.btnli.length - 1;
            }
            this.flag=true;
        });
    }

    //箭头切换
    rightclick() {
        this.index++;
        this.tabswitch();
        if (this.index > this.btnli.length - 1) {
            this.btnli[0].className = 'active';
        } else {
            this.btnli[this.index].className = 'active';
        }
    }

    leftclick() {
        this.index--;
        this.tabswitch();
        if (this.index < 0 ) {
            this.btnli[this.btnli.length-1].className = 'active';
        } else {
            this.btnli[this.index].className = 'active';
        }
    }


    autoplay(){
        this.timer=setInterval(()=>{
           
            this.nextbutton.onclick();
        },2000);
    }


}

new youyiku().init();
