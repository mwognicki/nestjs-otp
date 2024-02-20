import { IOtpModuleOptions, IOtpSecretResolver } from '../interfaces';
import { Test } from '@nestjs/testing';
import { OtpModule } from '../otp.module';
import { TestController } from './test-utils/test.controller';
import request from 'supertest';
import { Request } from 'express';
import { OtpService } from '../services';
import {
  OTP_DEFAULT_HEADER,
  OTP_MIN_SECURE_DIGITS,
  OTP_MIN_SECURE_PERIOD,
} from '../otp.constants';
import { Logger } from '@nestjs/common';
import * as OTPAuth from "otpauth";

const setup = async (
  config: Partial<IOtpModuleOptions>,
  otpServiceMock?: any,
) => {
  const module = await Test.createTestingModule({
    imports: [
      OtpModule.register({ label: 'Label', issuer: 'Issuer', ...config }),
    ],
    providers: otpServiceMock
      ? [
          {
            provide: OtpService,
            useExisting: otpServiceMock,
          },
        ]
      : [],
    controllers: [TestController],
  }).compile();

  const app = module.createNestApplication();
  return app.init();
};

const createSecretResolver = (mock: Function) => {
  return new (class implements IOtpSecretResolver {
    resolve(request: Request) {
      return mock(request);
    }
  })();
};

describe('OtpModule', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('otp resolver', () => {
    it('should get OTP from header', async () => {
      let otpValidateMock;
      const otpServiceMock = jest
        .spyOn(OtpService.prototype, 'getTOTP')
        .mockImplementation( () => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          otpValidateMock = jest.spyOn(totp, 'validate').mockReturnValue(1)
          return totp;
        });

      const secret = '654321', token = '123456';

      const otp = await setup({
        secretResolver: () => secret,
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set('X-One-Time-Password', token)
        .expect(200);

      expect(otpValidateMock).toHaveBeenNthCalledWith(1, {token});
      expect(otpServiceMock).toHaveBeenNthCalledWith(1, {secret});

      otpServiceMock.mockRestore();
    });

    it('should get OTP from header when header name is custom (failed)', async () => {
      const otpServiceMock = jest
        .spyOn(OtpService.prototype, 'getTOTP')
        .mockImplementation();

      const secret = '654321', token = '123456';

      const otp = await setup({
        secretResolver: () => secret,
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set('X-Quick-Brown-Fox-Jumps-Over-Lazy-Dog', token)
        .expect(401);

      expect(otpServiceMock).not.toHaveBeenCalled();

      otpServiceMock.mockRestore();
    });

    it('should get OTP from header when header name is custom (success)', async () => {
      let otpValidateMock;
      const otpServiceMock = jest
          .spyOn(OtpService.prototype, 'getTOTP')
          .mockImplementation( () => {
            const totp = new OTPAuth.TOTP({
              secret: OTPAuth.Secret.fromUTF8('any'),
            });
            otpValidateMock = jest.spyOn(totp, 'validate').mockReturnValue(1)
            return totp;
          });

      const secret = '654321', token = '123456';

      const otp = await setup({
        secretResolver: () => secret,
        header: 'X-Quick-Brown-Fox-Jumps-Over-Lazy-Dog',
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set('X-Quick-Brown-Fox-Jumps-Over-Lazy-Dog', token)
        .expect(200);

      expect(otpServiceMock).toHaveBeenNthCalledWith(1, {secret});
      expect(otpValidateMock).toHaveBeenNthCalledWith(1, {token});

      otpServiceMock.mockRestore();
    });
  });

  describe('secret resolver', () => {
    it('should set up the secret resolver as function', async () => {
      const secretResolver = jest.fn();
      secretResolver.mockReturnValue('secret');
      const requestResolver = jest.fn();
      const otpResolver = jest.fn();
      otpResolver.mockReturnValue('123456');
      const otp = await setup({
        secretResolver,
        requestResolver,
        otpResolver,
      });

      await request(otp.getHttpServer()).get('/test').expect(401);

      expect(requestResolver).toHaveBeenCalled();
      expect(otpResolver).toHaveBeenCalled();
      expect(secretResolver).toHaveBeenCalled();
    });

    it('should set up the secret resolver as class', async () => {
      const secretResolver = jest.fn();
      secretResolver.mockReturnValue('secret');
      const secretResolverClass = createSecretResolver(secretResolver);
      const requestResolver = jest.fn();
      const otpResolver = jest.fn();
      otpResolver.mockReturnValue('123456');
      const otp = await setup({
        secretResolver: secretResolverClass,
        requestResolver,
        otpResolver,
      });

      await request(otp.getHttpServer()).get('/test').expect(401);

      expect(requestResolver).toHaveBeenCalled();
      expect(otpResolver).toHaveBeenCalled();
      expect(secretResolver).toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('should throw invalid OTP exception (length mismatch)', async () => {
      const otpServiceMock = jest
          .spyOn(OtpService.prototype, 'getTOTP')
          .mockImplementation( () => {
            const totp = new OTPAuth.TOTP({
              secret: OTPAuth.Secret.fromUTF8('any'),
            });
            jest.spyOn(totp, 'validate').mockReturnValue(null)
            return totp;
          });

      const secret = '654321', token = '123456';

      const otp = await setup({
        secretResolver: () => secret,
        digits: 8,
      });

      const response = await request(otp.getHttpServer())
        .get('/test')
        .set('X-One-Time-Password', token)
        .expect(401);

      expect(JSON.parse(response.text)).toMatchObject({
        message: 'Invalid OTP (length mismatch)',
      });

      otpServiceMock.mockRestore();
    });

    it('should throw no OTP exception', async () => {
      const otpServiceMock = jest
          .spyOn(OtpService.prototype, 'getTOTP')
          .mockImplementation( () => {
            const totp = new OTPAuth.TOTP({
              secret: OTPAuth.Secret.fromUTF8('any'),
            });
            jest.spyOn(totp, 'validate').mockReturnValue(null)
            return totp;
          });

      const secret = '654321'

      const otp = await setup({
        secretResolver: () => secret
      });

      const response = await request(otp.getHttpServer())
        .get('/test')
        .expect(401);

      expect(JSON.parse(response.text)).toMatchObject({
        message: 'No OTP provided',
      });

      otpServiceMock.mockRestore();
    });

    it('should throw no secret exception', async () => {
      const otpServiceMock = jest
          .spyOn(OtpService.prototype, 'getTOTP')
          .mockImplementation( () => {
            const totp = new OTPAuth.TOTP({
              secret: OTPAuth.Secret.fromUTF8('any'),
            });
            jest.spyOn(totp, 'validate').mockReturnValue(null)
            return totp;
          });

      const otp = await setup({
        otpResolver: () => '123456',
      });

      const response = await request(otp.getHttpServer())
        .get('/test')
        .expect(401);

      expect(JSON.parse(response.text)).toMatchObject({
        message: 'No secret provided',
      });

      otpServiceMock.mockRestore();
    });

    it('should set defaults', async () => {
      const otp = await setup({
        digits: 1,
        period: 1,
      });

      const otpService = otp.get(OtpService);

      expect(otpService.config.digits).toEqual(OTP_MIN_SECURE_DIGITS);
      expect(otpService.config.period).toEqual(OTP_MIN_SECURE_PERIOD);
      expect(otpService.config.algorithm).toEqual('SHA1');
      expect(otpService.config.window).toEqual(1);
      expect(otpService.config.secretMethod).toEqual('fromUTF8');
      expect(otpService.config.header).toEqual(OTP_DEFAULT_HEADER);
    });

    it('should warn on init', async () => {
      const loggerMock = jest.spyOn(Logger.prototype, 'warn');

      const otp = await setup({
        digits: 4,
        period: 15,
      });

      expect(loggerMock).toHaveBeenCalledWith(
        `Insecure number of digits provided for OTP (4)`,
      );
      expect(loggerMock).toHaveBeenCalledWith(
        `Consider using a different period for OTP instead of 15`,
      );
      expect(loggerMock).toHaveBeenCalledWith(
        `No secret resolver provided. Module might not work properly!`,
      );
    });
  });
});
