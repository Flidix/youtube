import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubscriptionEntity } from './subscription.entity'
import { UserDto } from './user-dto'
import {compare, hash, genSalt} from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly userRepository :Repository<UserEntity>,
							@InjectRepository(SubscriptionEntity) private readonly subscriptionRepository :Repository<SubscriptionEntity>) {}


	async byId(id: number){
		const user = await this.userRepository.findOne({
			where:{
				id
			},
			relations:{
				videos: true,
				subscription:{
					toChannel: true,
					fromUser: true
				}
			},
			order:{
				createdAt:'DESC'
			}
		})
		if (!user) throw new NotFoundException("user not found")
		return user
	}

	async updateProfile(id: number, dto: UserDto){
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOneBy({email:dto.email})
		if (isSameUser && id !== isSameUser.id) throw new BadRequestException('email зайнятий')

		if(dto.password){
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.description = dto.description
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	async subscribe(id:number, channelId:number){
		const data ={
			toChannel: {id: channelId},
			fromUser: {id}
		}
		const isSub = await this.subscriptionRepository.findOneBy(data)
		if (isSub){
			await this.subscriptionRepository.delete(data)
			return false
		}
		if (!isSub) {
			const newSub = await this.subscriptionRepository.create(data)
			await this.subscriptionRepository.save((newSub))
		}
		return true
	}
	async getAll(){
		return this.userRepository.find()
	}
}
