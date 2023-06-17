import { Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { MediaService } from './media.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(200)
  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('media'))
  async uploadMediaFile(
    @UploadedFiles() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string
  ){
    return this.mediaService.saveMedia(mediaFile, folder)
  }
}
