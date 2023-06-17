import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm'
import {UserEntity} from "../user/user.entity";
import { ManyToOne } from 'typeorm';
import { Base } from '../utils/base'
import { SubscriptionEntity } from '../user/subscription.entity'
import { CommentEntity } from '../comment/comment.entity'


@Entity('Video')
export class VideoEntity extends Base{

    @Column()
    name: string

    @Column({default: false})
    isPublic: boolean

    @Column({default: 0})
    views?: number

    @Column({default: 0})
    likes?: number

    @Column({default: 0})
    duration?: number

    @Column({default: '', type: 'text'})
    description: string

    @Column({default: ''})
    videoPath : string

    @Column({default: ''})
    thumbnailPath : string

    @ManyToOne(() => UserEntity,  user => user.videos)
    user: UserEntity


    @OneToMany(() => CommentEntity, comment => comment.video)
    comments: CommentEntity[]

}