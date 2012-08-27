<?php
require_once("oauth/twitteroauth.php");
$connection = new TwitterOAuth("363gDHAOlhYuFH7r8ITxmA", "df7MjfnaeweAnMB6V2CGRHXZfJ2oD0LNdMgcKM", "88896638-gAIGQljoeVvV8r8SZc4VyTs32gFsf0uadoNHadgYU", "eaGCBcwZS8j19zXpIB2IU70oNq3raC9HeuNw0gHUM");
echo json_encode($connection->get("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=".$_GET['username']));
?>
