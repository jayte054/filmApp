import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthDto, SignInDto, UpdateUserDto } from "./authDto";
import { AuthEntity } from "./authEntity";
import { AuthObject, SignInObject } from "./types";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthModuleRepository extends Repository<AuthEntity> {
    constructor(
        private dataSource: DataSource,
    ){
        super(AuthEntity, dataSource.createEntityManager())   
    }

    async registerUser( authDto: AuthDto): Promise<AuthObject> {
        const {fullName, email, password, isAdmin} = authDto;

        const newUser = new AuthEntity();

        const salt = await bcrypt.genSalt()

        newUser.fullName = fullName;
        newUser.email = email;
        newUser.salt = salt;
        newUser.password = await bcrypt.hash(password, salt);
        newUser.isAdmin = false;

        try{
            await newUser.save()
            return {
                authId: newUser.authId,
                fullName: newUser.fullName,
                email: newUser.email
            }
        } catch (error) {
            if (error.code === '23505') {
              throw new ConflictException('email already exists');
            } else {  
              throw new InternalServerErrorException('error creating user');
            }
        }
    }

     async registerAdminUser( authDto: AuthDto): Promise<AuthObject> {
        const {fullName, email, password, isAdmin} = authDto;

        const newUser = new AuthEntity();

        const salt = await bcrypt.genSalt()

        newUser.fullName = fullName;
        newUser.email = email;
        newUser.salt = salt;
        newUser.password = await bcrypt.hash(password, salt);
        newUser.isAdmin = true;

        try{
            await newUser.save()
            return {
                authId: newUser.authId,
                fullName: newUser.fullName,
                email: newUser.email
            }
        } catch (error) {
            if (error.code === '23505') {
              throw new ConflictException('email already exists');
            } else {  
              throw new InternalServerErrorException('error creating user');
            }
        }
    }


        async userSignIn(signInDto: SignInDto): Promise<SignInObject> {
            const {email, password} = signInDto;

            const queryBuilder = this.createQueryBuilder('user')
            queryBuilder.select([
                'user.authId',
                'user.email',
                'user.password',
                'user.salt',
                'user.fullName',
                'user.isAdmin',
            ])
            .where('user.email = :email', {email})

            const user = await queryBuilder.getOne()
            if (user && (await user.validatePassword(password))) {
                return {
                    authId: user.authId,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    fullName: user.fullName,
                };
            } else {
                return null;
            }
        }

        async fetchUserById(authId: string): Promise<AuthEntity> {
            const user = await this.findOne({
                where: {
                    authId,
                }
            })

            if(!authId) {
                throw new NotFoundException(` user with id ${authId} not found`)
            }

            try{
                    return user
                } catch (error) {
                    throw new InternalServerErrorException('failed to retrieve user details')
                }
        }

       async updateUser(user: AuthEntity, updateUserDto: UpdateUserDto, authId: string): Promise<AuthEntity> {
            if (user.authId !== authId) {
                throw new ConflictException("not allowed")
            }
            
            const {fullName, email} = updateUserDto;

            const _user = await this.fetchUserById(authId);

            _user.fullName = fullName || _user.fullName;
            _user.email = email || _user.email;

            try {
                await _user.save()
                return _user;
            } catch (error) {
                throw new InternalServerErrorException("failed to update user details")
            }
        }
}
