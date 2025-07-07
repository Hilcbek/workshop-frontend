import {z} from 'zod'
import { passwordRegex } from '../../utils/utils'
export interface initialState {
    data : userResponseProps | null
    isLoading : boolean,
    isError : boolean
    isSuccess : boolean
    isLoggedIn :boolean,
    isLoggedInLoading : boolean
}
export interface userProps {
    id:string
    username:string,
    email :string,
    createdAt : string,
    role:string
    token : string
    updatedAt:string

}
export interface userResponseProps {
    data : userProps[],
    message:string
    status:number
}

export interface userInputProps {
    username:string,
    email :string,
    password :string
}

export const userInputSchema = z.object({
    username : z.string(),
    email : z.string().email({message : "Please enter a valid email"}),
    password : z.string().refine((value) => {
        if(passwordRegex.test(value)) return true
    })
})
export type userInputSchemaType = z.infer<typeof userInputSchema>