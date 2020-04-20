<?php 

if( ( isset($_POST["user_contacts"]) ) || ( isset($_POST["phone"]) ) ) { 
    
    try
    {

        //Конфиг для почты 
        $to = "mail@naptech.ru"; //Кому
        $to_two = "nastya-pavlova-93@yandex.ru"; //Кому
        $from = "anastasia-pavlova.com"; //От кого
        $subject = 'Новое сообщение от "НАПОЛЬНЫЕ ТЕХНОЛОГИИ" (naptech.ru)'; //Тема
        
        $emailText = "Новое сообщение от \"НАПОЛЬНЫЕ ТЕХНОЛОГИИ\" (naptech.ru) \n ======== \n";
        
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
        
        if(isset($_POST['companyName'])) {
            $companyName = htmlentities($_POST['companyName']);
            
            if( !empty($companyName) ) {
                $emailText .= "Имя клиента или название компании: $companyName \n\n";
            }
        }
        
        
            
        //file uploading
        if(isset($_FILES['file'])) {
            $client_file = '';
            $client_photo = '';
            
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
                        $client_photo = $_FILES['file']['name'];   
                        break;

                    case 'image/pjpeg':
                        $client_photo = $_FILES['file']['name'];   
                        break;

                    case 'image/png':
                        $client_photo = $_FILES['file']['name'];   
                        break;
                        

                    case 'text/plain':
                        $client_file = $_FILES['file']['name'];   
                        break;    

                    default:
                      $responseArray = array('type' => 'bad_type', 'message' => 'Not supported file type');
                }
   
            }
                
            
            
            if($client_file || $client_photo) {
                
                
                //ПРоверяем размер
                if($_FILES['file']['size'] > (20 * 1024 * 1024) ) {
                    $responseArray = array('type' => 'bad_size', 'message' => 'Not supported file size');
                }
                //проверки пройдены - отправка
                else {
                    
                    // if($client_file) {
                    
                    //     move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
    
                    //     $emailText .= "Клиент прикрепил файл: $client_file\n <br>";
                    //     $filename =  '../uploads/' . $_FILES['file']['name']; //Имя файла для прикрепления
                    //     $message = $emailText; //Текст письма
                    //     $boundary = "---"; //Разделитель
                    //     /* Заголовки */
                    //     $headers = "From: $from\nReply-To: $from\n";
                    //     $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
                    //     $body = "--$boundary\n";
                    //     /* Присоединяем текстовое сообщение */
                    //     $body .= "Content-type: text/html; charset='utf-8'\n";
                    //     $body .= "Content-Transfer-Encoding: quoted-printablenn";
                    //     $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
                    //     $body .= $message."\n";
                    //     $body .= "--$boundary\n";
                    //     $file = fopen($filename, "r"); //Открываем файл
                    //     $text = fread($file, filesize($filename)); //Считываем весь файл
                    //     fclose($file); //Закрываем файл
                    //     /* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
                    //     //Content-Type: image/jpeg;
                    //     $body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n"; 
                    //     $body .= "Content-Transfer-Encoding: base64\n";
                    //     $body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
                    //     $body .= chunk_split(base64_encode($text))."\n";
                    //     $body .= "--".$boundary ."--\n";
                        
    
                        

                    // }  
                    
                    //else {
                        if( !is_uploaded_file($_FILES['file']['tmp_name']) ) {
                            
                            $responseArray = array('type' => 'other', 'message' => 'cant upload file');
							    
						}
							
						if( !move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']) ) {
						    
						    $responseArray = array('type' => 'bad_size', 'message' => 'cant move file' . $_FILES['file']['error']);
						    
						}

						$emailText .= "Клиент прикрепил документ: http://" . $_SERVER['SERVER_NAME'] . "/uploads/{$_FILES['file']['name']}";
						
						if($client_photo) {
						 //$emailText .= "<img style=\"max-height:250px\" src=\"https://smartfix-ptz.ru/uploads/{$_FILES['file']['name']}\" /> ";   
						}
						
			// 			$emailText .= "\n <br> ";
							
							
                    //}
                    $responseArray = array('type' => 'success', 'message' => $emailText);

                    $headers = array('Content-Type: text/plain; charset="UTF-8";',
                    'From: ' . $from,
                    'Reply-To: ' . $from,
                    'Return-Path: ' . $from,
                    );
            
                    $sented_result = mail($to, $subject, $emailText, implode("\n", $headers));
                    $sented_result_two = mail($to_two, $subject, $emailText, implode("\n", $headers)); //Отправляем письмо

                    //if($sented_result && $sented_result_two) {
                    if($sented_result) {
                        
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
            //mail($to_two, $subject, $emailText, implode("\n", $headers));

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
