import { Controller, Body, Get, Param, Post } from '@nestjs/common';
import { BaseController } from './BaseController';
import { TestModel } from '../models/TestModel';

@Controller('tests')
export class TestController extends BaseController {

    @Get('/')
    public getAll(): any {
        return this.array([
            {
                test: 'hello world1',
            },
            {
                test: 'hello world2',
            },
            {
                test: 'hello world3',
            },
        ]);
    }

    @Get('/get/:id')
    public getOne( @Param('id') id: number): any {
        return this.single({
            test: 'hello world',
        });
    }

    @Post()
    public post( @Body() user: TestModel): any {
        return this.success();
    }
}
