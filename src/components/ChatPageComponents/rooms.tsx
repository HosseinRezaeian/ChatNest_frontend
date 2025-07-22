import { useGetListContacts } from "@/api/Contact";
import { Icontact } from "@/models/contactModel";
import { ActionIcon, Avatar, Box, Drawer, Flex, Group, rem, Text, TextInput } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft, IconHeart, IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { LeftDrawer } from "./leftDrawer";
import { IPrivateRoom } from "@/models/PrivateRoomModel";






interface ContentsProps {
    privateroom: IPrivateRoom[]
    currentContact: IPrivateRoom | null;
    setCurrentContact: (privateroom: IPrivateRoom) => void;
    navbarOpened: boolean;
    toggleNavbar: () => void;
}


const Rooms = ({ privateroom, currentContact, setCurrentContact, navbarOpened, toggleNavbar }: ContentsProps) => {
    const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredContacts = privateroom?.filter(contact =>
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

            <LeftDrawer drawerOpened={drawerOpened} toggleDrawer={toggleDrawer}/>
            <TextInput onChange={(e) => { setSearchTerm(e.currentTarget.value.trim()) }} placeholder='جستوجو...' pb={"20"}></TextInput>
            {filteredContacts?.map((contact) => (
                <Box
                    key={contact.name}
                    mb="sm"
                    onClick={() => {
                        setCurrentContact(contact);
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
                        backgroundColor: currentContact === contact ? '#189ab4' : 'transparent',
                        userSelect: 'none',
                    }}
                >
                    <Avatar size={30} radius="xl">{contact.name}</Avatar>
                    <Text>{contact.name}</Text>
                </Box>
            ))}

        </>
    )
}
export default Rooms