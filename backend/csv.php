<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


// sql
$dbHost = "localhost";
$dbName = "volga-db";
$dbChar = "utf8";
$dbUser = "root";
$dbPass = "";

try {
    $pdo = new PDO(
        "mysql:host=".$dbHost.";dbname=".$dbName.";charset=".$dbChar,
        $dbUser, $dbPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (Exception $ex) { exit($ex->getMessage()); }

// sql
$arr = array();

$sql = "SELECT * FROM Words";
if($result = $pdo->query($sql)){
    foreach($result as $row){
        array_push($arr, $row["Dictionary_name"]);
    }
} else{
    echo "Ошибка: " . $pdo->error;
}

$uniqArr = array_unique($arr);
$fileName = substr($_FILES["file"]["name"],0,-4);

if(in_array($fileName, $uniqArr)) echo 'Такой словарь уже есть';
else {
    $fh = fopen($_FILES["file"]["tmp_name"], "r");
    if ($fh === false) { exit("Failed to open uploaded CSV file"); }

    $i = 0;
    while ( ($data = fgetcsv($fh, null, ';') ) !== FALSE ) {
        try {
            if($i != 0){
                $stmt = $pdo->prepare("INSERT INTO `words` (`ID`, `Dictionary_name`, `Eng`, `Rus`) VALUES (?, ?, ?, ?)");
                $stmt->execute([NULL,$fileName,$data[0], $data[1]]);
            }
            $i++;
        } catch (Exception $ex) { echo $ex->getmessage(); }
    }
    fclose($fh);

    echo "ok";
};