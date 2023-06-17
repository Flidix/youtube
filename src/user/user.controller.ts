import { Body, Controller, Get, HttpCode, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service';
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './user.decorator'
import { AuthDto } from '../auth/auth-dto'
import { UserDto } from './user-dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id:number){
    return this.userService.byId(id)
  }

  @Get('by-id/:id')
  @Auth()
  async getUser(@Param('id') id:string){
    return this.userService.byId(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto){
    return this.userService.updateProfile(+id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @Auth()
  async sub(@CurrentUser('id') id: number, @Param('channelId') channelId: string, ){
    return this.userService.subscribe(id, +channelId)
  }
  @Get()
  @Auth()
  async getAll(){
    return this.userService.getAll()
  }
}
