export const privateRoomName = ({room,email}:{room:string,email:string}) => {
    return(
        room.replace(email,"").trim()
    )
}