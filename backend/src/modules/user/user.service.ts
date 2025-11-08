import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if(!user) throw new NotFoundException(`user not found`)
    return user;
  }

  async updateUserById(id: string, updateData: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
            new: true, // return an updated user
            runValidators: true, // applies the schema validations
        }).exec();

        if (!updatedUser) throw new NotFoundException(`user not found`);

    return updatedUser;
  }

    async deleteUserById(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) throw new NotFoundException(`user not found`);
        return deletedUser;
    }
}