import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
    value: {
        firstname: string | null,
        lastname: string | null,
        email: string | null,
        token: string | null,
        preferences: {},
        bookmarks: {
            interviews: string[],
            generalities: string[],
            products: string[],
            labels: string[],
        },
        lists: [],
    }
}

const initialState: UserState = {
    value: {
        firstname: null,
        lastname: null,
        email: null,
        token: null,
        preferences: {},
        bookmarks: {
            interviews: [],
            generalities: [],
            products: [],
            labels: [],
        },
        lists: [],
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        connectUser: (state: UserState, action: PayloadAction<UserState["value"]>) => {
            state.value = action.payload
        }
    }
})

export const { connectUser } = userSlice.actions
export default userSlice.reducer