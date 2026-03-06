import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { ConversationDocument, Conversation } from "./conversation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

@Injectable()
export class ConversationService {
  constructor(@InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>) {}

  // create conversation (private or group)
  async createConversation(conversation: CreateConversationDto): Promise<ConversationDocument> {
    const { name, creatorId, isGroup, conversationPicture } = conversation;

    const newConversation = new this.conversationModel({
      name: name,
      last_message: null,
      is_group: isGroup,
      admins: isGroup ? [creatorId] : [], // creatorId automatically becomes admin
      conversation_picture: conversationPicture || null
    });

    try { return await newConversation.save(); }
    catch (error) { throw new InternalServerErrorException("Failed to create conversation."); }
  }

  // Retrive conversations for a user
  async getUserConversations(userId: string): Promise<ConversationDocument[]> {
    const conversations = await this.conversationModel
      .find({ members: new Types.ObjectId(userId) })
      .sort({ updatedAt: -1 }) // Most recent conversations first
      .populate('last_message')
      .populate('members', 'name email')
      .exec();

    return conversations;
  }

  // Retrieve a specific conversation by ID
  async getConversationById(conversationId: string): Promise<ConversationDocument> {
    const conversation = await this.conversationModel.findById(conversationId).exec();
    if(!conversation) throw new NotFoundException("Conversation not found.");
    return conversation;
  }
}