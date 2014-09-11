// add/remove dynamic fields
var Carnival = {}
String.prototype.unescapeHtml = function () {
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild);
    return result;
}

Carnival.updateIndexForm = function(name, value){
  var form = $('.carnival-index-form').find('form')
  form.find('input[name='+name+']').val(value);
}

Carnival.submitIndexForm = function(){
  var form = $('.carnival-index-form').find('form')
  form.submit();
}

Carnival.updateIndexFormAndSubmit = function(name, value){
  Carnival.updateIndexForm(name, value);
  Carnival.submitIndexForm();
}

Carnival.sortColumn = function(column, direction){
  Carnival.updateIndexForm('sort_column', column);
  Carnival.updateIndexForm('sort_direction', direction);
  Carnival.submitIndexForm();
}

function removeFields(link) {
  $(link).prev("input[type=hidden]").val("1");
  $(link).closest(".fields").slideToggle("show");
}

function addFields(link, association, content) {
  var numItems = $('.fields').length
  var new_id = numItems
  var regexp = new RegExp("new_" + association, "g")
  $(link).parent().before(content.unescapeHtml().replace(regexp, new_id));
  formLoad();
  return false;
}

function openPopUp(url){
  $.colorbox({href:url, opacity:0.5, width:"90%"});
}

function markActive(){
  $('.dropdown_main_menu_sublevel a.actived').closest('.dropdown_main_menu_sublevel').show();
}

// page load functions

var pageLoad = function(){
  $('ul.menu').clone().appendTo('div.menu.short');


  $('.dropdown_main_menu_sublevel').hide(0);

  $('.menu.full .sublevel').click(function(){
    $(this).next().slideToggle(200)
    return false
  })

  $('.menu.short .sublevel').parent().mouseover(function(){
    $(this).children().next().fadeIn(0)
    return false
  })

  $('.menu.short .sublevel').parent().mouseleave(function(){
    $(this).children().next().fadeOut(0)
    return false
  })

  $('.dataTables_info').insertAfter('.dataTables_paginate');
  $(".chosen").chosen({no_results_text: "Nenhum resultado encontrado", disable_search_threshold: 5});
  $(".popup").click(function(e){
    e.preventDefault()
    var url = $(this).attr('href')
    abrirPopUp(url)
  })

  markActive()

  $('div.menu.short').show(0);
  $('div.menu.short .dropdown_main_menu_sublevel').hide();
  $('#content').toggleClass('menu-opened');
  $('.short ul.dropdown_main_menu li ul li a.actived').parent().parent().parent().addClass('active');
  $('.full ul.dropdown_main_menu li ul li a.actived').parent().parent().parent().addClass('active');

  if($('ul.menu li.active a').html())
    $('#header').append("<h1>"+$('ul.menu li.active a').html()+" &raquo; "+$('ul.menu a.actived').html()+"</h1>")

  $('.full ul.dropdown_main_menu li:has(ul)').each(function( index ) {
    $('.short ul.dropdown_main_menu li:has(ul) > ul').eq(index).prepend('<h1>'+$('.full ul.dropdown_main_menu li:has(ul) > a').eq(index).html()+'</h1>')
  });

  var $lefty = $('div.menu.full');
  $lefty.animate({
    marginLeft: '-20%'
  }, 100);

  $('.minify').on("click", function(){
    var $lefty = $('div.menu.full');
    $lefty.animate({
      marginLeft: parseInt($lefty.css('margin-left'),10) == 0 ?
       -$lefty.outerWidth()-2:
        0
    }, 100);
    setTimeout("$('div.menu.short').fadeToggle(100)", 0)
    setTimeout("$('#content').toggleClass('menu-opened')", 0)
  })
};

// form load functions

function setupDateFields(){
  var dateOptions = {
    format: 'Y/m/d',
    mask: true,
    timepicker: false
  };
  var dateTimeOptions = $.extend({}, dateOptions, { timepicker: true, format: 'Y/m/d H:i'})

  $(".datepicker").datetimepicker(dateOptions);
  $(".datetimepicker").datetimepicker(dateTimeOptions);
}

var formLoad = function(){
  setupDateFields();
  $('select').chosen();
  $(".chosen-container").css({width:$(".chosen-container").parent().css("width")})
  $('input.previewable').change(function() {
    var that = $( this );
    var reader = new FileReader();
    var img = $(this).next('img.previewable');

    reader.onload = function(e) {
      var val = e.target.result;
      img.attr('src', val);
    }

    if (this.files && this.files[0]) {
      reader.readAsDataURL(this.files[0]);
    } else {
      img.attr('src', '');
    }
  });
  $('.chosen').chosen();
  $(".chosen-container").css({width:$(".chosen-container").parent().css("width")})
  selectRemote();
}

$(document).ready(function(){
  pageLoad();
  formLoad();
});
