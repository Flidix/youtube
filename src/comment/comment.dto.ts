import { IsEmail, MinLength, IsString, IsNumber } from 'class-validator'

export class CommentDto {
	@IsString()
	message: string

	@IsNumber()
	videoId:number
}