import { createSlice } from "@reduxjs/toolkit";
import { getAllDialogs } from "./dialogs-operations";

const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState: {
        dialogs: [],
        isLoading: false
    },
    reducers: {
        addDialog: (state, {payload}) => {
            state.dialogs.push(payload.dialog)
        },
        updateAcceptedStatus: (state, {payload}) => {
            console.log('invite update', payload)
            const {dialogId, acceptedBy} = payload
            const dialog = state.dialogs.find(el => el._id === dialogId)
            const participant = dialog.participants.find(el=> el.id === acceptedBy)
            participant.accepted = true
        },
        addMessage: (state, {payload}) => {
            console.log("mess slice",payload)
           console.log(state.dialogs)
            const {dialogId, lastMessageIdx, messageData} = payload
            const dialog = state.dialogs.find(el => el._id === dialogId)
            console.log('found',dialog)
            console.log('last', dialog.messages[lastMessageIdx])
            if (lastMessageIdx === null) {
                const newMessage = {
                  from: messageData.from,
                  messageContent: [messageData.message]
                }
                dialog.messages.push(newMessage)
               } else {
                dialog.messages.at(-1).messageContent.push(messageData.message)
               }
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(getAllDialogs.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getAllDialogs.fulfilled, (state, {payload})=> {
            console.log('dialogs', payload)
            state.dialogs = payload.dialogs
            state.isLoading = false
        })
    }

})

export const dialogsReducer = dialogsSlice.reducer
export const dialogsActions = dialogsSlice.actions