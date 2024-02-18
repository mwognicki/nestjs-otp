@ognicki/nestjs-otp / [Exports](modules.md)

# NestJS OTP Authentication Module

package-name is a NestJS module designed to facilitate OTP (One-Time Password) 
authentication within your NestJS applications without relying on external APIs. 
Module includes dynamic module registration, an OtpService for managing OTP 
pairing and verification, and an OtpGuard to ensure the validity of provided OTP tokens.

## Reference

See `./docs` for more information.

## Module Dependencies

The package-name module leverages the following dependencies:

### otpauth Package

The otpauth package is utilized for generating and validating OTPs (One-Time Passwords) according to the TOTP (Time-Based One-Time Password) and HOTP (HMAC-Based One-Time Password) algorithms. This package provides robust functionality for handling OTP generation, ensuring secure and reliable authentication processes.

### qrcode Package

The qrcode package is employed for generating QR codes that can be scanned by authenticator applications during the initial setup process. QR codes provide a convenient way for users to import shared secret keys into their authenticator applications, streamlining the setup of OTP authentication. By integrating qrcode, the package-name module facilitates a seamless user experience when configuring OTP authentication.

<details>

<summary>What is OTP Authentication?</summary>

## What is OTP Authentication?

OTP (One-Time Password) authentication is a method used to verify a user's identity 
through the use of a unique, single-use password. Unlike traditional passwords, which 
remain static until changed by the user, OTPs are temporary and expire after a short 
period of time or upon single use.

### Authenticator Applications

Authenticator applications are a popular form of OTP authentication. These applications generate time-based OTPs (TOTPs) or HMAC-based OTPs (HOTPs) that can be used to authenticate users across various services and platforms.

</details>

## Installation

```shell
npm install --save @ognicki/nestjs-otp
```
or
```shell
yarn add @ognicki/nestjs-otp
```

## Usage

### Basic Usage

Import the OtpModule into your root AppModule or any other module where you want to use OTP authentication:

```typescript
import { Module } from '@nestjs/common';
import { OtpModule } from 'package-name';

@Module({
  imports: [
    OtpModule.register({
      // Configuration options here
    }),
  ],
})
export class AppModule {}
```

### Using Resolvers

The package-name module offers the flexibility to customize resolver functions, empowering developers to tailor OTP authentication according to their specific requirements. These resolver functions are utilized by the OtpGuard to handle various aspects of authentication, including obtaining the request context and extracting the OTP token.

#### Default Behavior

By default, the OtpGuard utilizes the HTTP execution context to retrieve the request and extracts the OTP token from the X-One-Time-Password header. This behavior is suitable for standard HTTP-based authentication scenarios.

#### Customizing Resolvers

You can customize the following resolver functions to adapt OTP authentication to different use cases:

- **Context Resolver:** Retrieves the execution context, enabling access to the request object.
- **Request Resolver:** Obtains the request object from the execution context, facilitating extraction of relevant data.
- **OTP Resolver:** Retrieves the OTP token from the request, allowing flexibility in token extraction from different parts of the request payload.

### Implementation

requestResolver

- This resolver function determines how the request object is obtained.
- It first attempts to retrieve the request from the GraphQL execution context.
- If unsuccessful (e.g., the context is not from a GraphQL resolver), it falls back to obtaining the request from the HTTP context.
  secretResolver

This resolver function determines how the secret key for OTP generation is obtained.
It uses the UserService to fetch the OTP secret associated with the current user.
The UserService is expected to provide an asynchronous method (getOtpSecret) that retrieves the OTP secret based on the user's context.

```typescript
import { Module } from '@nestjs/common';
import otpConfig from "./config/otp.config";
import { OtpModule } from 'package-name';

@Module({
  imports: [
      OtpModule.registerAsync({
          imports: [ConfigModule.forFeature(otpConfig), UserModule],
          useFactory: (configService: ConfigService, userService: UserService) => ({
              ...configService.get('otp'),
              requestResolver: (context: ExecutionContext) => {
                  try {
                      const ctx = GqlExecutionContext.create(context);
                      return ctx.getContext().req;
                  } catch {
                      return context.switchToHttp().getRequest();
                  }
              },
              secretResolver: async (request: Request) => {
                  const user = getUserFromRequestOrSomewhereElse(request);
                  return userService.getOtpSecret(user);
              },
              header: undefined,
          }),
          inject: [ConfigService, UserService],
      }),
  ],
})
export class AppModule {}
```
