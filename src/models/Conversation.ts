export type Conversation = {
  conversation_id: string;
  last_message: string;
  last_message_sender: number | null;
  other_user_id: string;
  other_user_name: string;
  other_user_avatar: string | null;
  timestamp: string | null;
};