import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const u = this.usersRepo.create(user);
    return this.usersRepo.save(u);
  }

  findAll() {
    return this.usersRepo.find({
      select: [
        'id',
        'name',
        'email',
        'phone',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: string, updateData: Partial<User>) {
    await this.usersRepo.update(id, updateData);
    return this.findById(id);
  }

  async remove(id: string) {
    const user = await this.findById(id);
    if (!user) return { deleted: false, message: 'User not found' };
    await this.usersRepo.delete(id);
    return { deleted: true };
  }
}
