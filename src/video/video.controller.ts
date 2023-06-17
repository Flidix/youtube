import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { VideoService } from './video.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { UserDto } from '../user/user-dto'
import { VideoDto } from './video.dto'

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('get-private/:id')
  @Auth()
  async getPrivetVideo(@Param('id') id:number){
    return this.videoService.byId(+id,)
  }

  @Get()
  @Auth()
  async getAll(@Query('search') search?:string){
    return this.videoService.getAll(search)
  }

  @Get()
  @Auth()
  async getPopular(){
    return this.videoService.getPopular()
  }
  @Get(':id')
  @Auth()
  async getVideo(@Param('id') id:string){
    return this.videoService.byId(+id)
  }

  @HttpCode(200)
  @Post('')
  @Auth()
  async createVideo(@CurrentUser('id') id: string,){
    return this.videoService.create(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: VideoDto){
    return this.videoService.updateProfile(+id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteVideo(@Param('id') id: string){
    return this.videoService.delete(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-views/:videoId')
  @Auth()
  async updateViews(@Param('videoId') videoId: string){
    return this.videoService.updateCountViews(+videoId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-likes/:videoId')
  @Auth()
  async updateLikes(@Param('videoId') videoId: string){
    return this.videoService.updateReaction(+videoId)
  }


}
