import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/form.css";
import { useNavigate } from "react-router-dom";


//The most common way to allow users to reset passwords is by email. Fortunately, there is a package called flask-mail that provides us with the capacity to send out emails. We can easily import and configure this package in our flask app to send out any automated emails that we desire. Simply run the following to get setup:
pip install flask-mail

//Once the package is installed we need to import the Mail and Message classes into our application. The Mail class contains the configuration that will allow you to sync up with whichever email server you choose. As an example, we establish this setup after creating our app as in below:
app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'app.config['MAIL_PORT'] = 465app.config['MAIL_USE_SSL'] = Trueapp.config['MAIL_USERNAME'] = "username@gmail.com"app.config['MAIL_PASSWORD'] = "password"mail = Mail(app)

//After your mail object is properly configured, we can move on to sending an email. Emails can be constructed by using the Message class that we have imported. Instantiate the object, set the parameters, and then send with the mail object:
msg = Message()msg.subject = "Email Subject"msg.recipients = ['recipient@gmail.com']msg.sender = 'username@gmail.com'msg.body = 'Email body'mail.send(msg)

//The last thing to mention is that this process runs synchronously, meaning that the application will stall until the email is sent. This can be frustrating for users. A workaround is the python Thread module to send the request asynchronously and free up the user. This can be setup as below:
from threading import Threaddef send_email(app, msg):   
 with app.app_context():       
  mail.send(msg)msg = Message()msg.subject = "Email Subject"msg.recipients = ['recipient@gmail.com']msg.sender = 'username@gmail.com'msg.body = 'Email body'Thread(target=send_email, args=(app, msg)).start()

//Once the user enters their email and hits submit, the flask application will receive a POST request with the email contained in the form. We verify that the email submitted is in the database, and then we send the user an email that contains the JWT associated with their account. This can be generated like such,
models.py...   
 def get_reset_token(self, expires=500):       
  return jwt.encode({'reset_password': self.username,                          
   'exp':    time() + expires},                          
   
   key=os.getenv('SECRET_KEY_FLASK'))email.py...def send_email(user):    
   token = user.get_reset_token()   
    msg = Message()    
	msg.subject = "Flask App Password Reset"   
	 msg.sender = os.getenv('MAIL_USERNAME')   
	  msg.recipients = [user.email]   
	   msg.html = render_template('reset_email.html',                                
	   user=user,                                
	   token=token)mail.send(msg)

//It is important that access to the reset page is restricted only to the bearer of the JWT. This ensures that only the account owner can reset the password for their account. Once the user receives the email and clicks on the link, they will be taken back to a page where they can reset their password if the JWT matches. This can be implemented like such:
def verify_reset_token(token):        
try:     username = jwt.decode(token,              
	key=os.getenv('SECRET_KEY_FLASK'))['reset_password']        
	except Exception as e:            
	print(e)            
	return        
	 return User.query.filter_by(username=username).first()

