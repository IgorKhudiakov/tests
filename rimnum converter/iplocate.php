<?php

/**
 * Возвращает название города в случае успеха и "Город не определён" в противном случае
 * Использует сервис dadata.ru
 * Перед использованием token и secret_token должны быть заполнены
 */
function getUserCityFromIP($ip) {

    $token = "{TOKEN}";
    $secret_token = "{SECRET_TOKEN}";
    $url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";

    // Инициализирует сеанс и записывает параметры
    $curl = curl_init();
    // параметр адреса
    curl_setopt($curl, CURLOPT_URL, $url);
    // параметр возврата строки с данными
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    // параметр заголовка с данными согласно документации dadata
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Accept: application/json",
        "Authorization: Token " . $token,
        "X-Secret: " . $secret_token,
    ]);
    // указывает, будет ли использоваться метод POST
    curl_setopt($curl, CURLOPT_POST, 1);
    // параметр тела с данными
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([
        'ip' => $ip
    ]));
    
    // Сохраняет результат
    $result = curl_exec($curl);
    // Завершает сеанс
    curl_close($curl);
    // В случае неудачного выполнения запроса возвращает "Город не определён",
    // иначе возвращает название города
    return $result ?? json_decode($result)->location != null ? json_decode($result)->location->value : 'Город не определён';
}

echo(getUserCityFromIP('46.226.227.20'));