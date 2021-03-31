
import nodemailer, { Transporter } from 'nodemailer';

import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {

    private client: Transporter;

    constructor(){
        //criando conta de teste
        nodemailer.createTestAccount().then((account) => {
            //da documentação em Ethereal mail
            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter;
        });
    }
   
    //criando um método execute para enviar email
    //https://ethereal.email
    async execute(to: string, subject: string, variables: object, path: string) {
        //const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        //utilizando o file sytem para ler o arquivo
        const tamplateFileContent = fs.readFileSync(path).toString("utf8");

        //necessário parse para receber os campos do html
        const mailTemplateParse = handlebars.compile(tamplateFileContent);

        const html = mailTemplateParse(variables)

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br",
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message)); 
    }      
}

//export { SendMailService };
//criar a instancia automaticamente que vai ser chamado de 
//send mail controller
export default new SendMailService();