import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

//  createAsyncThunk,

// توكنك
// const token = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

// AsyncThunk لجلب بيانات الـ chat
// export const getChatList = createAsyncThunk("chatSlice/getChatList", async () => {
//   const res = await axios.get(
//     "https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chats",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     }
//    );
//    return res.data.data || []; 
// });

type Message = {
  text: string;
};

type ChatState = {
  msgUnread: string;
  titlePage: string;
  messageDr: string;
  allMessages:{
    [chatId: string] : Message[] 
  },
  search: string;
  chatList: object[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: ChatState =  {
  msgUnread: "All",
  titlePage: "chat",
  messageDr: "",
  allMessages: {},
  search: "",
  chatList: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
};

const ChatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    checkMesage: (state, action) => {
      state.msgUnread = action.payload;
    },
    setTitlePage: (state, action) => {
      state.titlePage = action.payload;
    },
    setMessage: (state, action) => {
      state.messageDr = action.payload;
    },
    setAllMessage: (state, action) => {
  const { chatId, message } = action.payload;
  
  if (!state.allMessages[chatId]) {
    state.allMessages[chatId] = []; 
  }

  state.allMessages[chatId].push(message); 
  },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  // extraReducers: (builder) => {
    
  //   builder.addCase(getChatList.pending, (state) => {
  //     state.isLoading = true;
  //     state.isError = false;
  //     state.isSuccess = false;
  //     console.log("mostafa");
      
  //   });

  //   builder.addCase(getChatList.fulfilled, (state, action) => {
  //     state.chatList = action.payload
  //     state.isSuccess = true;
  //     console.log("ahmed");
      
  //     state.isError = false;
  //     state.isLoading = false;
  //   });
  //   builder.addCase(getChatList.rejected, (state) => {
  //     state.isError = true;
  //     console.log("hassan");
      
  //     state.isLoading = false;
  //     state.isSuccess = false;
  //   });
  // },
});

export default ChatSlice.reducer;
export const { checkMesage, setTitlePage, setMessage, setAllMessage, setSearch } =  ChatSlice.actions;
