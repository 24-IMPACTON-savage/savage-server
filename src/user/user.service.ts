import { ConflictException, Injectable, UseFilters } from '@nestjs/common';
import { SignUpSeniorRequestDto } from 'src/dto/request.dto';
import { HttpExceptionFilter } from 'src/exception/http.exception.filter';
import { UserRepository } from 'src/model/user.repository';

@UseFilters(new HttpExceptionFilter())
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async signUpSenior(signUpRequestDto: SignUpSeniorRequestDto): Promise<null> {
        console.log(signUpRequestDto)
        const { address, name, contact } = signUpRequestDto

        if(await this.userRepository.findOneByContact(contact)) throw new ConflictException();

        await this.userRepository.saveSenior(contact, name, address);

        return null;
    }
}