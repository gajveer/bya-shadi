import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://postgres:postgres@localhost:5432/bya_shadi',
      autoLoadEntities: true,
      synchronize: true, // dev only - switch to migrations for prod
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
