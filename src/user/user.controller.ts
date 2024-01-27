import { Body, Controller, InternalServerErrorException, Post, Req, Res, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpResponseDto } from 'src/dto/response.dto';
import { SignUpSeniorRequestDto } from 'src/dto/request.dto';
import { HttpExceptionFilter } from 'src/exception/http.exception.filter';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('USER')
@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    @ApiOperation({ summary : "농부 회원가입 전용" })
    @ApiBody({ type: SignUpSeniorRequestDto })
    @ApiCreatedResponse({
        status: 201,
        description: "201 Created"
    })
    @ApiConflictResponse({
        status: 409,
        description: "409 Conflict - 이미 존재하는 전화번호로 가입 시도"
    })
    @Post('/senior')
    async signUpSenior(@Body() signUpRequestDto: SignUpSeniorRequestDto ): Promise<SignUpResponseDto> {
        try{
            if(!signUpRequestDto) throw new InternalServerErrorException()
            const data = await this.userService.signUpSenior(signUpRequestDto);
    
            return {
                data,
                statusCode: 201,
                statusMsg: "Created"
            }
        } catch(e) {
            console.error(e)
            return e
        }
    }
}