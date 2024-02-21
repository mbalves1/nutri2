import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);

    const password = createUser.password;

    const passwordHash = await bcrypt.hash(password, 10);

    Object.assign(createUser, { password: passwordHash });

    return await createUser.save();
  }

  async login(loginUserDto: any) {
    const user = await this.userModel
      .findOne({
        email: loginUserDto.email,
      })
      .exec();

    if (!user) throw new Error('Incorrect email or password');

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    const id = user._id.toHexString();
    const token = this.jwtService.sign({ id }, { expiresIn: '7d' });

    if (!isPasswordValid) throw new Error('Incorrect email or password');
    delete user.password;

    return {
      user,
      token,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      console.log('aqqui decoded', decoded);

      return decoded;
    } catch (err) {
      return null;
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById({ _id: id }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
