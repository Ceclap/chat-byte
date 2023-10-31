import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[
	MailerModule.forRoot({
		transport: {
		host: 'smtp.mail.ru',
		port: 465,
		secure: true,
		auth: {
			user: 'dream_recover@mail.ru',
			pass: '02j7BMnNFXGntaqtZBze'
		}
		},
		defaults: {
		from: 'dream_recover@mail.ru',
		}
	}),
  ],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
