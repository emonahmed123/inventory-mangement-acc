

const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
   const accessToken = await oAuth2Client.getAccessToken();

   let transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       type: "OAuth2",
       user:"imonshomon@gmail.com",
       clientId: process.env.CLIENT_ID,
       clientSecret: process.env.CLIENT_SECRET,
       refreshToken: process.env.REFRESH_TOKEN,
       accessToken: accessToken,
     },
   });


   const mailData = {
    from:"imonshomon@gmail.com" , // sender address
    to: data.to, // list of receivers
    subject: data.subject,
    text: data.text,
    // html: `<b>Hey there! </b>
    //    <br> This is our first message sent with Nodemailer<br/>`,
  };
  console.log(mailData);
  let info = await transporter.sendMail(mailData);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info.messageId;
};




const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
	username: 'api',
	key:process.env.API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
  const result= await mg.messages.create("sandbox5ad274c71eac4053bcad3f8f6368b55b.mailgun.org", {
		from: "Mailgun Sandbox <postmaster@sandbox5ad274c71eac4053bcad3f8f6368b55b.mailgun.org>",
		to: data.to,
        subject: data.subject,
       text: data.text,
	})
  
      return result.id;
  
    }