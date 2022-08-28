import { ChatGateway } from "./chat.gateway";
import { EmitKeysConstant } from "../../shared/constants/event-keys.constant";
import { Member } from "../../shared/interfaces/member.interface";
import { AsyncApiService, AsyncApiSub } from "nestjs-asyncapi";
import {
  JoinMemberExa,
  KickMemberExa,
  LaveMemberExa,
  UpdateMemberExa
} from "../../shared/examples/socket/member.example";
import { Message } from "../../shared/interfaces/message.interface";
import { MessageCreateDto } from "../messages/dtos/creates.dto";
import { MessageUpdateDto } from "../messages/dtos/update.dto";
import { MessageDeleteExa, MessageUpdateExa } from "../../shared/examples/socket/message.example";


@AsyncApiService()
export class ChatEmits {
  constructor(private chatGateway: ChatGateway) {
  }


  @AsyncApiSub({
    channel: EmitKeysConstant.NEW_MEMBER,
    description: "listen event Join a member",
    message: { name: "member", payload: { type: JoinMemberExa } },
    tags: [{ name: "member", description: "member a room" }]
  })
  newMember(roomId: string, member: Member) {
    this.chatGateway.server
      .to(roomId.toString())
      .emit(EmitKeysConstant.NEW_MEMBER, member);
  }

  @AsyncApiSub({
    channel: EmitKeysConstant.LAVE,
    description: "listen event Lave a member",
    message: { name: "member", payload: { type: LaveMemberExa } },
    tags: [{ name: "member", description: "member a room" }]
  })
  laveMember(roomId: string, member: Member) {
    this.chatGateway.server
      .to(roomId.toString())
      .emit(EmitKeysConstant.LAVE, member);
  }

  @AsyncApiSub({
    channel: EmitKeysConstant.KICK_MEMBER,
    description: "listen event Kick a Member",
    message: { name: "member", payload: { type: KickMemberExa } },
    tags: [{ name: "member", description: "member a room" }]
  })
  kickMember(roomId: string, member: Member, requesterId: number) {
    this.chatGateway.server
      .to(roomId.toString())
      .emit(EmitKeysConstant.KICK_MEMBER, {
        member: member,
        by: requesterId
      });

  }


  @AsyncApiSub({
    channel: EmitKeysConstant.UPDATE_MEMBER,
    description: "listen event update a Member",
    message: { name: "member", payload: { type: UpdateMemberExa } },
    tags: [{ name: "member", description: "member a room" }]
  })
  updateMember(roomId: string, member: Member, requesterId: number, newData: any) {
    this.chatGateway.server
      .to(roomId)
      .emit(EmitKeysConstant.UPDATE_MEMBER, {
        data: newData,
        memberId: member.userId,
        by: requesterId
      });
  }

  @AsyncApiSub({
    channel: EmitKeysConstant.CREATE_MESSAGE,
    description: "listen event create Message(send Message)",
    message: { name: "message", payload: { type: MessageCreateDto } },
    tags: [{ name: "message" }]
  })
  createMessage(message: Message) {
    this.chatGateway.server
      .to(message.roomId.toString())
      .emit(EmitKeysConstant.CREATE_MESSAGE, message);
  }

  @AsyncApiSub({
    channel: EmitKeysConstant.UPDATE_MESSAGE,
    description: "listen event update Message ",
    message: { name: EmitKeysConstant.UPDATE_MESSAGE, payload: { type: MessageUpdateExa } },
    tags: [{ name: "message" }]
  })
  updateMessage(roomId: number, oldMessage: Message, newMessage: Message) {
    this.chatGateway.server
      .to(roomId.toString())
      .emit(EmitKeysConstant.UPDATE_MESSAGE, { roomId: roomId, oldMessage, newMessage });
  }

  @AsyncApiSub({
    channel: EmitKeysConstant.DELETE_MESSAGE,
    tags: [{ name: "message" }],
    description: "listen for delete message",
    message: { name: EmitKeysConstant.DELETE_MESSAGE, payload: { type: MessageDeleteExa } }
  })
  deleteMessage(roomId: number, memberId: number, messageId: number) {
    this.chatGateway.server
      .to(roomId.toString())
      .emit(EmitKeysConstant.DELETE_MESSAGE, { roomId, messageId, byId: memberId });
  }
}