# NestJS OTP Authentication Module

`@ognicki/nestjs-otp` is a NestJS module designed to provide OTP (One-Time Password) 
authentication within your NestJS applications without relying on external APIs. The 
module includes dynamic module registration, an `OtpService` for managing OTP pairing and 
verification, and an `OtpGuard` to ensure the validity of provided OTP tokens.

> **You can use authenticator applications to generate OTP tokens,** and they will be handled
> by `OtpModule`.

## Who's Behind?

Hello, my name is Marek, and I am a fullstack developer. You can find out more about
me at [www.ognicki.pro](https://www.ognicki.pro) or drop me a message at [marek@ognicki.pro](mailto:marek@ognicki.pro).

## What is OTP Authentication?

<details>

<summary>What is OTP Authentication?</summary>

One-Time Password (OTP) authentication is a method of verifying a user's identity by 
using a unique, one-time password. Unlike traditional passwords, which remain static 
until changed by the user, OTPs are temporary and expire after a short period of time or 
after a single use.

### Authenticator Applications

Authenticator applications are a popular form of OTP authentication. These applications 
generate time-based OTPs (TOTPs) or HMAC-based OTPs (HOTPs) that can be used to authenticate
users across multiple services and platforms.

> The `otpauth` package under the hood of this module works with time-based OTPs.

#### Time-Based OTPs

Tokens in time-based one-time passwords (TOTPs) are generated using cryptographic algorithms. 
A secret key shared between the authentication device and the server is scrambled with the 
timestamp using one of the cryptographic algorithms and optionally processed to match the 
pre-defined length of a token.

**This means one secret per user, not per application.** 

The optimal solution would be to have 
one secret per user per device, but this is not implemented in the module (yet?). Of course, 
in production environments, the secrets should not be stored on the server side without 
encryption, as any unwanted party could intercept them and thus have all they need to generate 
OTP tokens, thus violating the security of the application.

</details>

## Module Dependencies

The `@ognicki/nestjs-otp` module uses the following dependencies:

### `otpauth` Package

> See https://www.npmjs.com/package/otpauth for more information.

The `otpauth` package is used to generate and validate OTPs (One-Time Passwords) using the 
TOTP (Time-Based One-Time Password) and HOTP (HMAC-Based One-Time Password) algorithms. 
The package provides a complete OTP management solution to enable secure and reliable 
authentication processes.

### `qrcode` Package

> See https://www.npmjs.com/package/qrcode for more information.

The `qrcode` package is used to generate QR codes to be scanned by authenticator applications 
during the initial setup process. QR codes provide a convenient way for users to import shared 
secret keys into their authenticator applications, simplifying the setup of OTP authentication. 
By integrating `qrcode`, the module provides a consistent and painless way for you to configure 
OTP authentication. when configuring OTP authentication.

## Installation

```shell
npm install --save @ognicki/nestjs-otp
```
or
```shell
yarn add @ognicki/nestjs-otp
```

## Usage

**Secret is a string assigned to each user individually. It should never be set globally per 
application.**

In most scenarios, the `OtpService` may not be used directly, since the primary logic 
for OTP authentication logic is done efficiently by the `OtpGuard`. The guard manages the 
OTP authentication process inside your NestJS application without any hassle.

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

#### `label` as Function

You can also configure `label` as a function to resolve OTP label dynamically, eg from `Request`.
This can be used to assign different labels to different users, so in the authenticator application,
your project will be presented as _Your Project: john@doe.com_, where _Your Project_ is the value
of `issuer`, and _john@doe.com_ - dynamically resolved `label` from current user

#### Sample OTP Configuration File

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
