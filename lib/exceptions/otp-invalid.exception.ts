import { UnauthorizedException } from '@nestjs/common';

export class OtpInvalidException extends UnauthorizedException {
  constructor() {
    super('Invalid OTP (length mismatch)');
  }
}
