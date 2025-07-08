import { Avatar, Drawer, Group, Stack } from "@mantine/core"
import type { RootState } from '@/app/srtore';
import { useSelector } from "react-redux";
import { json } from "stream/consumers";






type props = {
    drawerOpened: boolean,
    toggleDrawer: () => void
}

export const LeftDrawer = ({ drawerOpened, toggleDrawer }: props) => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <Drawer position="left" size="xs" opened={drawerOpened} onClose={toggleDrawer} title="">
            <Stack>
                <Group ml={"lg"}><Avatar radius="50%"  size={"xl"}/></Group>
                <Group ml={"lg"}>{JSON.stringify(user)}</Group>
            </Stack>
      

        </Drawer>
    )
}