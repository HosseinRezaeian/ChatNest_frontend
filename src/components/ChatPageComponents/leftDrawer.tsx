import { ActionIcon, Avatar, Button, Drawer, Group, Modal, Paper, Stack, Table, TextInput } from "@mantine/core"
import type { RootState } from '@/app/store';
import { useSelector } from "react-redux";
import { json } from "stream/consumers";
import { useDisclosure } from "@mantine/hooks";
import { IconPencilSearch, IconSearch } from "@tabler/icons-react";
import { useGetListContacts, useSearchContacts } from "@/api/Contact";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";






type props = {
    drawerOpened: boolean,
    toggleDrawer: () => void
}

export const LeftDrawer = ({ drawerOpened, toggleDrawer }: props) => {
    const user = useSelector((state: RootState) => state.user.user);
    const [opened, { open, close }] = useDisclosure(false);
    const [opencontactinfo, { open:openinfo, close:closeinfo  }] = useDisclosure(false);
    const { data: contacts } = useGetListContacts()

    const [searchTerm, setSearchTerm] = useState('');
    const filteredContacts = contacts?.filter(contact =>
        contact.target.email.includes(searchTerm)
    );
    const [add_contacts, { isSuccess, isError }]=useSearchContacts();
      useEffect(() => {
    if (isSuccess) {
      notifications.show({
        title: 'موفقیت',
        message: 'مخاطب با موفقیت اضافه شد ✅',
        color: 'green',
      });
    }
    if (isError) {
      notifications.show({
        title: 'خطا',
        message: 'افزودن مخاطب با مشکل مواجه شد ❌',
        color: 'red',
      });
    }
  }, [isSuccess, isError]);
    return (
        <Drawer position="left" size="xs" opened={drawerOpened} onClose={toggleDrawer} title="">
            <Stack>
                <Group ml={"lg"}><Avatar radius="50%" size={"xl"} /></Group>
                <Group ml={"md"}>{user?.username}</Group>
                <Button onClick={open}>مخاطبین</Button>
        
            </Stack>

            <Modal size="md" opened={opened} onClose={close} title="contacts">
                <TextInput onChange={(e)=>{setSearchTerm(e.currentTarget.value)}} placeholder='جستوجو...' rightSection={filteredContacts?.length==0?
                    
                    
                    (<ActionIcon onClick={()=>{close()
                      add_contacts({search:searchTerm})
                      setSearchTerm('')
                    }}>
                        <IconPencilSearch size={24} />

                        
                    </ActionIcon>):(<></>)
                }></TextInput>



    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>آواتار</Table.Th>
          <Table.Th>ایمیل</Table.Th>
          <Table.Th>نام کاربری</Table.Th>

        </Table.Tr>
      </Table.Thead>
{
    filteredContacts?.map((contact)=>(

        <Table.Tr onClick={openinfo} key={contact.id}> 
        <Table.Th><Avatar size={20}></Avatar></Table.Th>
        <Table.Th>{contact.target.email}</Table.Th>
        <Table.Th>{contact.target.username}</Table.Th>

        </Table.Tr>
    ))



}

      </Table>

            </Modal>


            <Modal size="md" opened={opencontactinfo} onClose={closeinfo} title="">
            </Modal>
        </Drawer>
    )
}