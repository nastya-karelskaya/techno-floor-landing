/////////////////////////////////////
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

    default:
      isGoodFile = false;
  }

  }

    return isGoodFile;
}



$('.content button.close').on("click", function(e) {
  e.preventDefault();
  var modal =  $(this).closest('.modal');

  $(modal).find('label.user_phone').css({'color': '#ffffff'});

  return true; 
});


//Clean phone and email inputs
$( "input[name='user_phone']").keydown(function() {
    
   
  var modal =  $(this).closest('.modal');
  $(modal).find('label.user_phone').css({'color': '#ffffff'});
  var form =  $(this).closest('form');
  $(form).find('label.user_phone').css({'color': 'transparent'});
        
});

$( "input[name='user_email']").keydown(function() {
  
 
 //$(this).text('');
  var form =  $(this).closest('form');
  $(form).find('label.user_email').css({'color': 'transparent'});
        
});




//////////////////////////////////////////////////
  //Ajax answer handler 
  function showResponse(messageType, messageText, modal, form) {
    if(messageType == 'success') {
     console.log("Данные отправлены \n" + messageText, messageType);

      alert('message sent');
      // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      // $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
      // $(form).find('label.user_phone').css({'color': '#ffffff'});
      // $(form)[0].reset();
    }
    else if(messageType == 'bad_type') {
      console.log("Плохой тип файла \n" + messageText, messageType);

      alert('bad file type');
      // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      // $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
      
      // $(form).find('label.user_phone').css({'color': '#ffffff'});

      // $(form)[0].reset();

      //$('#project-form')[0].reset();
    }
    else if(messageType == 'bad_size') {
      console.log("Большой размер файла \n" + messageText, messageType);

      alert('bad file size');
      // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      
      // $(modal).find('.fail .modal-title').text('Превышен размер файла');
      // $(modal).find('.fail .modal-subtitle').text('Пожалуйста, выберите документ меньше 20 мегабайт');

      // $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
      
      // $(form).find('label.user_phone').css({'color': '#ffffff'});

      // $(form)[0].reset();
      //$('#project-form')[0].reset();
    }
    else {
    console.log("Не удалось отправить форму. \n" + messageText, messageType);
    alert('other problem');

      // $(modal).find('.fail .modal-title').text('Не удалось отправить форму.');
      // $(modal).find('.fail .modal-subtitle').text('Попробуйте позже');

      // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      // $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
      
      // $(form).find('label.user_phone').css({'color': '#ffffff'});

      // $(form)[0].reset();
      //$('#project-form')[0].reset();
      
    }
    
    
  }



  //Ajax sender
  function sendAjaxForm(form, modal, extraData) {
    //console.log('send Ajax');

    $(form).fadeTo("fast", 0.15, function() {
       
      $(this).find('.button').prop('disabled', true);

    });
    
    $.ajax({
      url:     "php/send.php", //url страницы 
      type:     "POST", //метод отправки
      data: $(form).serialize() + extraData,
      success: function(response) { //Данные отправлены успешно

        var messageText = response.message;
        var messageType = response.type;
        
        showResponse(messageType, messageText, modal, form);

        $(form).fadeTo("fast", 1, function() {
       
          $(this).find('.button').prop('disabled', false);
    
        });
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

    console.log(form_data);
    
  
    if(validateForm(form, 'phoneOrEmail1')) {
  
      var userPhoneOrEmail = $(form).find('input#phoneOrEmail1').val();
  
      //form_data.append('options', 'three');
      form_data.append('user_contacts', userPhoneOrEmail);
  
      //if(whatsapp)
        //form_data.append('whatsapp', 'call');

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
    
              $(form).fadeTo("fast", 1, function() {
                
           
                $(form).find('.button').prop('disabled', false);
          
              });
                
            },
            error: function(response) { 
              console.log('Ошибка. Данные не отправлены.'+response.responseText);
              /*** Вызываем окно ошибки */
              showResponse('error', messageText, modal, form);
    
              $(form).fadeTo("fast", 1, function() {
           
                $(form).find('.button').prop('disabled', false);
          
              });
          } 
          });
        }
        else {

          alert("file error");

          $(form).find('input[type="file"]').addClass('error');

          //$(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
          
          //$(modal).find('.fail .modal-title').text('Пожалуйста, загрузите файл размером до 10 мб, формат: .doc, .docx, .rtf, .pdf или .jpeg, .jpg, .png');
          //$(modal).find('.fail .modal-subtitle').text('Пожалуйста, выберите документ меньше 10 мегабайт');

          //$(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
          
          //$(form).find('label.user_phone').css({'color': '#ffffff'});

          //$(form)[0].reset();

        }

    
      
    }
    else {
      $(form).find('input#phoneOrEmail1').addClass('error');
    }
  
    
  }


  //Validate phone and email
  function validateForm(form, inputName) {
    //TODO: fadein\fadeout\buttons disabled
    var element_str = 'input[name=' + inputName + ']';
    var element_val = form.find(element_str).val();
    
    return element_val;

  }






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

    if(validateForm(form, 'phone1')) {
      
      //var whatsapData = '&whatsapp=call&options=tz';

      sendAjaxForm(form, modal);
      
    }
    else {
      $(form).find('input#phone1').addClass('error');
    }
  
    return false; 
  });





  $('.calcModal__call').on("click", function(e) {
 
    e.preventDefault();

    //e.preventDefault();
    console.log('calc FORM');


    var form = $(this).closest('form');
    console.log(form);
    //var modal =  $(this).closest('#calcModal');



    if(validateForm(form, 'user_phone')) {
      var form_data = new FormData();

      var userPhone = $(form).find('input').val();
      var square = $('#calculations-form').find('input#input_square').val();
      //var baget = $('#calculations-form').find('input#input_baget').val();
      var material = $('#calculations-form').find('select#input_material').val();
      var floorSystem = $('#calculations-form').find('select#input_system').val();

      var floorFunction = $('#calculations-form').find('select#input_fl_function').val();

      var isRulerNeeded = $('#calculations-form').find('input#calculations-form__check').val();
      
      var remarkData = "calc";

      //console.log(square, baget, material, time, remarkData);

      form_data.append('user_phone', userPhone);
      form_data.append('options', remarkData);
      form_data.append('square', square);
      form_data.append('baget', baget);
      form_data.append('material', material);
      form_data.append('time', time);

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
            $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
            $(form).find('label.user_phone').css({'color': '#ffffff'});
            $(form)[0].reset();
            $('#calc-form')[0].reset(); 
            $('#calc-form output.baget').val(30000); 
            $('#calc-form output.square').val(0); 
            $('#calc-form output').css('left', '0');
          }
          else {
            $(modal).find('.fail .modal-title').text('Не удалось отправить форму.');
            $(modal).find('.fail .modal-subtitle').text('Попробуйте позже');

            $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_phone').css({'color': '#ffffff'});

            $(form)[0].reset();

          }

          $(form).fadeTo("fast", 1, function() {
      
            $(this).find('.button').prop('disabled', false);
      
          }); 


        },
        error: function(response) { // Данные не отправлены
          //console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          $(modal).find('.fail .modal-title').text('Не удалось отправить форму.');
          $(modal).find('.fail .modal-subtitle').text('Попробуйте позже');

          $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
          $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
          
          $(form).find('label.user_phone').css({'color': '#ffffff'});

          $(form)[0].reset();

          $(form).fadeTo("fast", 1, function() {
       
            $(this).find('.button').prop('disabled', false);
      
          });
        
      } 
      });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }

  
    return false; 

  });







