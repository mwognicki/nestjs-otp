[@ognicki/nestjs-otp](../README.md) / [Exports](../modules.md) / IOtpModuleAsyncOptions

# Interface: IOtpModuleAsyncOptions

Asynchronous options for the OTP module.

## Hierarchy

- `Pick`\<`ModuleMetadata`, ``"imports"``\>

  ↳ **`IOtpModuleAsyncOptions`**

## Table of contents

### Properties

- [extraProviders](IOtpModuleAsyncOptions.md#extraproviders)
- [imports](IOtpModuleAsyncOptions.md#imports)
- [inject](IOtpModuleAsyncOptions.md#inject)
- [useClass](IOtpModuleAsyncOptions.md#useclass)
- [useExisting](IOtpModuleAsyncOptions.md#useexisting)
- [useFactory](IOtpModuleAsyncOptions.md#usefactory)

## Properties

### extraProviders

• `Optional` **extraProviders**: `Provider`[]

Additional providers to register with the OTP module.

#### Defined in

[lib/interfaces/otp.interface.ts:128](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L128)

___

### imports

• `Optional` **imports**: (`Type`\<`any`\> \| `DynamicModule` \| `Promise`\<`DynamicModule`\> \| `ForwardReference`\<`any`\>)[]

Optional list of imported modules that export the providers which are
required in this module.

#### Inherited from

Pick.imports

#### Defined in

node_modules/@nestjs/common/interfaces/modules/module-metadata.interface.d.ts:18

___

### inject

• `Optional` **inject**: `any`[]

Optional dependencies to inject into the OTP module.

#### Defined in

[lib/interfaces/otp.interface.ts:123](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L123)

___

### useClass

• `Optional` **useClass**: `Type`\<[`IOtpModuleOptions`](IOtpModuleOptions.md)\>

A class that implements the OTP module options.

#### Defined in

[lib/interfaces/otp.interface.ts:111](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L111)

___

### useExisting

• `Optional` **useExisting**: `Type`\<[`IOtpModuleOptions`](IOtpModuleOptions.md)\>

An existing instance of the OTP module options.

#### Defined in

[lib/interfaces/otp.interface.ts:106](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L106)

___

### useFactory

• `Optional` **useFactory**: (...`args`: `any`[]) => [`IOtpModuleOptions`](IOtpModuleOptions.md) \| `Promise`\<[`IOtpModuleOptions`](IOtpModuleOptions.md)\>

A factory function that returns the OTP module options.

#### Type declaration

▸ (`...args`): [`IOtpModuleOptions`](IOtpModuleOptions.md) \| `Promise`\<[`IOtpModuleOptions`](IOtpModuleOptions.md)\>

A factory function that returns the OTP module options.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

[`IOtpModuleOptions`](IOtpModuleOptions.md) \| `Promise`\<[`IOtpModuleOptions`](IOtpModuleOptions.md)\>

#### Defined in

[lib/interfaces/otp.interface.ts:116](https://github.com/mwognicki/nestjs-otp/blob/019ed90/lib/interfaces/otp.interface.ts#L116)
