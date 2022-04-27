import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [UserModule, TopicModule]
})
export class PublicModule {}
