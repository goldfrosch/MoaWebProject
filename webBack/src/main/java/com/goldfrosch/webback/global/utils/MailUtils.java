package com.goldfrosch.webback.global.utils;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailUtils {
    private final String email = EmailConfig.email;
    private final String password = EmailConfig.password;

    String host = "smtp.naver.com";

    public void sendEmail(String toEmail, String title, String msg) {
        Properties props = new Properties();

        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", 587);
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(email, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(email));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));

            message.setSubject(title);
            message.setText(msg);

            Transport.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
