<?php 

if(isset($_POST["user_phone"]) || isset($_POST["user_email"]) ) {
  // configure
  //Конфиг для почты 
  $to = "nastya-pavlova-93@yandex.ru"; //Кому
  $to_two = "nastya89215244781@yandex.ru"; //Кому
  $from = "anastasia-pavlova.com"; //От кого
  $subject = "PFP-лендинг"; //Тема
  

  // let's do the sending
  if(isset($_POST["user_email"])) 
    $user_email = htmlentities($_POST['user_email']);

  if(isset($_POST["user_phone"])) 
    $user_phone = htmlentities($_POST['user_phone']);

  if(isset($_POST["square"])) 
    $square = htmlentities($_POST['square']);
  
  if(isset($_POST["baget"])) 
    $baget = htmlentities($_POST['baget']);

  if(isset($_POST["material"])) 
    $material = htmlentities($_POST['material']);

  if(isset($_POST["time"])) 
    $time = htmlentities($_POST['time']);



  if(isset($_POST["whatsapp"])) {
    $whatsapp = htmlentities($_POST['whatsapp']);
  }

  if(isset($_POST["options"])) {
    $options = htmlentities($_POST['options']);
  }
    


  try
  {
    $emailText = "Новое сообщение от PFP-лендинг \n========\n";
    
    if($user_phone) 
      $emailText .= "Телефон: $user_phone\n";

    if($user_email) 
      $emailText .= "Email: $user_email\n";


    if($whatsapp || $options)
      $emailText .= "======= Примечания =======\n";


    if($whatsapp === 'call') 
      $emailText .= "Позвонить в WhatsApp\n";
    
    if($whatsapp === 'enginier') 
      $emailText .= "Выезд инженера. WhatsApp\n";


    switch ($options) {
      case 'three':
        $emailText .= "Рассчет в 3 вариантах\n";
        break;

      case 'price':
        $emailText .= "Выслать прайс на материалы\n";
        break;

      case 'tz':
        $emailText .= "Разработка ТЗ\n";
        break;

      case 'calc':
        $emailText .= "Калькулятор\n";
        if($square) 
          $emailText .= "Площадь по полу: $square\n";

        if($baget) 
          $emailText .= "Бюджет: $baget\n";

        if($time) 
          $emailText .= "Сроки: $time\n";

        if($material) 
          $emailText .= "Материал покрытия: $material\n";
        break;
      
      case 'enginier':
        $emailText .= "Выезд инженера. Позвонить\n";
        break;

      default:
        break;
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
