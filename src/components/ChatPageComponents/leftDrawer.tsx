import { ActionIcon, Avatar, Button, Drawer, Group, Modal, Stack, TextInput } from "@mantine/core"
import type { RootState } from '@/app/store';
import { useSelector } from "react-redux";
import { json } from "stream/consumers";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useSearchContacts } from "@/api/Contact";
import { useState } from "react";






type props = {
    drawerOpened: boolean,
    toggleDrawer: () => void
}

export const LeftDrawer = ({ drawerOpened, toggleDrawer }: props) => {
    const user = useSelector((state: RootState) => state.user.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [searchValue,searchSet]=useState("")
    const [add_contacts]=useSearchContacts();
    return (
        <Drawer position="left" size="xs" opened={drawerOpened} onClose={toggleDrawer} title="">
            <Stack>
                <Group ml={"lg"}><Avatar radius="50%" size={"xl"} /></Group>
                <Group ml={"md"}>{user?.username}</Group>
                <Button onClick={open}>add contacts</Button>
            </Stack>

            <Modal opened={opened} onClose={close} title="Add contacts">
                <TextInput onChange={(e)=>{searchSet(e.currentTarget.value)}} placeholder={"search Email"} rightSection={
                    <ActionIcon onClick={()=>{
                        add_contacts({search:searchValue})
                    }}>
                        <IconSearch size={24} />
                    </ActionIcon>
                }></TextInput>
            </Modal>
        </Drawer>
    )
}