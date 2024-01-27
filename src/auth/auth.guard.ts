import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { configDotenv } from 'dotenv';
import { HttpExceptionFilter } from 'src/exception/http.exception.filter';

configDotenv()

@UseFilters(new HttpExceptionFilter())
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(
		context: ExecutionContext,
	):Promise<boolean> {
		const req = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(req);

		if(!token) throw new UnauthorizedException();

		const payload = await this.jwtService.verifyAsync (
		token,
		{ secret : process.env.SECRET }
		);
		req['user'] = payload;

		return true;
	}

	private extractTokenFromHeader(req: Request): string | undefined {
		const [type, token] = req.headers.authorization?.split(" ") ?? [];
		return type === 'Bearer' ? token : undefined
	}
}
