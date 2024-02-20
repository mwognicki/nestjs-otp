import {Controller, Get, UseGuards} from '@nestjs/common';
import {OtpGuard} from '../../guards';

@Controller('test')
export class TestController {
    @UseGuards(OtpGuard)
    @Get('/')
    test(): string {
        return 'test';
    }
}
