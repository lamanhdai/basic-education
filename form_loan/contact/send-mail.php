<?php
require 'PHPMailer/PHPMailerAutoload.php';
if (isset($_POST["info"])) {

  $info = $_POST['info'];
  $name = trim($info['name']);
  $email = trim($info['email']);
  $re_email = trim($info['re_email']);
  $tel = trim($info['tel']);
  $message = trim(nl2br(strip_tags($info['message'])));
  $error = array();
  //  if(empty($name) || empty($name)){
  //    $error['name'] = 'Please input your full name';
  //  }
  //  if(empty($email) || !preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)){
  //    $error['email'] = 'Please input your valid email address';
  //  }
  //  if(empty($re_email) || !preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $re_email) || $re_email!=$email){
  //    $error['re_email'] = 'The email and confirmation email addresses do not match';
  //  }
  //  if(empty($tel) || !preg_match("/^(0|([\+][8][4]))[0-9]{2}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4,5}$/", $tel)){
  //    $error['tel'] = 'Please input your telephone number';
  //  }
  if(empty($error)){

    $lang = trim($_POST['lang']);
    $title = array(
      // "en" => array("subject"=>"Tredia Vietnam - Contact", "name_title"=>"Full Name", "email_title"=>"Email Address", "telephone_title"=>"Telephone Number", "message_title"=>"Message"),
      // "vn" => array("subject"=>"Tredia Vietnam - Liên Hệ", "name_title"=>"Họ và Tên", "email_title"=>"Địa Chỉ Email", "telephone_title"=>"Điện Thoại", "message_title"=>"Nội Dung"),
      "jp" => array("subject"=>"Tredia Vietnam - Contact jp", "name_title"=>"Full Name jp", "email_title"=>"Email Address jp", "telephone_title"=>"Telephone Number jp", "message_title"=>"Message jp")
    );
    $EmailSubject = $title[$lang]["subject"];
    $MESSAGE_BODY = "";
    $MESSAGE_BODY .= $title[$lang]["name_title"].":&nbsp;".$name."<br/>";
    $MESSAGE_BODY .= $title[$lang]["email_title"].":&nbsp;".$email."<br/>";
    $MESSAGE_BODY .= $title[$lang]["telephone_title"].":&nbsp;".$tel."<br/>";
    $MESSAGE_BODY .= $title[$lang]["message_title"].":&nbsp;".$message."<br/>";
    
    $admin_email = 'nguyenthithanhloan@vn.oro.com';
    
    $mail = new PHPMailer();
    $mail->IsSMTP(); // set mailer to use SMTP
    $mail->Host = "smtp.gmail.com"; // specify main and backup server
    $mail->Port = 25; // set the port to use
    $mail->SMTPAuth = true; // turn on SMTP authentication
    $mail->SMTPSecure = 'none';
    $mail->Username = "nguyenthithanhloan@vn.oro.com"; // SMTP user
    $mail->Password = "thanhloan2306"; // SMTP password
    $mail->CharSet = 'UTF-8';
    //Set who the message is to be sent from
    $mail->setFrom('admin@tredia', 'Tredia Vietnam');
    $mail->addAddress($admin_email, 'admin');
    $mail->IsHTML(true);

    //Address to which recipient will reply
    $mail->addReplyTo("nguyenthithanhloan@vn.oro.com", "Reply");

    //Set the subject line
    $mail->Subject = $EmailSubject;
    //convert HTML into a basic plain-text alternative body
    $mail->msgHTML($MESSAGE_BODY);
    //Replace the plain text body with one created manually
    $mail->AltBody = $MESSAGE_BODY;

    //send the message, check for errors
    if ($mail->send()) {
      // check error
    }
  }
  $message = '<div class="thanks"><p>THANK FOR YOUR ENQUIRY</p></div>';
  // if($lang === 'vn') $message = '<div class="thanks"><p>CẢM ƠN THÔNG TIN CỦA BẠN</p></div>';
  // else if($lang === 'jp') $message = '<div class="thanks"><p>THANK FOR YOUR ENQUIRY jp</p></div>';
  echo json_encode($message);
}