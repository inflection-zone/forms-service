import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { ConfigurationManager } from '../config/configuration.manager';
import { MockMessagingService } from './sms/providers/mock.messaging.service';
import { SendGridEmailService } from './email/providers/sendgrid.email.service';
import { SMTPEmailService } from './email/providers/smtp.email.service';
import { FileStorageInjector } from './storage/file.storage.injector';
import { FileResourceRepo } from '../database/repositories/file.resource.repo';

////////////////////////////////////////////////////////////////////////////////

export class ModuleInjector {
    public static registerInjections(container: DependencyContainer) {
        ModuleInjector.injectEmailProvider(container);
        ModuleInjector.injectSmsProvider(container);
        FileStorageInjector.registerInjections(container);
        container.register('IFileResourceRepo', FileResourceRepo);
    }

    private static injectSmsProvider(container: DependencyContainer) {
        const smsProvider = ConfigurationManager.SmsProvider();
        if (smsProvider === 'Twilio') {
            // container.register('IMessagingService', TwilioMessagingService);
        } else if (smsProvider === 'Mock') {
            container.register('IMessagingService', MockMessagingService);
        }
    }

    private static injectEmailProvider(container: DependencyContainer) {
        const emailProvider = ConfigurationManager.EmailProvider();
        if (emailProvider === 'SendGrid') {
            container.register('IEmailService', SendGridEmailService);
        } else if (emailProvider === 'SMTP') {
            container.register('IEmailService', SMTPEmailService);
        }
    }
}
