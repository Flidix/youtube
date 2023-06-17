import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { UserEntity } from '../user/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VideoEntity } from './video.entity'

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports:[TypeOrmModule.forFeature([VideoEntity])]
})
export class VideoModule {}
