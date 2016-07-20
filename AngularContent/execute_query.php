<?php
error_reporting(0);
mysql_connect('localhost','root','') or die(mysql_error());
mysql_select_db('healthcaredb');
$str = $_REQUEST['name'];


$sell = mysql_query('SELECT * FROM `health1` LEFT JOIN `health2` USING(child_id) LEFT JOIN `eye` USING(child_id) LEFT JOIN `ent` USING(child_id) LEFT JOIN `skin` USING(child_id) WHERE '.substr($str,4));


$query_string_loc ='SELECT `lat`,`lon` FROM `loc` WHERE `child_id`=';

while($temp = mysql_fetch_assoc($sell)){
             $query_loc = mysql_query($query_string_loc.$temp['child_id']);
              $loc_assoc = mysql_fetch_assoc($query_loc);
              $child_ids[] = $loc_assoc;
} 
      $final_array['diseases'] = ($child_ids);
echo json_encode($final_array);

?>