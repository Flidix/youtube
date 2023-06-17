import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import {VideoEntity} from "../video/video.entity";
import {Base} from "../utils/base";
import { UserEntity } from '../user/user.entity'

@Entity('Comment')
export class CommentEntity extends Base {

	@Column({default: ''})
	message: string

	@ManyToOne(() => UserEntity)
	user: UserEntity

	@ManyToOne(() => VideoEntity, video => video.comments)

	video: VideoEntity

}