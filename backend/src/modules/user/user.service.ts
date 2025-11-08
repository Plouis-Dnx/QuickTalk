import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async updateUserById(id: string, updateData: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, {
            new: true, // return an updated user
            runValidators: true, // applies the schema validations
        }).exec();

        if (!updatedUser) throw new NotFoundException(`user not found`);

    return updatedUser;
  }
}