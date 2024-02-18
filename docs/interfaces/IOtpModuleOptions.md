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
- [secretResolver](IOtpModuleOptions.md#secretresolver)

## Properties

### algorithm

• `Optional` **algorithm**: `string`

The algorithm to use for generating the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:31](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L31)

___

### digits

• `Optional` **digits**: `number`

The number of digits in the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:36](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L36)

___

### header

• `Optional` **header**: `string`

The header to use for the OTP in the request.

#### Defined in

[lib/interfaces/otp.interface.ts:46](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L46)

___

### issuer

• **issuer**: `string`

The issuer of the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:16](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L16)

___

### issuerInLabel

• `Optional` **issuerInLabel**: `boolean`

Whether to include the issuer in the OTP label.

#### Defined in

[lib/interfaces/otp.interface.ts:26](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L26)

___

### label

• **label**: `string`

The label of the OTP.

#### Defined in

[lib/interfaces/otp.interface.ts:21](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L21)

___

### otpResolver

• `Optional` **otpResolver**: (`request`: `Request`) => `string` \| `Promise`\<`string`\>

A function that returns the OTP from the request.

#### Type declaration

▸ (`request`): `string` \| `Promise`\<`string`\>

A function that returns the OTP from the request.

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |

##### Returns

`string` \| `Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:56](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L56)

___

### period

• `Optional` **period**: `number`

The period, in seconds, for which the OTP is valid.

#### Defined in

[lib/interfaces/otp.interface.ts:41](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L41)

___

### requestResolver

• `Optional` **requestResolver**: (`context`: `ExecutionContext`) => `Request`

A function that returns the request from the execution context.

#### Type declaration

▸ (`context`): `Request`

A function that returns the request from the execution context.

##### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `ExecutionContext` |

##### Returns

`Request`

#### Defined in

[lib/interfaces/otp.interface.ts:61](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L61)

___

### secretResolver

• `Optional` **secretResolver**: (`request?`: `Request`) => `Promise`\<`string`\>

A function that returns the secret to use for generating the OTP.

#### Type declaration

▸ (`request?`): `Promise`\<`string`\>

A function that returns the secret to use for generating the OTP.

##### Parameters

| Name | Type |
| :------ | :------ |
| `request?` | `Request` |

##### Returns

`Promise`\<`string`\>

#### Defined in

[lib/interfaces/otp.interface.ts:51](https://github.com/mwognicki/nestjs-otp/blob/5a13316/lib/interfaces/otp.interface.ts#L51)
