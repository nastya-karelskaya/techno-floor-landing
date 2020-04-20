<?php 

if( ( isset($_POST["user_contacts"]) ) || ( isset($_POST["phone"]) ) || ( isset($_POST["mail"]) ) ) { 
    
  // configure
  //Конфиг для почты 
  $to = "mail@naptech.ru"; //Кому
  $to_two = "nastya-pavlova-93@yandex.ru"; //Кому
  $from = "anastasia-pavlova.com"; //От кого
  $subject = 'Новое сообщение от "НАПОЛЬНЫЕ ТЕХНОЛОГИИ" (naptech.ru)'; //Тема
  
  
  $emailText = "Новое сообщение от \"НАПОЛЬНЫЕ ТЕХНОЛОГИИ\" (naptech.ru) \n ======== \n";
        

  try
  {
    if(isset($_POST['user_contacts'])) {
        $userContacts = htmlentities($_POST['user_contacts']);
        
        if( !empty($userContacts) ) {
            $emailText .= "Телефон или почта: $userContacts \n\n";
        }
    }
    
    if(isset($_POST['phone'])) {
        $userContacts = htmlentities($_POST['phone']);
        
        if( !empty($userContacts) ) {
            $emailText .= "Телефон: $userContacts \n\n";
        }
    }
    
    if(isset($_POST['user_name'])) {
        $userName = htmlentities($_POST['user_name']);
        
        if( !empty($userName) ) {
            $emailText .= "Имя клиента или название компании: $userName \n\n"; 
        }
    }
    
    if(isset($_POST['square'])) {
        $square = htmlentities($_POST['square']);
        
        if( !empty($square) ) {
            $emailText .= "Площадь объекта и локация объекта: $square \n\n";
        }
    }
    
    if(isset($_POST['companyName'])) {
        $companyName = htmlentities($_POST['companyName']);
        
        if( !empty($companyName) ) {
            $emailText .= "Имя клиента или название компании: $companyName \n\n";
        }
    }
    
    if(isset($_POST['optionSocials'])) {
        $optionSocials = htmlentities($_POST['optionSocials']);
        
        if( !empty($optionSocials)  ) {
            $emailText .= "Примечание: позвонить в $optionSocials \n\n";
        }
    }
    
    if(isset($_POST['comment'])) {
        $comment = htmlentities($_POST['comment']);
        
        if( !empty($comment)  ) {
            $emailText .= "Комментарий клиента: $comment \n\n";
        }
    }
    
    if(isset($_POST['mail'])) {
        $mail = htmlentities($_POST['mail']);
        
        if( !empty($mail)  ) {
            $emailText .= "Почта: $mail \n\n";
        }
    }
    
    
    if(isset($_POST['material'])) {
        $material = htmlentities($_POST['material']);
        
        if( !empty($material)  ) {
            $emailText .= "Материал пола: $material \n\n";
        }
    }
    
    if(isset($_POST['floorSystem'])) {
        $floorSystem = htmlentities($_POST['floorSystem']);
        
        if( !empty($floorSystem)  ) {
            $emailText .= "Система пола: $floorSystem \n\n";
        }
    }
    
    if(isset($_POST['floorFunction'])) {
        $floorFunction = htmlentities($_POST['floorFunction']);
        
        if( !empty($floorFunction)  ) {
            $emailText .= "Функция пола: $floorFunction \n\n";
        }
    }
    
    if(isset($_POST['isRulerNeeded'])) {
        $isRulerNeeded = htmlentities($_POST['isRulerNeeded']);
        
        if( !empty($isRulerNeeded)  ) {
            
            if( $isRulerNeeded == 'on') {
                $emailText .= "Требуется выравнивание основания \n\n";
            }
           
        }
    }
    
    
    
    
    $responseArray = array('type' => 'success', 'message' => $emailText);

      
    $headers = array('Content-Type: text/plain; charset="UTF-8";',
        'From: ' . $from,
        'Reply-To: ' . $from,
        'Return-Path: ' . $from,
    );
    
    
    mail($to, $subject, $emailText, implode("\n", $headers));
    mail($to_two, $subject, $emailText, implode("\n", $headers));

     
  }
  catch (\Exception $e)
  {
      $responseArray = array('type' => 'danger', 'message' => $errorMessage);
  }

  // $responseArray = array('type' => 'danger', 'message' => $errorMessage);

  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
      $encoded = json_encode($responseArray);

      header('Content-Type: application/json');

      echo $encoded;
  }
  else {
    
      echo $responseArray['message'];
  }

  

}
else {
  $responseArray = array('type' => 'danger', 'message' => 'empty POST');
  echo $responseArray['message'];

}



?>
