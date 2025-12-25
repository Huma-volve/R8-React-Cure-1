import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   Types
========================= */
export type Message = {
  chat_id?: number;
  message_id?: number | null ;
  message_type: "text" | "image" | "audio";
  message_form?: "user" | "doctor";
  message_sender?: { id: number; name: string };
  message_content: string;
  message_seen?: boolean | number | null;
  message_created_at?: string;
  is_deleted?: boolean;
};

export type apiRoom = {
  room_id: number;
  doctor: { doctor_name: string };
  messages: Message[];
  last_message_time: string;
  unread?: number;
};

type ChatState = {
  messageId: number | null;
  msgUnread: string;
  unread: number;
  titlePage: string;
  messageDr: string;
  allMessages: { [chatId: string]: Message[] };
  search: string;
  chatList: apiRoom[];
  isErrorList: boolean;
  isLoadingList: boolean;
  isErrorMessage: boolean;
  isLoadingMessage: boolean;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

type SendMessageArgs =
  | { chat_id: number; type: "text"; content: string }
  | { chat_id: number; type: "image"; content: File }
  | { chat_id: number; type: "audio"; content: File };

/* =========================
   LocalStorage Helpers
========================= */
const saveMessagesToStorage = (allMessages: { [chatId: string]: Message[] }) => {
  localStorage.setItem("allMessages", JSON.stringify(allMessages));
};

const getMessagesFromStorage = (): { [chatId: string]: Message[] } => {
  const data = localStorage.getItem("allMessages");
  return data ? JSON.parse(data) : {};
};

/* =========================
   Async Thunks
========================= */
const token = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

export const getChatList = createAsyncThunk<apiRoom[] >(
  "chatSlice/getChatList",
  async () => {
    const res = await axios.get(
      "https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chats",
      { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
    );
    return res.data.data.rooms || [];
  }
);

export const sendMessage = createAsyncThunk<Message, SendMessageArgs>(
  "chatSlice/sendMessage",
  async ({ chat_id, type, content }) => {
    const formData = new FormData();
    formData.append("chat_id", String(chat_id));
    formData.append("type", type);
    formData.append("content", content);

    const res = await axios.post(
      "https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chat/message",
      formData,
      { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
    );

    return res.data.data.message;
  }
);

export const fetchChatMessages = createAsyncThunk<Message[], number>(
  "chatSlice/fetchChatMessages",
  async (chatId) => {
    const res = await axios.get(
      `https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chats/${chatId}/messages`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("res.data.data.data.messages" , res.data.data.data.messages)
    
    return res.data.data.data.messages;
  }
);

export const deleteMessage = createAsyncThunk<number, number>(
  "chatSlice/deleteMessage",
  async (messageId) => {
    await axios.delete(
      `https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chat/${messageId}/message/1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return messageId;
  }
);

export const cleareAllMessages = createAsyncThunk<number, number>(
  "chatSlice/cleareAllMessages",
  async (chatId) => {
    await axios.delete(
      `https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chat/${chatId}/messages`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return chatId;
  }
);




export const markAllMessagesRead = createAsyncThunk<{chatId : number }, number>(
  "chatSlice/markAllMessagesRead",
  async (chatId) => {
    await axios.patch(
      `https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chats/${chatId}/messages-read-all`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {chatId}
  }

);


/* =========================
   Initial State
========================= */
const initialState: ChatState = {
  msgUnread: "All",
  titlePage: "chat",
  unread: 0,
  messageDr: "",
  allMessages: getMessagesFromStorage(),
  search: "",
  chatList: [],
  isErrorList: false,
  isLoadingList: false,
  isErrorMessage: false,
  isLoadingMessage: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  messageId: null
};

/* =========================
   Slice
========================= */
const ChatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    checkMesage: (state, action: PayloadAction<string>) => { state.msgUnread = action.payload; },
    setTitlePage: (state, action: PayloadAction<string>) => { state.titlePage = action.payload; },
    setMessage: (state, action: PayloadAction<string>) => { state.messageDr = action.payload; },
    setAllMessage: (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
      const { chatId, message } = action.payload;
      if (!state.allMessages[chatId]) state.allMessages[chatId] = [];
      state.allMessages[chatId].push(message);
      state.allMessages[chatId].sort(
        (a, b) => new Date(b.message_created_at || "").getTime() - new Date(a.message_created_at || "").getTime()
      );
      saveMessagesToStorage(state.allMessages);
    },
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatList.pending, (state) => {
        state.isLoadingList = true; state.isErrorList = false; state.isSuccess = false;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        const rooms = action.payload || [];
        state.chatList = rooms.map(room => ({
          ...room,
          messages: room.messages || [],
          unread: room.messages
            ? room.messages.filter(m => m.message_seen === 0 || m.message_seen === false).length
            : 0
        }));
        state.chatList.sort((a, b) =>
          new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime()
        );

        state.unread = state.chatList.reduce((total, room) => total + (room.unread || 0), 0);
        state.isLoadingList = false; state.isErrorList = false; state.isSuccess = true;


        

      })
      .addCase(getChatList.rejected, (state) => {
        state.isLoadingList = false; state.isErrorList = true; state.isSuccess = false;
      });

    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.isLoading = true; state.isError = false; state.isSuccess = false;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
            console.log("res.data.data.data.messages" ,  action)
        const chatId = action.meta.arg;
        state.allMessages[chatId] = action.payload.map(msg => ({ ...msg, is_deleted: false }));
        saveMessagesToStorage(state.allMessages);
        state.isLoading = false; state.isSuccess = true;
        console.log(chatId);
        
      })
      .addCase(fetchChatMessages.rejected, (state) => {
        state.isLoading = false; state.isError = true; state.isSuccess = false;

      });

    builder
      .addCase(sendMessage.pending, (state, action) => {
        const { chat_id, content, type } = action.meta.arg;
        if (!state.allMessages[chat_id]) state.allMessages[chat_id] = [];

        state.allMessages[chat_id].push({
          chat_id,
          message_type: type,
          message_content: typeof content === "string" ? content : "image",
          message_form: "user",
          message_created_at: new Date().toISOString(),
          is_deleted: false ,
          message_id : state.messageId
        });
        saveMessagesToStorage(state.allMessages);
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.chat_id) return;
        const chatId = action.payload.chat_id;
        if (!state.allMessages[chatId]) state.allMessages[chatId] = [];



        const room = state.chatList.find(r => r.room_id === chatId);
        if (room) room.unread = state.allMessages[chatId].filter(m => !m.message_seen || m.message_seen === 0).length;

        state.allMessages[chatId].sort((a, b) => new Date(a.message_created_at!).getTime() - new Date(b.message_created_at!).getTime());
        saveMessagesToStorage(state.allMessages);
        state.isLoading = false; state.isSuccess = true;
      })
      .addCase(sendMessage.rejected, (state) => { state.isLoading = false; state.isError = true; state.isSuccess = false; });

    builder
      .addCase(deleteMessage.pending, (state) => { state.isErrorMessage = false; state.isLoadingMessage = true; })

      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.payload;
        console.log("تم الحذف بنجاح")
        if (messageId != null) {
          Object.keys(state.allMessages).forEach(chatId => {
            state.allMessages[chatId] = state.allMessages[chatId].map(msg =>
              msg.message_id === messageId ? { ...msg, is_deleted: true } : msg
            );

            // تحديث آخر رسالة في chatList
      const roomIndex = state.chatList.findIndex(r => r.room_id === Number(chatId));
      if (roomIndex !== -1) {
        // أخذ الرسائل غير المحذوفة
        const messages = state.allMessages[chatId].filter(m => !m.is_deleted);

        state.chatList[roomIndex].messages = messages;

        // تحديث وقت آخر رسالة
        state.chatList[roomIndex].last_message_time = messages.length > 0 
          ? messages[messages.length - 1].message_created_at || state.chatList[roomIndex].last_message_time
          : "";
      }

          });
          saveMessagesToStorage(state.allMessages);
          state.messageId = messageId;
        }
        state.isLoadingMessage = false;
      })
      .addCase(deleteMessage.rejected, (state) => {
                console.log(" الحذف ")
        state.isErrorMessage = true; state.isLoadingMessage = false; });

    builder
      .addCase(cleareAllMessages.pending, (state) => { state.isErrorMessage = false; state.isLoadingMessage = true; })
      .addCase(cleareAllMessages.fulfilled, (state) => { state.allMessages = {}; saveMessagesToStorage(state.allMessages); state.isErrorMessage = false; state.isLoadingMessage = false; })
      .addCase(cleareAllMessages.rejected, (state) => { state.isErrorMessage = true; state.isLoadingMessage = false; });

    builder
        .addCase(markAllMessagesRead.pending , (state)=>{
        state.isLoadingMessage = true;
        state.isErrorMessage = false;
      })

        .addCase(markAllMessagesRead.fulfilled , (state , action )=>{
         const chatId = action.payload.chatId;
         
    if (state.allMessages[chatId]) {
        state.allMessages[chatId] = state.allMessages[chatId].map(msg => ({
          ...msg,
          message_seen: true
            }));
        }

        const roomIndex = state.chatList.findIndex(r => r.room_id === chatId);
        if (roomIndex !== -1) {
          state.chatList[roomIndex].unread = 0;
        }

        state.isLoadingMessage = false;

          })

        .addCase(markAllMessagesRead.rejected , (state)=>{
        state.isLoadingMessage = false;
        state.isErrorMessage = true;
      })
  }

});

export default ChatSlice.reducer;
export const { checkMesage, setTitlePage, setMessage, setAllMessage, setSearch } = ChatSlice.actions;
