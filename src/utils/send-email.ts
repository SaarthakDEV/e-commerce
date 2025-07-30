import nodemailer from "nodemailer";


export const sendEmail = async (email: string, otp: number) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    })

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "OTP for reseting your kartly password",
        html: `
        <p>OTP for your account is <strong>${otp}</strong></p>
        `
    }

    try{
        const info = await transporter.sendMail(mailOptions);
        console.log("Message is sent");
        return info.response;
    }catch(err){
        console.log("Some unexpected error occured while sending mail")
        return null
    }
}