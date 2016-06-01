$(function(){

  $menuSelect = $('#category_menu .select');
  $listCam = $('#category_content');

  // メインカテゴリクリック時
  $menuSelect.find('li').find('a').click(function(event){
    event.preventDefault();

    if( !$(this).parent().hasClass('active') ){

      // メインカテゴリ全てOFF
      $menuSelect.find('li').each(function(i){

        var src = $(this).find('a');
        $(this).removeClass('active');
      });

      // メインカテゴリのクリックしたものをON
      var src = $(this).find('a');
      $(this).parent().addClass('active');


      // classで絞込み
      if( $(this).parent().hasClass('all_cat') ){

        // 全商品表示
        $listCam.find('.section').show();

      } else {

        var id = $(this).parent().attr('class').replace(' active', '').replace('_cat', '');
        $listCam.find('.section').each(function(i){
          if( $(this).hasClass(id) ){
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      }
    }

    return false;
  });

});
