import {client , sender} from './mailtrap.config.js'
import {VERIFICATION_EMAIL_TEMPLATE} from './emailTemplates.js'

export const sendVerificationEmail = async (email , verificationToken) =>{

    const recipient = [{email}];
    try{
        const response = await client.send({
            from:sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , verificationToken),
            category: "Email Verification"
        })
    }

    catch(error){
        console.log(error);
        throw new Error(`Error sending verification Email : ${error}`);
    }

}