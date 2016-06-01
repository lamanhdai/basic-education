$(function () {
  $(document).on("click", "#sort li", function(e){
    e.preventDefault();

    var $this = $(this);
    var name = $(this).attr('id');
    var listname = '#' + name + 'List';

    if($this.hasClass('active')){
        return false;
      }
    $('#sort .active').removeClass('active');
    $this.addClass('active');
    $('.newsList').hide();
    $('.' + name).fadeIn('slow');
  });
});