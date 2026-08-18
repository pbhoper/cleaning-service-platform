import { Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authRepository;
    constructor(authRepository: Repository<Auth>);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<Auth>;
}
export {};
