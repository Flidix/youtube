import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'
import {VideoEntity} from "../video/video.entity";
import {Base} from "../utils/base";
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { ManyToOne } from 'typeorm';


@Entity('Subscription')
export class SubscriptionEntity extends Base {

	@ManyToOne(() => UserEntity, user => user.subscription)
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, user => user.subscription)
	toChannel: UserEntity

}