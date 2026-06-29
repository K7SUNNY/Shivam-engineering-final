<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize form data
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $phone   = htmlspecialchars(trim($_POST['phone']));
    $service = htmlspecialchars(trim($_POST['service']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Receiver email (Your company)
    $to = "info@shivamengineering.in";
    $subject = "New Contact Form Submission from $name";

    // Email body to your company
    $body = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Phone:</strong> {$phone}</p>
    <p><strong>Service Required:</strong> {$service}</p>
    <p><strong>Project Details:</strong><br>{$message}</p>
    ";

    // Common headers
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: Shivam Engineering <info@shivamengineering.in>\r\n";
    $headers .= "Reply-To: {$email}\r\n";

    // Send email to company
    $mailSentToCompany = mail($to, $subject, $body, $headers);

    // Send acknowledgment email to the user
    $ackSubject = "We’ve received your message – Shivam Engineering";
    $ackBody = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <h2 style='color: #0b5394;'>Thank you, {$name}!</h2>
        <p>We’ve received your inquiry regarding <strong>{$service}</strong> and our team will get in touch with you soon.</p>
        <p>Here’s a summary of what you sent us:</p>
        <hr>
        <p><strong>Project Details:</strong><br>{$message}</p>
        <hr>
        <p style='color: #555;'>Best regards,<br><strong>Shivam Engineering Team</strong><br>
        <a href='https://shivamengineering.in' style='color:#0b5394;'>www.shivamengineering.in</a></p>
    </body>
    </html>
    ";

    $ackHeaders  = "MIME-Version: 1.0\r\n";
    $ackHeaders .= "Content-type:text/html;charset=UTF-8\r\n";
    $ackHeaders .= "From: Shivam Engineering <info@shivamengineering.in>\r\n";
    $ackHeaders .= "Reply-To: info@shivamengineering.in\r\n";

    $mailSentToUser = mail($email, $ackSubject, $ackBody, $ackHeaders);

    // Response handling
    if ($mailSentToCompany && $mailSentToUser) {
        http_response_code(200);
        echo "Mail sent successfully";
    } else {
        http_response_code(500);
        echo "Mail failed";
    }

} else {
    http_response_code(403);
    echo "Forbidden";
}
?>
