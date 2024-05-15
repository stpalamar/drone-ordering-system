import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { default as SendGrid, type MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
    private from: string;

    constructor(private readonly configService: ConfigService) {
        SendGrid.setApiKey(this.configService.get('SENDGRID_API_KEY'));
        this.from = this.configService.get('SENDGRID_EMAIL_FROM');
    }

    private async send(email: Omit<MailDataRequired, 'from'>): Promise<void> {
        await SendGrid.send({
            ...email,
            from: this.from,
        } as MailDataRequired);
    }

    public async sendConfirmationEmail(
        to: string,
        link: string,
    ): Promise<void> {
        const message = {
            to,
            subject: 'Confirm registration on Drone Ordering System',
            html: `<a href="${link}">Confirm registration</a>`,
        };

        await this.send(message);
    }
}
