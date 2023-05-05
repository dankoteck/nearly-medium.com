import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";
import Link from "~/components/Link";
import UserMenu from "~/components/UserMenu";
import AuthModal from "~/containers/AuthModal";

type Props = {
  children: React.ReactNode | null;
};

export default function BaseLayout({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useUser();

  return (
    <>
      <Head>
        <title>nearly-medium.com</title>
        <meta name="description" content="nearly-medium.com using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Flex
          p={4}
          borderBottom="1px"
          borderColor="gray.200"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/">
            <Text fontSize={["xl", "2xl", "3xl"]}>nearly-medium.com</Text>
          </Link>

          <InputGroup width="fit-content">
            <InputLeftElement pointerEvents="none">
              <FaSearch />
            </InputLeftElement>
            <Input
              width={[200, 300, 400, 500]}
              placeholder="Search anything..."
            />
          </InputGroup>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <Stack direction="row" alignItems="center">
              <Button
                onClick={onOpen}
                size={"sm"}
                colorScheme="purple"
                variant="ghost"
              >
                Sign in
              </Button>
              <Button colorScheme="purple" size="sm">
                Get started
              </Button>
            </Stack>
          )}
        </Flex>

        <AuthModal isOpen={isOpen} onClose={onClose} />
      </header>

      <main className="min-h-screen my-16">{children}</main>
    </>
  );
}
