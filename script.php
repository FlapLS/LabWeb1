<?php

$x = isset($_POST['x']) ? floatval($_POST['x']) : null;
$y = isset($_POST['y']) ? floatval($_POST['y']) : null;
$r = isset($_POST['r']) ? intval($_POST['r']) : null;

session_start();

date_default_timezone_set('Europe/Moscow');
$currentTime = date("H:i:s");
if (!check_values($x, $y, $r)) {
    http_response_code(400);
    return;
}
$res = check_area($x, $y, $r) ? "<span style='color: #439400'>Попала</span>" : "<span style='color: #94002D'>Не попала</span>";
$time = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
$TIME = number_format($time, 6,'.','');

$_SESSION['results'][] = [$x, $y, $r, $currentTime, $TIME, $res];

function check_values($x, $y, $r)
{
    return in_array($x, [-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0])
        and (is_numeric($y) and $y > -3 and $y < 5)
        and in_array($r, [1.0, 2.0, 3.0, 4.0, 5.0]);
}

function check_area($x, $y, $r)
{
    if ($x < 0 and $x >= -$r/2) {
        return ($y >= 0 and $y <= $r) //прямоугольник
            or ((pow($x, 2) + pow($y, 2) <= pow($r, 2))); // круг
    } elseif ($x < $r / 2 and $y >= 0) {
        return $y < -2 * $x + $r; // треугольник (прямая y = -2x + R)
    } else return false;
}

?>

<table>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Время запуска</th>
        <th>Время работы</th>
        <th>Результат</th>
    </tr>
    <?php foreach ($_SESSION["results"] as $i) { ?>
        <tr>
            <td><?php echo $i[0] ?></td>
            <td><?php echo $i[1] ?></td>
            <td><?php echo $i[2] ?></td>
            <td><?php echo $i[3] ?></td>
            <td><?php echo $i[4] ?></td>
            <td><?php echo $i[5] ?></td>
        </tr>
    <?php } ?>
</table>