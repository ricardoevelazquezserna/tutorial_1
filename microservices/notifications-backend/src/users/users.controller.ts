import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor() {}

  @MessagePattern('user_created')
  sendWelcomeEmail(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log('user_created');
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }

  @MessagePattern('user_blocked')
  sendBlockedEmail(@Payload() data: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
