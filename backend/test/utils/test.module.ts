import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';

@Module({
  imports: [TypeOrmModule],
  providers: [TestService],
})
export class TestModule {}
