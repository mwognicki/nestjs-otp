[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / IOtpModuleOptions

# Interface: IOtpModuleOptions

Options for the OTP module.

## Table of contents

### Properties

- [algorithm](IOtpModuleOptions.md#algorithm)
- [digits](IOtpModuleOptions.md#digits)
- [header](IOtpModuleOptions.md#header)
- [issuer](IOtpModuleOptions.md#issuer)
- [issuerInLabel](IOtpModuleOptions.md#issuerinlabel)
- [label](IOtpModuleOptions.md#label)
- [otpResolver](IOtpModuleOptions.md#otpresolver)
- [period](IOtpModuleOptions.md#period)
- [requestResolver](IOtpModuleOptions.md#requestresolver)
- [secretMethod](IOtpModuleOptions.md#secretmethod)
- [secretResolver](IOtpModuleOptions.md#secretresolver)
- [window](IOtpModuleOptions.md#window)

## Properties

### algorithm

• `Optional` **algorithm**: `string`

The algorithm to use for generating the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:41](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L41)

___

### digits

• `Optional` **digits**: `number`

The number of digits in the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:46](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L46)

___

### header

• `Optional` **header**: `string`

The header to use for the OTP in the request.

#### Defined in

[lib/interfaces/otp.interface.ts:56](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L56)

___

### issuer

• **issuer**: `string`

The issuer of the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:26](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L26)

___

### issuerInLabel

• `Optional` **issuerInLabel**: `boolean`

Whether to include the issuer in the OTP label.

#### Defined in

[lib/interfaces/otp.interface.ts:36](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L36)

___

### label

• **label**: `string`

The label of the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:31](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L31)

___

### otpResolver

• `Optional` **otpResolver**: (`request`: `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>) => `string` \| `Promise`\<`string`\>

A function that returns the OTP from the request.

#### Type declaration

▸ (`request`): `string` \| `Promise`\<`string`\>

A function that returns the OTP from the request.

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |

##### Returns

`string` \| `Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:66](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L66)

___

### period

• `Optional` **period**: `number`

The period, in seconds, for which the OTP is valid.

#### Defined in

[lib/interfaces/otp.interface.ts:51](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L51)

___

### requestResolver

• `Optional` **requestResolver**: (`context`: `ExecutionContext`) => `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

A function that returns the request from the execution context.

#### Type declaration

▸ (`context`): `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

A function that returns the request from the execution context.

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

##### Returns

`Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\>

#### Defined in

[lib/interfaces/otp.interface.ts:71](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L71)

___

### secretMethod

• `Optional` **secretMethod**: ``"fromLatin1"`` \| ``"fromUTF8"`` \| ``"fromBase32"`` \| ``"fromHex"``

Method used for transforming the secret into TOTP-compatible format. Default: 'fromUTF8'.

#### Defined in

[lib/interfaces/otp.interface.ts:81](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L81)

___

### secretResolver

• `Optional` **secretResolver**: [`TOtpSecretResolver`](../modules.md#totpsecretresolver)

A function that returns the secret to use for generating the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:61](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L61)

___

### window

• `Optional` **window**: `number`

Window of counter values to test.

#### Defined in

[lib/interfaces/otp.interface.ts:76](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/interfaces/otp.interface.ts#L76)
