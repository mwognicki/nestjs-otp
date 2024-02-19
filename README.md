# NestJS OTP Authentication Module

`@ognicki/nestjs-otp` is a NestJS module designed to facilitate OTP (One-Time Password)
authentication within your NestJS applications without relying on external APIs.
Module includes dynamic module registration, an `OtpService` for managing OTP
pairing and verification, and an `OtpGuard` to ensure the validity of provided OTP tokens.

## Who's Behind?

Hello, my name is Marek, and I am a fullstack developer. You can find out more about
me at [www.ognicki.pro](https://www.ognicki.pro) or drop me a message at [marek@ognicki.pro](mailto:marek@ognicki.pro).

## What is OTP Authentication?

<details>

<summary>What is OTP Authentication?</summary>

## What is OTP Authentication?

OTP (One-Time Password) authentication is a method used to verify a user's identity
through the use of a unique, single-use password. Unlike traditional passwords, which
remain static until changed by the user, OTPs are temporary and expire after a short
period of time or upon single use.

### Authenticator Applications

Authenticator applications are a popular form of OTP authentication. These applications
generate time-based OTPs (TOTPs) or HMAC-based OTPs (HOTPs) that can be used to
authenticate users across various services and platforms.

</details>

## Module Dependencies

The `@ognicki/nestjs-otp` module leverages the following dependencies:

### `otpauth` Package

> See https://www.npmjs.com/package/otpauth for more information.

The `otpauth` package is utilized for generating and validating OTPs (One-Time Passwords)
according to the TOTP (Time-Based One-Time Password) and HOTP (HMAC-Based One-Time
Password) algorithms. This package provides robust functionality for handling OTP
generation, ensuring secure and reliable authentication processes.

### `qrcode` Package

> See https://www.npmjs.com/package/qrcode for more information.

The `qrcode` package is employed for generating QR codes that can be scanned by
authenticator applications during the initial setup process. QR codes provide a
convenient way for users to import shared secret keys into their authenticator
applications, streamlining the setup of OTP authentication. By integrating qrcode,
the `@ognicki/nestjs-otp` module facilitates a seamless user experience when
configuring OTP authentication.

## Installation

```shell
npm install --save @ognicki/nestjs-otp
```
or
```shell
yarn add @ognicki/nestjs-otp
```

## Usage

**Secret is a string assigned individually to each user. It should never be set up
globally per application.**

In most scenarios, the `OtpService` might not be directly utilized, as the primary
logic for OTP authentication is handled efficiently by the `OtpGuard`. This guard
orchestrates the OTP authentication process seamlessly within your NestJS application.

The lifecycle of the `OtpGuard` involves the following steps:

1. **Obtaining Request Object:** The `OtpGuard` first retrieves the `Request` object
   from the `ExecutionContext`. This `Request` object encapsulates the HTTP request
   made to the server.
2. **Fetching OTP Secret:** The OTP secret is a crucial component required for OTP
   generation and validation. It is imperative that each user possesses a unique
   OTP secret. By default, a stub string is returned as the OTP secret. However,
   for actual authentication, it's essential to provide a `secretResolver` function.
   This function should retrieve the OTP secret from the user data store or any other
   appropriate source.
3. **Extracting OTP Token:** By default, the OTP token is extracted from the
   `X-One-Time-Password` header of the incoming request. However, you have the
   flexibility to customize both the header name and the logic for extracting
   the OTP token. For instance, you may opt to extract the OTP token from the
   request body instead of the headers, depending on your application's requirements.

### Default `OtpGuard` Behavior

By default, the `OtpGuard` utilizes the HTTP execution context to retrieve the
request and extracts the OTP token from the `X-One-Time-Password` header. This
behavior is suitable for standard HTTP-based authentication scenarios.

## Initial Setup

Import the `OtpModule` into your root `AppModule` or any other module where you
want to use OTP authentication:

```typescript
import { Module } from '@nestjs/common';
import { OtpModule } from '@ognicki/nestjs-otp';

@Module({
  imports: [
    OtpModule.register({
      // Configuration options here
    }),
  ],
})
export class AppModule {}
```

## Securing Endpoints with OTP

```typescript
import { Controller, UseGuards } from '@nestjs/common';
import { OtpGuard } from '@ognicki/nestjs-otp';

@Controller('secure')
export class SecureController {
    
  @UseGuards(OtpGuard)
  async protectedRoute() {
    return 'This route is protected with OTP!';
  }
}
```

## Customizing the Resolvers Logic

The `@ognicki/nestjs-otp` module offers the flexibility to customize resolver
functions, empowering developers to tailor OTP authentication according to their
specific requirements. These resolver functions are utilized by the `OtpGuard`
to handle various aspects of authentication, including obtaining the request
context and extracting the OTP token.

### Customization

You can customize the following resolver functions to adapt OTP authentication
to different use cases:

- **Context Resolver:** Retrieves the execution context, enabling access to the request object.
- **Request Resolver:** Obtains the request object from the execution context, facilitating extraction of relevant data.
- **OTP Resolver:** Retrieves the OTP token from the request, allowing flexibility in token extraction from different parts of the request payload.

Resolvers should be passed as module configuration options.

### Implementation

```typescript
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import otpConfig from "./config/otp.config";
import { OtpModule } from '@ognicki/nestjs-otp';

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

#### `requestResolver`

In the example above:

- This resolver function determines how the request object is obtained.
- It first attempts to retrieve the request from the GraphQL execution context.
- If unsuccessful (e.g., the context is not from a GraphQL resolver), it falls back to obtaining the request from the HTTP context.

#### `secretResolver`

In the example above:

- This resolver function determines how the secret key for OTP generation is obtained.
- It uses the `UserService` to fetch the OTP secret associated with the current user.
- The `UserService` is expected to provide an asynchronous method (`getOtpSecret`) that retrieves the OTP secret based on the user's context.

An `otp.config.ts` file might look like following:

```typescript
import { registerAs } from '@nestjs/config';
import { IOtpModuleOptions } from "@ognicki/nestjs-otp";

export default registerAs('otp', (): IOtpModuleOptions => ({
  label: 'Label',
  issuer: 'Issuer',
}));
```

## `OtpService`

In most use cases, the pairing link and QR codes functions will be used.

Example usage with NestJS controller should look like this:

```typescript
import { Controller, Get } from '@nestjs/common';
import { OtpService } from '@ognicki/nestjs-otp';

@Controller('otp')
@UseGuards(AuthGuard)
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Get('pair')
  async generatePairingLink(): Promise<string> {
    // Generate a pairing link for OTP authentication
    const pairingLink = await this.otpService.pair({
      secret: 'user_secret_key', // Replace with actual user secret
    });
    return pairingLink;
  }

  @Get('qr-image')
  async generateQrImage(@Res() res: Response): Promise<void> {
    // Generate a QR code image for pairing link and display directly from controller
    const pairingLink = await this.otpService.pair({
      secret: 'user_secret_key', // Replace with actual user secret
    });
    const qrDataURL = await this.otpService.qrDataURL(pairingLink);

    // Set response content type as image/png
    res.setHeader('Content-Type', 'image/png');

    // Send the QR code image as response
    res.send(Buffer.from(qrDataURL.split(',')[1], 'base64'));
  }
}
```

**Important:** controller should use the authentication guards, so OTP module
can determine the currently authenticated user.
