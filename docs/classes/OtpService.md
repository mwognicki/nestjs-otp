[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / OtpService

# Class: OtpService

## Table of contents

### Constructors

- [constructor](OtpService.md#constructor)

### Properties

- [\_config](OtpService.md#_config)
- [logger](OtpService.md#logger)

### Accessors

- [config](OtpService.md#config)

### Methods

- [getTOTP](OtpService.md#gettotp)
- [pair](OtpService.md#pair)
- [qrDataURL](OtpService.md#qrdataurl)
- [qrString](OtpService.md#qrstring)
- [secret](OtpService.md#secret)

## Constructors

### constructor

• **new OtpService**(`_config`): [`OtpService`](OtpService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_config` | [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md) |

#### Returns

[`OtpService`](OtpService.md)

#### Defined in

[lib/services/otp.service.ts:26](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L26)

## Properties

### \_config

• `Private` **\_config**: [`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)

#### Defined in

[lib/services/otp.service.ts:26](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L26)

___

### logger

• `Private` `Readonly` **logger**: `Logger`

#### Defined in

[lib/services/otp.service.ts:24](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L24)

## Accessors

### config

• `get` **config**(): `Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Returns

`Required`\<[`IOtpModuleOptions`](../interfaces/IOtpModuleOptions.md)\>

#### Defined in

[lib/services/otp.service.ts:28](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L28)

## Methods

### getTOTP

▸ **getTOTP**(`opts`): `TOTP`

Generate a TOTP object with the given options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpPairOpts`](../interfaces/IOtpPairOpts.md) | Options for generating the TOTP object. |

#### Returns

`TOTP`

The generated TOTP object.

#### Defined in

[lib/services/otp.service.ts:72](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L72)

___

### pair

▸ **pair**(`opts`): `Promise`\<`string`\>

Return a link for pairing with authenticator application.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | [`IOtpPairOpts`](../interfaces/IOtpPairOpts.md) | Options for generating the subscription. |

#### Returns

`Promise`\<`string`\>

Link for pairing with authenticator application.

#### Defined in

[lib/services/otp.service.ts:61](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L61)

___

### qrDataURL

▸ **qrDataURL**(`link`): `Promise`\<`string`\>

Generate a QR code as a data URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | The link to encode in the QR code. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the data URL of the QR code.

#### Defined in

[lib/services/otp.service.ts:85](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L85)

___

### qrString

▸ **qrString**(`link`): `Promise`\<`string`\>

Generate a QR code as a string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | The link to encode in the QR code. |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the string representation of the QR code.

#### Defined in

[lib/services/otp.service.ts:102](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L102)

___

### secret

▸ **secret**(`length?`): `string`

Generate a random secret for the OTP.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `length` | `number` | `OTP_DEFAULT_SECRET_LENGTH` | The length of the secret, in characters. |

#### Returns

`string`

The generated secret.

#### Defined in

[lib/services/otp.service.ts:38](https://github.com/mwognicki/nestjs-otp/blob/77280bc/lib/services/otp.service.ts#L38)
