<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = isset($_POST['name']) ? $_POST['name'] : '';
  $company = isset($_POST['company']) ? $_POST['company'] : '';
  $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

  $log_file = 'form_applications.log';
  $log_entry = "Name: $name | Company: $company | Phone: $phone\n";

  if (file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX)) {
    echo json_encode(array(
      'status' => 'success',
      'message' => 'Данные успешно получены и сохранены'
    ));
  } else {
    http_response_code(500);
    echo json_encode(array('error' => 'Ошибка при сохранении данных в лог-файл'));
  }
} else {
  http_response_code(400);
  echo json_encode(array('error' => 'Метод не поддерживается'));
}
