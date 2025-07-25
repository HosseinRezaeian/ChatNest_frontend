import { useGetListContacts } from "@/api/Contact";
import { Icontact } from "@/models/contactModel";
import { ActionIcon, Avatar, Box, Drawer, Flex, Group, rem, Text, TextInput } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconHeart, IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { LeftDrawer } from "./leftDrawer";
import { IPrivateRoom } from "@/models/PrivateRoomModel";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { privateRoomName } from "../utils/RoomNameRemoveEmail";






interface ContentsProps {
    privateroom: IPrivateRoom[]
    currentRoom: IPrivateRoom | null;
    setCurrentRoom: (privateroom: IPrivateRoom) => void;
    navbarOpened: boolean;
    toggleNavbar: () => void;
}


const Rooms = ({ privateroom, currentRoom, setCurrentRoom, navbarOpened, toggleNavbar }: ContentsProps) => {
    const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
     const user = useSelector((state: RootState) => state.user.user);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredrooms = privateroom?.filter(contact =>
        contact.name.includes(searchTerm)
    );





    return (
        <>
            <Flex justify="space-between" align="center">
                <ActionIcon
                    variant="subtle"
                    size="input-xs"
                    c={"white"}
                    onClick={toggleDrawer}
                    aria-label="Gradient action icon"
                >
                    <IconMenu2 />
                </ActionIcon>
                {isMobile ? (<ActionIcon
                    variant="subtle"
                    size="input-xs"
                    c={"white"}
                    onClick={toggleNavbar}
                    aria-label="Gradient action icon"
                >
                    <IconArrowLeft />
                </ActionIcon>) : null}

            </Flex>

            <LeftDrawer drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} />
            <TextInput onChange={(e) => { setSearchTerm(e.currentTarget.value.trim()) }} placeholder='جستوجو...' pb={"20"}></TextInput>
            {filteredrooms?.map((room) => (
                <Box
                    key={room.name}
                    mb="sm"
                    onClick={() => {
                        setCurrentRoom(room);
                        if (isMobile) toggleNavbar();
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: rem(8),
                        cursor: 'pointer',
                        padding: rem(8),
                        borderRadius: rem(6),
                        transition: 'background 0.2s ease',
                        backgroundColor: currentRoom === room ? '#189ab4' : 'transparent',
                        userSelect: 'none',
                    }}
                >
                    <Avatar size={30} radius="xl">{privateRoomName({room:room.name,email:user?.email??""})}</Avatar>

                    <Text>{privateRoomName({room:room.name,email:user?.email??""})}</Text>
                </Box>
            ))}

        </>
    )
}
export default Rooms