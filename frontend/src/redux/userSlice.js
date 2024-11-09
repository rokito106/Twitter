import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherusers: null,
        profile:null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        otherUsers: (state, action) => {
            state.otherusers = action.payload;
        },
        getMyProfile:(state,action)=>{
            state.profile=action.payload;
        },
        followingUpdate:(state,action)=>{
            // unfollow
            if(state.user.followings?.includes(action.payload)){
                state.user.followings = state.user.followings?.filter((itemId)=>{
                    return itemId !== action.payload;
                })
            }else{
                // follow
                state.user.followings.push(action.payload);
            }
        }
    }
})


export const {getUser,otherUsers,getMyProfile,followingUpdate}=userSlice.actions;
export default userSlice.reducer