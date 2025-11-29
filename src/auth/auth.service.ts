import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.logger.error(`[CreateUser] Error: ${error}`);
      this.handleErrors(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return usersWithoutPassword;
    } catch (error) {
      this.logger.error(`[FindAll] Error: ${error}`);
      this.handleErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.logger.error(`[FindOne] Error: ${error}`);
      this.handleErrors(error);
    }
  }

  async update(id: string, updateAuthDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (updateAuthDto.password) {
        updateAuthDto.password = bcrypt.hashSync(updateAuthDto.password, 10);
      }
      await this.userRepository.update(id, updateAuthDto);
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      this.logger.error(`[Update] Error: ${error}`);
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error(`[Remove] Error: ${error}`);
      this.handleErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      //With this we avoid logging unauthorized errors
      //which are normal in this case
      if (!(error instanceof UnauthorizedException)) {
        this.logger.error(`[Login] Error: ${error}`);
        this.handleErrors(error);
      }
    }
  }

  private handleErrors(error: any): never {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.detail);
    } else if (error instanceof HttpException) {
      throw error;
    } else {
      throw new InternalServerErrorException(
        'Unknown error please, contact the server admin',
      );
    }
  }
}
