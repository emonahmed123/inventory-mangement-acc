const { signupService, findUserByEmail, findUserByToken } = require("../service/user.service");
const { generateToken } = require("../utils/token");
 const { sendMailWithGmail, sendMailWithMailGun } = require("../utils/email");

 exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    const token =user.generateConfirmationToken()

    await user.save({ validateBeforeSave: false });

    const mailData = {
      to: [user.email],
      subject: "Verify your Account",
      text: `Thank you for creating your account. Please confirm your account here: ${
        req.protocol
      }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
    };

    await sendMailWithGmail (mailData);

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    
    res.status(500).json({
      status: "fail",
      error:error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

   
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active yet.",
      });
    }

   
    const token = generateToken(user);

    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};


exports.getMe=async(req,res)=>{
  
  try{
   const user =await findUserByEmail(req.user?.email)
   const { password: pwd,_id:id,  confirmationToken:com, shippingAddress:  Street,
   imageURL:ii,
    ...others } = user.toObject();
   res.status(200).json({
    data:user
   })
  }
 
  catch(error){
    res.status(500).json({
      staus:'fail',
      error
    })
  }


}


exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;


    const user = await findUserByToken(token);

    if(!user){
      return res.status(403).json({
        status: "fail",
        error: "Invalid token"
      });
    }

    const expired = new Date() > new Date(user.confirmationTokenExpires);

    if(expired){
      return res.status(401).json({
        status: "fail",
        error: "Token expired"
      });
    }

    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Successfully activated your account.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};