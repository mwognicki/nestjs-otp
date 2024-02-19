import { UnauthorizedException } from '@nestjs/common';

export class NoOtpException extends UnauthorizedException {
  constructor() {
    super('No OTP provided');
  }
}
