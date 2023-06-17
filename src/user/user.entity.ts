import { Column, Entity, OneToMany } from 'typeorm';
import { VideoEntity } from '../video/video.entity';
import { Base } from '../utils/base';
import { SubscriptionEntity } from './subscription.entity';

@Entity('User')
export class UserEntity extends Base {
    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: '' })
    name: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: 0 })
    subscribersCount?: number;

    @Column({ default: '', type: 'text' })
    description: string;

    @Column({ default: '' })
    avatarPath: string;

    @OneToMany(() => VideoEntity, (video) => video.user)
    videos: VideoEntity[];

    @OneToMany(() => SubscriptionEntity, (sub) => sub.fromUser)
    subscription: SubscriptionEntity[];

    @OneToMany(() => SubscriptionEntity, (sub) => sub.toChannel)
    subscribers: SubscriptionEntity[];
}
