$(document).ready(function() {

 if (typeof FileActions !== 'undefined') {
  FileActions.register('text/html', 'EditDoc',OC.PERMISSION_READ, function(){return OC.imagePath('core','actions/play')}, function(filename) {
   if(FileActions.getCurrentMimeType() == 'text/html') {
    startEditDoc($('#dir').val(),filename);
   };
  });

  FileActions.register('text/html', 'EditHTML', OC.PERMISSION_READ, '', function(filename) {
   if(FileActions.getCurrentMimeType() == 'text/html') {
    startEditDoc($('#dir').val(),filename);
   }
  });
  FileActions.setDefault('text/html','EditHTML');
  } 


 //NEW FILE MENU ITEM
 if($('div#new>ul>li').length > 0) {
  getMimeIcon('text/html', function(icon) {
   $('<li><p>EditDoc file</p></li>')
   .attr('id', 'newEditDocLi')
   .appendTo('div#new>ul')
   .css('background-image', 'url(' + icon + ')')
   .data('type', 'text')
   .children('p')
   .click(function() {
    $(this).hide();
    $('<input>').appendTo('#newEditDocLi').focus().change(function() {
     filename=$(this).val().replace(/(\..{3})?$/, '.html');
     startEditDoc($('#dir').val(),filename);
    }).blur(function() {
     $(this).remove();
     $('#newEditDocLi>p').show();
    });
   });
  });
 }

});

function startEditDoc(dir,filename){
 //Start Editor
 $("#editor").hide();
 $('#content table').hide();
 $("#controls").hide();
 var editor = OC.linkTo('editdoc', 'index.php')+'?dir='+dir+'&filename='+filename;
 $("#content").html('<iframe style="width:100%;height:95%;" src="'+editor+'" />');
}

