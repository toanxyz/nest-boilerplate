import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseModel } from './BaseModel';

export class TestModel extends BaseModel {

    @ApiModelProperty()
    @IsString()
    public userName: string;

    public toString(): string {
        return `${this.userName}`;
    }
}
