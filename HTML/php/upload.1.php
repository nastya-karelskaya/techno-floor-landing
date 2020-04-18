<?php 

if(isset($_POST["user_phone"])) { 
    
    try
    {
        if(isset($_POST["whatsapp"])) {
            $whatsapp = htmlentities($_POST['whatsapp']);
        
        }
    
        if(isset($_POST["options"])) {
            $options = htmlentities($_POST['options']);
        
        }

        $user_phone = htmlentities($_POST['user_phone']);
        $emailText = "Новое сообщение от PFP-лендинг \n========\n ";
        $emailText .= "Телефон: $user_phone\n "; 


        if($whatsapp || $options) {
            $emailText .= "======= Примечания =======\n";

            if($whatsapp === 'call') 
                $emailText .= "Позвонить в WhatsApp\n ";

            if($options === 'three')
                $emailText .= "Рассчет в 3 вариантах\n ";

        }            
        
            
        //file uploading
        if(isset($_FILES['file'])) {
            $client_file = '';
            //TODO валидация файла

            if ( 0 < $_FILES['file']['error'] ) {
                $responseArray['message'] = 'File error ' . $_FILES['file']['error'];
                echo $responseArray;
            // exit();
            }
            else {
                switch ($_FILES['file']['type']) {
                    case 'application/pdf':
                        //$newFilename .= '-document.pdf';
                        break;

                    case 'image/jpeg':
                    
                        break;

                    case 'image/pjpeg':
                        break;

                    case 'image/png':
                        break;

                    case 'text/plain':
                        break;    

                    default:
                        //echo 'Файл неподдерживаемого типа';
                        $responseArray = array('type' => 'size_error', 'message' => 'Not supported file type');
                        //echo $responseArray;
                        echo 'File is not supported: ';
                        exit;
                }

                move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
                $client_file = $_FILES['file']['name'];    

            }

            if($client_file) {
                $emailText .= "Клиент прикрепил файл: $client_file \n";

                //$path = '../uploads/';
                $filename =  '../uploads/' . $_FILES['file']['name']; //Имя файла для прикрепления
                $to = "nastya-pavlova-93@yandex.ru"; //Кому
                $from = "anastasia-pavlova.com"; //От кого
                $subject = "Загрузка файла на сайте"; //Тема
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
                $body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n"; 
                $body .= "Content-Transfer-Encoding: base64\n";
                $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
                $body .= chunk_split(base64_encode($text))."\n";
                $body .= "--".$boundary ."--\n";
                
                $sented_result = mail($to, $subject, $body, $headers); //Отправляем письмо
                if($sented_result == 1) {
                    $emailText .= 'File is sent, status: ' . $sented_result;

                    //$responseArray = array('type' => 'success', 'message' => $emailText);
                    //echo $responseArray;
                    echo 'File is sent, status: ' . $sented_result;
                    exit;

                }
                else {
                    $errorMessage = 'ERROR: File is not sent, status: ' . $sented_result;
                    //$responseArray = array('type' => 'danger', 'message' => $errorMessage);
                    echo $errorMessage; //$responseArray;
                    exit;

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


        // mail($sendTo, $subject, $emailText, implode("\n", $headers));

        // $responseArray = array('type' => 'success', 'message' => $okMessage);

        }

    }
    catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    }

    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
    else {
        echo $responseArray;
    }

  

}
else {
  $responseArray = array('type' => 'danger', 'message' => 'empty POST');
  echo $responseArray;

}



?>
