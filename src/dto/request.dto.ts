import { IsNumberString, IsString, MaxLength } from 'class-validator'
export class SignUpSeniorRequestDto {
    @IsString()
    @MaxLength(50)
    name: string

    @IsNumberString()
    @MaxLength(12)
    contact: string

    @IsString()
    address: string
}

export class SignUpWorkerRequestDto {
    @IsString()
    @MaxLength(50)
    name: string

    @IsNumberString()
    @MaxLength(12)
    contact: string

    @IsString()
    address: string
}