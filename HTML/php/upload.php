<?php 

if(isset($_POST["user_contacts"])) { 
    
    try
    {

        //Конфиг для почты 
        $to = "nastya-pavlova-93@yandex.ru"; //Кому
        //$to_two = "nastya89215244781@yandex.ru"; //Кому
        $from = "anastasia-pavlova.com"; //От кого
        $subject = "Загрузка файла на сайте"; //Тема


        $user_contacts = htmlentities($_POST['user_contacts']);
        $emailText = 'Новое сообщение от "НАПОЛЬНЫЕ ТЕХНОЛОГИИ" (naptech.ru) <br> ======== <br>';
        $emailText .= "Телефон или почта: $user_contacts\n <br> <br>"; 

            
        //file uploading
        if(isset($_FILES['file'])) {
            $client_file = '';
            
            if ( 0 < $_FILES['file']['error'] ) {
                $responseArray = array('type' => 'error', 'message' => 'Error with file loading');
            }
            // Если нет проблем с загрузкой
            else {
                
                // Нет проблем - проверяем тип               
                switch ($_FILES['file']['type']) {
                    case 'application/pdf':
                        $client_file = $_FILES['file']['name'];   
                        break;

                    case 'application/msword':
                        $client_file = $_FILES['file']['name'];   
                        break;

                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        $client_file = $_FILES['file']['name'];   
                        break;      
                        
                    case 'application/rtf':
                        $client_file = $_FILES['file']['name'];   
                        break;
                        
                    case 'text/richtext':
                        $client_file = $_FILES['file']['name'];   
                        break;
                        
                    case 'application/x-rtf':
                        $client_file = $_FILES['file']['name'];   
                        break;

                    case 'image/jpeg':
                        $client_file = $_FILES['file']['name'];   
                        break;

                    case 'image/pjpeg':
                        $client_file = $_FILES['file']['name'];   
                        break;

                    case 'image/png':
                        $client_file = $_FILES['file']['name'];   
                        break;
                        

                    case 'text/plain':
                        $client_file = $_FILES['file']['name'];   
                        break;    

                    default:
                      $responseArray = array('type' => 'bad_type', 'message' => 'Not supported file type');
                }
   
            }
                
            
            
            if($client_file) {
                //ПРоверяем размер
                if($_FILES['file']['size'] > (20 * 1024 * 1024) ) {
                    $responseArray = array('type' => 'bad_size', 'message' => 'Not supported file size');
                }
                //проверки пройдены - отправка
                else {
                    
                    move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);

                    $emailText .= "Клиент прикрепил файл: $client_file\n <br>";
                    $filename =  '../uploads/' . $_FILES['file']['name']; //Имя файла для прикрепления
                    $message = $emailText; //Текст письма
                    $boundary = "---"; //Разделитель
                    /* Заголовки */
                    $headers = "From: $from\nReply-To: $from\n";
                    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
                    $body = "--$boundary\n";
                    /* Присоединяем текстовое сообщение */
                    $body .= "Content-type: text/html; charset='utf-8'\n";
                    $body .= "Content-Transfer-Encoding: quoted-printablenn";
                    $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
                    $body .= $message."\n";
                    $body .= "--$boundary\n";
                    $file = fopen($filename, "r"); //Открываем файл
                    $text = fread($file, filesize($filename)); //Считываем весь файл
                    fclose($file); //Закрываем файл
                    /* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
                    //Content-Type: image/jpeg;
                    $body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n"; 
                    $body .= "Content-Transfer-Encoding: base64\n";
                    $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
                    $body .= chunk_split(base64_encode($text))."\n";
                    $body .= "--".$boundary ."--\n";
                    

                    $sented_result = mail($to, $subject, $body, $headers); //Отправляем письмо 1 
                    $sented_result_two = mail($to_two, $subject, $body, $headers); //Отправляем письмо

                    if($sented_result && $sented_result_two) {
                        
                        $responseArray = array('type' => 'success', 'message' => $emailText);

                    }
                    else {
                        $errorMessage = 'ERROR: File is not sent, status: ' . $sented_result;
                        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
                    }

                }  
                
            }
            
        } 
        else {
            
            $responseArray = array('type' => 'success', 'message' => $emailText);

            $headers = array('Content-Type: text/plain; charset="UTF-8";',
            'From: ' . $from,
            'Reply-To: ' . $from,
            'Return-Path: ' . $from,
            );

            mail($to, $subject, $emailText, implode("\n", $headers));
            mail($to_two, $subject, $emailText, implode("\n", $headers));

        }

    }
    catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    }
    // $responseArray = array('type' => 'danger', 'message' => 'empty POST');

    //Если данные пришли аяксом (xmlhttprequest)
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
    else {
        //если нет
        echo $responseArray;
    }

}
else {
  $responseArray = array('type' => 'danger', 'message' => 'empty POST');
  echo $responseArray;

}



?>
