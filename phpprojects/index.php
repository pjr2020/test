<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        123
        <?php
        $c = 1;
        $string1 = "c = $c";
        $string2 = 'c = $c';
        echo $string1;
        echo $string1.$string2;
        echo "<br>";
        echo "a: [" . (20 > 9) . "]<br>";
        echo "b: [" . (5 == 6) . "]<br>";
        echo "c: [" . (1 == 0) . "]<br>";
        echo "d: [" . (1 == 1) . "]<br>";
        ?>
    <?php
    $author = "Brian W. Kernighan";
    echo <<<_END
    Debugging is twice as hard as writing the code in the first place.
    Therefore, if you write the code as cleverly as possible, you are,
    by definition, not smart enough to debug it.
    - $author.
_END;
    echo __FILE__.__DIR__;
?>
        <?php // upload.php
echo <<<_END
<html><head><title>PHP Form Upload</title></head><body>
<form method='post' action='index.php' enctype='multipart/form-data'>
Select File: <input type='file' name='filename' size='10'>
<input type='submit' value='Upload'>
</form>
_END;
if ($_FILES)
{
$name = $_FILES['filename']['name'];
echo sanitizeString($name);
move_uploaded_file($_FILES['filename']['tmp_name'], $name);
echo "Uploaded image '$name'<br><img src='$name'>";
}
echo "</body></html>";
?>
    </body>
</html>
<?php
function sanitizeString($var)
{
$var = stripslashes($var);
$var = htmlentities($var);
$var = strip_tags($var);
return $var;
}
function sanitizeMySQL($connection, $var)
{ // Using the mysqli extension
$var = $connection->real_escape_string($var);
$var = sanitizeString($var);
return $var;
}
?>