/////////////////////////////////////
function showError() {
  $('#errorModal').modal('show');
  
  $('.moda.show form').fadeTo("fast", 1, function() {
      
    $(this).find('.button').prop('disabled', false);

  });

}

function resetForm(form) {
  console.log('in form reset');
  $(form).trigger("reset");
}


function hideErrors(form) {
  console.log('in form hide');
  $(form).find('span.file-error.error').removeClass("error");
  $(form).find('.input-fake.error').removeClass('error');
  $(form).find('label.error').removeClass('error');
  $(form).find('input.error').removeClass('error');

}

$("#freeSampleCta").on("click", function() {
  console.log('in freeSampleCta');
  var forms = $("#freeSampleModal").find('form');

  console.log(forms);

  $( forms ).each(function(  ) {
    console.log(this);
    hideErrors(this);
    resetForm(this);
  });
  
});

$("#consultationCta").on("click", function() {
  console.log('in consultationCta');
  var forms = $("#consultationModal").find('form');

  console.log(forms);

  $( forms ).each(function(  ) {
    console.log(this);
    hideErrors(this);
    resetForm(this);
  });
  
});

$("#docsCta").on("click", function() {
  console.log('in docsCta');
  var forms = $("#docsModal").find('form');

  console.log(forms);

  $( forms ).each(function(  ) {
    console.log(this);
    hideErrors(this);
    resetForm(this);
  });
  
});


$("#basePriceCta").on("click", function() {
  console.log('in basePrice');
  var forms = $("#basePriceModal").find('form');

  console.log(forms);

  $( forms ).each(function(  ) {
    console.log(this);
    hideErrors(this);
    resetForm(this);
  });
  
});

$("#consultationOtherCta").on("click", function() {
  console.log('in consultationOther');
  var forms = $("#consultationOtherModal").find('form');

  console.log(forms);

  $( forms ).each(function(  ) {
    console.log(this);
    hideErrors(this);
    resetForm(this);
  });
  
});


$('#errorModal .close').on("click", function(e) { 
  e.preventDefault();

  var openedModals = $('.modal.show');
  $(openedModals).each(function(  ) {

    $('form').trigger("reset");

    $( this ).modal('hide');
    
  });

  
  });

  

$('input[type="file"]').on("change", function(){ 
  $('form span.file-error').removeClass("error");
  $('.input-fake').removeClass('error');
});



function checkFile() {
  var file = document.getElementById("file").files[0];
  var ext = "не определилось";
    
  if (!file) 
    return 1;
  var parts = file.name.split('.');
  if (parts.length > 1) ext = parts.pop();

  console.log("Размер файла: " + file.size + " B", "Расширение: " + ext, "MIME тип: " + file.type);

  var isGoodFile;

  if(file.size > (10 * 1024 * 1024)) {
    isGoodFile = false;
  }
  else {
    // Проверяем тип               
    switch (file.type) {
      case 'application/pdf': 
          isGoodFile = true;
          break;

      case 'application/msword':
          isGoodFile = true;
          break;

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          isGoodFile = true;  
          break;      
          
      case 'application/rtf':
          isGoodFile = true;
          break;
          
      case 'text/richtext':
          isGoodFile = true;
          break;
          
      case 'application/x-rtf':
          isGoodFile = true; 
          break;

      case 'image/jpeg':
          isGoodFile = true;  
          break;

      case 'image/pjpeg':
          isGoodFile = true;   
          break;

      case 'image/png':
          isGoodFile = true; 
          break;
          

      case 'text/plain':
          isGoodFile = true;
          break; 
          
      case 'application/x-rar-compressed':
        isGoodFile = true;
          break;


      case 'application/octet-stream':
        isGoodFile = true;
          break;

      case 'application/zip':
        isGoodFile = true;
          break;

      case 'application/x-zip-compressed':
        isGoodFile = true;
          break;

      case 'multipart/x-zip':
        isGoodFile = true;
          break;
    
      default:
        isGoodFile = false;
    }

  }

    return isGoodFile;
}


//Validate phone and email
function validateForm(form, inputName) {
  //TODO: fadein\fadeout\buttons disabled
  var element_str = 'input[name=' + inputName + ']';
  var element_val = form.find(element_str).val();
  
  return element_val;
}

//////////////////////////////////////////////////
//Ajax answer handler 
function showResponse(messageType, messageText, modal, form) {
  if(messageType == 'success') {
    console.log("Данные отправлены \n" + messageText, messageType);

    //alert('message sent');
    location.href='sps.html';
    
  }
  else if(messageType == 'bad_type') {

    showError();
    console.log("Плохой тип файла \n" + messageText, messageType);

  }
  else if(messageType == 'bad_size') {
    console.log("Большой размер файла \n" + messageText, messageType);
    showError();
  }
  else {
    console.log("Не удалось отправить форму. \n" + messageText, messageType);
    showError();
    
  }


//   $(form).fadeTo("fast", 1, function() {
          
//     $(form).find('.button').prop('disabled', false);

//   });
  
  
}


//Ajax sender
function sendAjaxForm(form, modal, extraData) {
  console.log('send Ajax');

  $(form).fadeTo("fast", 0.15, function() {
      
    $(this).find('.button').prop('disabled', true);

  });
  
  console.log($(form).serialize());
  
  $.ajax({
    url:     "php/send.php", //url страницы 
    type:     "POST", //метод отправки
    data: $(form).serialize() + extraData,
    success: function(response) { //Данные отправлены успешно

      var messageText = response.message;
      var messageType = response.type;
      
      showResponse(messageType, messageText, modal, form);
      
      
    },
    error: function(response) { // Данные не отправлены
      /*** Вызываем окно ошибки */
      showResponse('error', response.message, modal, form);
        
    } 
  });
}





//Ajax uploader
function uploadAjax(form, modal) {

  //var file_doc = $('.inputfile').prop('files')[0];
  var file_input = form.find('.inputfile');
  var file_doc = file_input.prop('files')[0];

  console.log(file_doc);

  var form_data = new FormData();
  
  form_data.append('file', file_doc);

  //console.log(form_data);
  

  if(validateForm(form, 'phoneOrEmail')) {

    var userPhoneOrEmail = $(form).find('input#phoneOrEmail1').val();
    var companyName = $(form).find('input#companyName1').val();
    console.log('userPhoneOrEmail:  '+userPhoneOrEmail);
    console.log('companyName:  '+companyName);

    //form_data.append('options', 'three');
    form_data.append('user_contacts', userPhoneOrEmail);
    form_data.append('user_name', companyName);

    
      if(checkFile()) {
        $(form).fadeTo("fast", 0.15, function() {
          console.log('freezed by file');
        
          $(form).find('.button').prop('disabled', true);
    

        });
      
        $.ajax({
          url: 'php/upload.php',
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,
          type: 'post',
          success: function(response){
              
            var messageText = response.message;
            var messageType = response.type;
    
            showResponse(messageType, messageText, modal, form);

              
          },
          error: function(response) { 
            console.log('Ошибка. Данные не отправлены.'+response.responseText);
            /*** Вызываем окно ошибки */
            showResponse('error', 'Ошибка отправки данных', modal, form);
            
        } 
        });
      }
      else {


        $(form).find('.input-fake').addClass('error');
        $(form).find('span.file-error').addClass('error');

      }
    
  }
  else {
    $(form).find('input[name="phoneOrEmail"]').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }
 
}




$('.content button.close').on("click", function(e) {
  e.preventDefault();
  var modal =  $(this).closest('.modal');

  $(modal).find('label.user_phone').css({'color': '#ffffff'});

  return true; 
});


//Clean phone and email inputs
$( "input[name='phoneOrEmail']").keydown(function() {

  $(this).removeClass('error');

  var form =  $(this).closest('form');
  $(form).find('label.hidden').removeClass('error');
  
  console.log( 'label '+ $(this).next('label') );
        
});

$( "input[name='phone']").keydown(function() {

  $(this).removeClass('error');

  var form =  $(this).closest('form');
  $(form).find('label.hidden').removeClass('error');
  
  console.log( 'label '+ $(this).next('label') );
        
});

$( "input[name='mail']").keydown(function() {

  $(this).removeClass('error');

  var form =  $(this).closest('form');
  $(form).find('label.hidden').removeClass('error');
  
  console.log( 'label '+ $(this).next('label') );
        
});



$(".checker").on("click", function() {
  
  var form =  $(this).closest('form');
  $(form).find('.checker.active').removeClass('active');
  $(form).find('.captionApp').addClass('active');

  $(this).addClass('active');

});

$(".checker").on("mouseenter", function() {
  
  var form =  $(this).closest('form');
 
  $(form).find('.captionApp').addClass('active');

});

$(".checker").on("mouseleave", function() {
  
  var form =  $(this).closest('form');
 
  $(form).find('.captionApp').removeClass('active');

});


$("#calculations-form__check").on("click", function() {
  console.log('clicked');

  var formCheckmark = $("#calculations-form").find(".checkmark");

  if( $(formCheckmark).hasClass('active') ) {

    $(formCheckmark).removeClass('active');

    $(this).val('off');

  }
  else {

    $(formCheckmark).addClass('active');
    $(this).val('on');

  }
});



$('#freeSampleModal__form-btn').on("click", function(e) {
  e.preventDefault();
  console.log('freeSampleModal form called');

  var form = $(this).closest('form');
  console.log(form);

  var modal =  $(this).closest('#uploadModal');
  console.log(modal);


  uploadAjax(form, modal);

  return false; 
  
});





$('#consultationModal__form-btn').on("click", function(e) {
  e.preventDefault();

  var form = $(this).closest('form');
  var modal =  $(this).closest('.modal');


  if(validateForm(form, 'phone')) {
    

    sendAjaxForm(form, modal, '');
    
  }
  else {
    $(form).find('input#phone1').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }

  return false; 
});


$('#consultationModal__form-btn-socials').on("click", function(e) {
  e.preventDefault();

  var form = $(this).closest('form');
  var modal =  $(this).closest('.modal');


  if(validateForm(form, 'phone')) {

    var messenger = $(form).find('.checker.active');

    console.log(messenger);

    var messengerType;

    if( $(messenger).hasClass('vb-checker__wrapper') ) {
      messengerType = '&optionSocials=Viber';
    }
    else {
      messengerType = '&optionSocials=WhatsApp';
    }
    
    console.log( messengerType);
   
    sendAjaxForm(form, modal, messengerType);
    
  }
  else {
    $(form).find('input#phone2').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }

  return false; 
});


$('#docsModal__form-btn').on("click", function(e) {
  e.preventDefault();

  var form = $(this).closest('form');
  var modal =  $(this).closest('.modal');


  if(validateForm(form, 'phone')) {


    var messenger = $(form).find('.checker.active');

    console.log(messenger);

    var messengerType;


    if( $(messenger).hasClass('vb-checker__wrapper') ) {
      messengerType = '&optionSocials=Viber';
    }
    else {
      messengerType = '&optionSocials=WhatsApp';
    }
    
    console.log( messengerType);
   

    sendAjaxForm(form, modal, messengerType);
    
  }
  else {
    $(form).find('input[name="phone"]').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }

  return false; 
});


$('#basePriceModal__form-btn').on("click", function(e) {

  e.preventDefault();

  //e.preventDefault();
  console.log('calc FORM');


  var form = $(this).closest('form');
  console.log(form);
  var modal =  $(this).closest('#basePriceModal');

  

  var user_email = form.find("input[name='mail']").val();

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if( (validateForm(form, 'mail')) && re.test(user_email) ) {

    var form_data = new FormData();

    var mail = $(form).find('input#mail1').val();
    console.log("mail " + mail);

    var square = $('#calculations-form').find('input#input_square').val();
    console.log("square " + square);

    var material = $('#calculations-form').find('select#input_material').val();
    console.log("material " + material);

    var floorSystem = $('#calculations-form').find('select#input_system').val();
    console.log("floorSystem " + floorSystem);

    var floorFunction = $('#calculations-form').find('select#input_fl_function').val();
    console.log("floorFunction " + floorFunction);

    var isRulerNeeded = $('#calculations-form').find('input#calculations-form__check').val();
    console.log("isRulerNeeded " + isRulerNeeded);
  

    form_data.append('mail', mail);
    form_data.append('optionCalculator', 'calculator');
    form_data.append('square', square);
    form_data.append('material', material);
    form_data.append('floorSystem', floorSystem);
    form_data.append('floorFunction', floorFunction);
    form_data.append('isRulerNeeded', isRulerNeeded);
    //form_data.append('time', time);

    $(form).fadeTo("fast", 0.15, function() {
      
      $(this).find('.button').prop('disabled', true);

    });
    
  
    $.ajax({
      url: 'php/send.php',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(response){
          
        var messageText = response.message;
        var messageType = response.type;
        
        

        if(messageType == 'success') {
            //alert('sent');
            location.href = 'sps.html';
        
        }
        else {
           
          showResponse(messageType, messageText, modal, form);
            //showError();
            

        }


      },
      error: function(response) { // Данные не отправлены
        //console.log('Ошибка. Данные не отправлены.'+response.responseText);
        /*** Вызываем окно ошибки */
        showResponse(messageType, messageText, modal, form);
      
    } 
    });
    
  }
  else {
    $(form).find('input[name="mail"]').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }


  return false; 

});


$('#basePriceModal__form-btn-2').on("click", function(e) {
  e.preventDefault();


  var form = $(this).closest('form');
  var modal =  $(this).closest('.modal');


  

  var user_email = form.find("input[name='mail']").val();

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(  (validateForm(form, 'phone')) || re.test(user_email) ) {

    var form_data = new FormData();

    var mail = $(form).find('input#mail2').val();
    console.log("mail " + mail);
    
    var phone = $(form).find('input#phone4').val();
    console.log("phone " + phone);

    var square = $('#calculations-form').find('input#input_square').val();
    console.log("square " + square);

    var material = $('#calculations-form').find('select#input_material').val();
    console.log("material " + material);

    var floorSystem = $('#calculations-form').find('select#input_system').val();
    console.log("floorSystem " + floorSystem);

    var floorFunction = $('#calculations-form').find('select#input_fl_function').val();
    console.log("floorFunction " + floorFunction);

    var isRulerNeeded = $('#calculations-form').find('input#calculations-form__check').val();
    console.log("isRulerNeeded " + isRulerNeeded);
  

    form_data.append('phone', phone);
    form_data.append('mail', mail);
    form_data.append('optionCalculator', 'calculator');
    form_data.append('square', square);
    form_data.append('material', material);
    form_data.append('floorSystem', floorSystem);
    form_data.append('floorFunction', floorFunction);
    form_data.append('isRulerNeeded', isRulerNeeded);
    //form_data.append('time', time);

    $(form).fadeTo("fast", 0.15, function() {
      
      $(this).find('.button').prop('disabled', true);

    });
    
  
    $.ajax({
      url: 'php/send.php',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(response){
          
        var messageText = response.message;
        var messageType = response.type;
        
       

        if(messageType == 'success') {
            //alert('sent');

            location.href = 'sps.html';
        //   $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
        //   $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
        //   $(form).find('label.user_phone').css({'color': '#ffffff'});
        //   $(form)[0].reset();
        //   $('#calc-form')[0].reset(); 
        //   $('#calc-form output.baget').val(30000); 
        //   $('#calc-form output.square').val(0); 
        //   $('#calc-form output').css('left', '0');
        }
        else {
          showResponse(messageType, messageText, modal, form);
        }

        


      },
      error: function(response) { // Данные не отправлены

        showResponse(messageType, messageText, modal, form);
    } 
    });
    
  }
  else {
       $(form).find('label.hidden').addClass('error');
  }

  return false; 
});


$('#consultationOther__form-btn').on("click", function(e) {
  e.preventDefault();


  var form = $(this).closest('form');
  var modal =  $(this).closest('.modal');


  

  if(validateForm(form, 'phone')) {


    var messenger = $(form).find('.checker.active');

    console.log(messenger);

    var messengerType;

    if( $(messenger).hasClass('vb-checker__wrapper') ) {
      messengerType = '&optionSocials=Viber';
    }
    else {
      messengerType = '&optionSocials=WhatsApp';
    }
    
    console.log( messengerType);
   

    sendAjaxForm(form, modal, messengerType);
    
  }
  else {
    $(form).find('input[name="phone"]').addClass('error');
    $(form).find('label.hidden').addClass('error');
  }

  return false; 
});







