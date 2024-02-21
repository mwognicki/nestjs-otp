import { IOtpModuleOptions, IOtpSecretResolver } from '../interfaces';
import { Test } from '@nestjs/testing';
import { OtpModule } from '../otp.module';
import { TestController } from './test-utils/test.controller';
import request from 'supertest';
import { Request } from 'express';
import { OtpService } from '../services';
import {
  OTP_CONFIG_TOKEN,
  OTP_DEFAULT_HEADER,
  OTP_MIN_SECURE_DIGITS,
  OTP_MIN_SECURE_PERIOD,
} from '../otp.constants';
import { Logger } from '@nestjs/common';
import * as OTPAuth from 'otpauth';

const setup = async (
  config: Partial<IOtpModuleOptions>,
  otpServiceMock?: any,
  useAsyncRegister?: boolean,
) => {
  const module = await Test.createTestingModule({
    imports: [
      !useAsyncRegister
        ? OtpModule.register({ label: 'Label', issuer: 'Issuer', ...config })
        : OtpModule.registerAsync({
            useFactory: () => ({ label: 'Label', issuer: 'Issuer', ...config }),
          }),
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
  });

  describe('otp resolver', () => {
    it('should get OTP from header', async () => {
      let otpValidateMock;
      const otpServiceMock = jest
        .spyOn(OtpService.prototype, 'getTOTP')
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          otpValidateMock = jest.spyOn(totp, 'validate').mockReturnValue(1);
          return totp;
        });

      const secret = '654321',
        token = '123456',
        label = 'some label';

      const otp = await setup({
        secretResolver: () => secret,
        label,
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set('X-One-Time-Password', token)
        .expect(200);

      expect(otpValidateMock).toHaveBeenNthCalledWith(1, { token });
      expect(otpServiceMock).toHaveBeenNthCalledWith(1, { label, secret });

      otpServiceMock.mockRestore();
    });

    it('should get OTP from header when header name is custom (failed)', async () => {
      const otpServiceMock = jest
        .spyOn(OtpService.prototype, 'getTOTP')
        .mockImplementation();

      const secret = '654321',
        token = '123456';

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
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          otpValidateMock = jest.spyOn(totp, 'validate').mockReturnValue(1);
          return totp;
        });

      const secret = '654321',
        token = '123456',
        label = 'some label';

      const otp = await setup({
        secretResolver: () => secret,
        header: 'X-Quick-Brown-Fox-Jumps-Over-Lazy-Dog',
        label,
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set('X-Quick-Brown-Fox-Jumps-Over-Lazy-Dog', token)
        .expect(200);

      expect(otpServiceMock).toHaveBeenNthCalledWith(1, { label, secret });
      expect(otpValidateMock).toHaveBeenNthCalledWith(1, { token });

      otpServiceMock.mockRestore();
    });
  });

  describe('label resolver', () => {
    it('should resolve label from function', async () => {
      const label = 'some label from function';
      const labelResolver = jest.fn().mockReturnValue(label);
      const secret = 'somesecret';

      const otpServiceMock = jest
        .spyOn(OtpService.prototype, 'getTOTP')
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          jest.spyOn(totp, 'validate').mockReturnValue(1);
          return totp;
        });

      const otp = await setup({
        label: labelResolver,
        secretResolver: () => secret,
      });

      await otp.get(OtpService).pair({
        secret,
      });

      await request(otp.getHttpServer())
        .get('/test')
        .set({
          [OTP_DEFAULT_HEADER]: '123456',
        })
        .expect(200);

      expect(labelResolver).toHaveBeenCalledTimes(2);

      otpServiceMock.mockRestore();
      labelResolver.mockRestore();
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
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          jest.spyOn(totp, 'validate').mockReturnValue(null);
          return totp;
        });

      const secret = '654321',
        token = '123456';

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
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          jest.spyOn(totp, 'validate').mockReturnValue(null);
          return totp;
        });

      const secret = '654321';

      const otp = await setup({
        secretResolver: () => secret,
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
        .mockImplementation(() => {
          const totp = new OTPAuth.TOTP({
            secret: OTPAuth.Secret.fromUTF8('any'),
          });
          jest.spyOn(totp, 'validate').mockReturnValue(null);
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

      const config = otp.get<IOtpModuleOptions>(OTP_CONFIG_TOKEN);

      expect(config.digits).toEqual(OTP_MIN_SECURE_DIGITS);
      expect(config.period).toEqual(OTP_MIN_SECURE_PERIOD);
      expect(config.algorithm).toEqual('SHA1');
      expect(config.window).toEqual(1);
      expect(config.secretMethod).toEqual('fromUTF8');
      expect(config.header).toEqual(OTP_DEFAULT_HEADER);
    });

    it('should set defaults on register async', async () => {
      const otp = await setup(
        {
          digits: 1,
          period: 1,
        },
        undefined,
        true,
      );

      const config = otp.get<IOtpModuleOptions>(OTP_CONFIG_TOKEN);

      expect(config.digits).toEqual(OTP_MIN_SECURE_DIGITS);
      expect(config.period).toEqual(OTP_MIN_SECURE_PERIOD);
      expect(config.algorithm).toEqual('SHA1');
      expect(config.window).toEqual(1);
      expect(config.secretMethod).toEqual('fromUTF8');
      expect(config.header).toEqual(OTP_DEFAULT_HEADER);
    });

    it('should NOT set defaults on register async when skipValidation is truthy', async () => {
      const otp = await setup(
        {
          digits: 1,
          period: 1,
          skipValidation: true,
        },
        undefined,
        true,
      );

      const config = otp.get<IOtpModuleOptions>(OTP_CONFIG_TOKEN);

      expect(config.digits).not.toEqual(OTP_MIN_SECURE_DIGITS);
      expect(config.period).not.toEqual(OTP_MIN_SECURE_PERIOD);
      expect(config.algorithm).not.toBeDefined();
      expect(config.window).not.toBeDefined();
      expect(config.secretMethod).not.toBeDefined();
      expect(config.header).not.toBeDefined();
    });

    it('should warn on init', async () => {
      const loggerMock = jest.spyOn(Logger.prototype, 'warn');

      await setup({
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

    it('should not warn on init when in silent mode', async () => {
      const loggerMock = jest.spyOn(Logger.prototype, 'warn');

      await setup({
        digits: 4,
        period: 15,
        silent: true,
      });

      expect(loggerMock).not.toHaveBeenCalledWith(
        `Insecure number of digits provided for OTP (4)`,
      );
      expect(loggerMock).not.toHaveBeenCalledWith(
        `Consider using a different period for OTP instead of 15`,
      );
      expect(loggerMock).not.toHaveBeenCalledWith(
        `No secret resolver provided. Module might not work properly!`,
      );
    });
  });
});
