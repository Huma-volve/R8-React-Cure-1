<<<<<<< HEAD
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
=======
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// توكنك
const token = "7|MFmla0NmwKFUDNaJ3BqHYEpK4npbuG6yMHg6DM1Y082b2deb";

// AsyncThunk لجلب بيانات الـ chat
export const getChatList = createAsyncThunk("chatSlice/getChatList", async () => {
  const res = await axios.get(
    "https://round8-cure-php-team-two.huma-volve.com/api/v1/user/chats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
   );
   return res.data.data || []; 
});

// interface ChatState {
//   msgUnread: string;
//   titlePage: string;
//   messageDr: string;
//   allMessage: object[];
//   search: string;
//   chatList: object[];
//   isError: boolean;
//   isLoading: boolean;
//   isSuccess: boolean;
// }

// const initialState:  {
//   msgUnread: "All",
//   titlePage: "chat",
//   messageDr: "",
//   allMessage: [],
//   search: "",
//   chatList: [],
//   isError: false,
//   isLoading: false,
//   isSuccess: false,
// };

const ChatSlice = createSlice({
  name: "chatSlice",
  initialState : {
  msgUnread: "All",
  titlePage: "chat",
  messageDr: "",
  allMessage: [],
  search: "",
  chatList: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
},
>>>>>>> 8f21549
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
<<<<<<< HEAD
  const { chatId, message } = action.payload;
  
  if (!state.allMessages[chatId]) {
    state.allMessages[chatId] = []; 
  }

  state.allMessages[chatId].push(message); 
  },
=======
      state.allMessage = action.payload;
    },
>>>>>>> 8f21549
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
<<<<<<< HEAD
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
=======
  extraReducers: (builder) => {
    
    builder.addCase(getChatList.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      console.log("mostafa");
      
    });

    builder.addCase(getChatList.fulfilled, (state, action) => {
      state.chatList = action.payload
      state.isSuccess = true;
      console.log("ahmed");
      
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getChatList.rejected, (state) => {
      state.isError = true;
      console.log("hassan");
      
      state.isLoading = false;
      state.isSuccess = false;
    });
  },
>>>>>>> 8f21549
});

export default ChatSlice.reducer;
export const { checkMesage, setTitlePage, setMessage, setAllMessage, setSearch } =  ChatSlice.actions;
