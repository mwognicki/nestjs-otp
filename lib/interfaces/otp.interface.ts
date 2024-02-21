import {
  ExecutionContext,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';

import { Request } from 'express';
import * as OTPAuth from 'otpauth/dist/otpauth';

export interface IOtpSecretResolver {
  resolve: (request?: Request) => string | Promise<string>;
}

export type TOtpSecretResolver =
  | IOtpSecretResolver
  | ((request?: Request) => string | Promise<string>);

export type TLabelResolverFn = (request?: Request) => string | Promise<string>;

export type TOtpLabel = string | TLabelResolverFn;

/**
 * Options for the OTP module.
 */
export interface IOtpModuleOptions {
  /**
   * Flag to disable validation of module config options.
   */
  skipValidation?: boolean;

  /**
   * Flag to disable logger warnings on module config resolution.
   */
  silent?: boolean;

  /**
   * The issuer of the OTP.
   */
  issuer: string;

  /**
   * The label of the OTP or label resolver.
   */
  label: TOtpLabel;

  /**
   * Whether to include the issuer in the OTP label.
   */
  issuerInLabel?: boolean;

  /**
   * The algorithm to use for generating the OTP.
   */
  algorithm?: string;

  /**
   * The number of digits in the OTP.
   */
  digits?: number;

  /**
   * The period, in seconds, for which the OTP is valid.
   */
  period?: number;

  /**
   * The header to use for the OTP in the request.
   */
  header?: string;

  /**
   * A function that returns the secret to use for generating the OTP.
   */
  secretResolver?: TOtpSecretResolver | undefined;

  /**
   * A function that returns the OTP from the request.
   */
  otpResolver?: (request: Request) => string | Promise<string> | undefined;

  /**
   * A function that returns the request from the execution context.
   */
  requestResolver?: (context: ExecutionContext) => Request | undefined;

  /**
   * Window of counter values to test.
   */
  window?: number;

  /**
   * Method used for transforming the secret into TOTP-compatible format. Default: 'fromUTF8'.
   */
  secretMethod?: Exclude<keyof typeof OTPAuth.Secret, 'prototype'>;
}

/**
 * Asynchronous options for the OTP module.
 */
export interface IOtpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * An existing instance of the OTP module options.
   */
  useExisting?: Type<IOtpModuleOptions>;

  /**
   * A class that implements the OTP module options.
   */
  useClass?: Type<IOtpModuleOptions>;

  /**
   * A factory function that returns the OTP module options.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<IOtpModuleOptions> | IOtpModuleOptions;

  /**
   * Optional dependencies to inject into the OTP module.
   */
  inject?: any[];

  /**
   * Additional providers to register with the OTP module.
   */
  extraProviders?: Provider[];
}

/**
 * Options for generating an OTP pair.
 */
export interface IOtpPairOpts {
  /**
   * The secret to use for generating the OTP.
   */
  secret: string;
}
