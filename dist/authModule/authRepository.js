"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModuleRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const authEntity_1 = require("./authEntity");
const bcrypt = __importStar(require("bcrypt"));
let AuthModuleRepository = class AuthModuleRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(authEntity_1.AuthEntity, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async registerUser(authDto) {
        const { fullName, email, password } = authDto;
        const newUser = new authEntity_1.AuthEntity();
        const salt = await bcrypt.genSalt();
        newUser.fullName = fullName;
        newUser.email = email;
        newUser.salt = salt;
        newUser.password = await bcrypt.hash(password, salt);
        newUser.isAdmin = false;
        try {
            await newUser.save();
            return {
                authId: newUser.authId,
                fullName: newUser.fullName,
                email: newUser.email
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('error creating user');
            }
        }
    }
    async registerAdminUser(authDto) {
        const { fullName, email, password, } = authDto;
        const newUser = new authEntity_1.AuthEntity();
        const salt = await bcrypt.genSalt();
        newUser.fullName = fullName;
        newUser.email = email;
        newUser.salt = salt;
        newUser.password = await bcrypt.hash(password, salt);
        newUser.isAdmin = true;
        try {
            await newUser.save();
            return {
                authId: newUser.authId,
                fullName: newUser.fullName,
                email: newUser.email
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('error creating user');
            }
        }
    }
    async userSignIn(signInDto) {
        const { email, password } = signInDto;
        const queryBuilder = this.createQueryBuilder('user');
        queryBuilder.select([
            'user.authId',
            'user.email',
            'user.password',
            'user.salt',
            'user.fullName',
            'user.isAdmin',
        ])
            .where('user.email = :email', { email });
        const user = await queryBuilder.getOne();
        if (user && (await user.validatePassword(password))) {
            return {
                authId: user.authId,
                email: user.email,
                isAdmin: user.isAdmin,
                fullName: user.fullName,
            };
        }
        else {
            return null;
        }
    }
    async fetchUserById(authId) {
        const user = await this.findOne({
            where: {
                authId,
            }
        });
        if (!authId) {
            throw new common_1.NotFoundException(` user with id ${authId} not found`);
        }
        try {
            return user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('failed to retrieve user details');
        }
    }
    async fetchUsers(user) {
        if (user.isAdmin !== true) {
            throw new common_1.ConflictException("not allowed");
        }
        try {
            const queryBuilder = await this.createQueryBuilder('fullName');
            const users = await queryBuilder.getMany();
            return users;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException("not found");
        }
    }
    async updateUser(user, updateUserDto, authId) {
        if (user.authId !== authId) {
            throw new common_1.ConflictException("not allowed");
        }
        const { fullName, email } = updateUserDto;
        const _user = await this.fetchUserById(authId);
        _user.fullName = fullName || _user.fullName;
        _user.email = email || _user.email;
        try {
            await _user.save();
            return _user;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("failed to update user details");
        }
    }
};
exports.AuthModuleRepository = AuthModuleRepository;
exports.AuthModuleRepository = AuthModuleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AuthModuleRepository);
//# sourceMappingURL=authRepository.js.map