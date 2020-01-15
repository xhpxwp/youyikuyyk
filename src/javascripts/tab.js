class tabs{
    constructor(){

    }

    init(){
        $('#rmsp ul li').on('click', function () {
            $(this)
                .addClass('active')
                .siblings('')
                .removeClass('active');
            $('#rmsp div')
            
                .eq($(this).index())
                .show()
                .siblings('#rmsp div')
                .hide();
        });
        
        $('#rxph ul li').on('click', function () {
            $(this)
                .addClass('active')
                .siblings('')
                .removeClass('active');
            $('#rxph div ')
                .eq($(this).index())
                .show()
                .siblings(' #rxph div ')
                .hide();
        });
        
        $('#rqbd ul li').on('click', function () {
          
            $('#rqbd div')
            
                .eq($(this).index())
                .show()
                .siblings('#rqbd div')
                .hide();
        });
    }
}
  new tabs().init()
