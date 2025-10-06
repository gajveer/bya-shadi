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
}
