import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(mail:string, subject:string, message:string){
	const options = {
		from: 'dream_recover@mail.ru',
		to: mail,
		subject: subject,
		text: message
	};
	const info = await this.mailerService.sendMail(options);
	console.log('Message sent: %s', info.messageId);
  }
}
