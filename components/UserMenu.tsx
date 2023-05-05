import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { User, UserMetadata } from "@supabase/supabase-js";
import { FiChevronDown } from "react-icons/fi";

type Props = {
  user: User | null;
};

export default function UserMenu({ user }: Props) {
  return (
    <Menu>
      <>
        {/* <MenuButton as={Button} variant="link" rightIcon={<FiChevronDown />}> */}
        <Avatar
          size="sm"
          name={user?.user_metadata.name ?? ""}
          src={user?.user_metadata.avatar_url ?? ""}
        />
        {/* </MenuButton> */}

        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem onClick={() => alert("Kagebunshin")}>
            Create a Copy
          </MenuItem>
        </MenuList>
      </>
    </Menu>
  );
}
