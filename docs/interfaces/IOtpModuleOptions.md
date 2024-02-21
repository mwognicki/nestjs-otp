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
- [silent](IOtpModuleOptions.md#silent)
- [skipValidation](IOtpModuleOptions.md#skipvalidation)
- [window](IOtpModuleOptions.md#window)

## Properties

### algorithm

• `Optional` **algorithm**: `string`

The algorithm to use for generating the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:55](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L55)

___

### digits

• `Optional` **digits**: `number`

The number of digits in the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:60](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L60)

___

### header

• `Optional` **header**: `string`

The header to use for the OTP in the request.

#### Defined in

[lib/interfaces/otp.interface.ts:70](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L70)

___

### issuer

• **issuer**: `string`

The issuer of the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:40](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L40)

___

### issuerInLabel

• `Optional` **issuerInLabel**: `boolean`

Whether to include the issuer in the OTP label.

#### Defined in

[lib/interfaces/otp.interface.ts:50](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L50)

___

### label

• **label**: [`TOtpLabel`](../modules.md#totplabel)

The label of the OTP or label resolver.

#### Defined in

[lib/interfaces/otp.interface.ts:45](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L45)

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

[lib/interfaces/otp.interface.ts:80](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L80)

___

### period

• `Optional` **period**: `number`

The period, in seconds, for which the OTP is valid.

#### Defined in

[lib/interfaces/otp.interface.ts:65](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L65)

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

[lib/interfaces/otp.interface.ts:85](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L85)

___

### secretMethod

• `Optional` **secretMethod**: ``"fromLatin1"`` \| ``"fromUTF8"`` \| ``"fromBase32"`` \| ``"fromHex"``

Method used for transforming the secret into TOTP-compatible format. Default: 'fromUTF8'.

#### Defined in

[lib/interfaces/otp.interface.ts:95](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L95)

___

### secretResolver

• `Optional` **secretResolver**: [`TOtpSecretResolver`](../modules.md#totpsecretresolver)

A function that returns the secret to use for generating the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:75](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L75)

___

### silent

• `Optional` **silent**: `boolean`

Flag to disable logger warnings on module config resolution.

#### Defined in

[lib/interfaces/otp.interface.ts:35](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L35)

___

### skipValidation

• `Optional` **skipValidation**: `boolean`

Flag to disable validation of module config options.

#### Defined in

[lib/interfaces/otp.interface.ts:30](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L30)

___

### window

• `Optional` **window**: `number`

Window of counter values to test.

#### Defined in

[lib/interfaces/otp.interface.ts:90](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L90)
