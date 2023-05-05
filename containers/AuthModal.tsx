import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseToastOptions,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRef } from "react";
import { IconContext } from "react-icons";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "~/components/Link";

const btnGroup = [
  {
    icon: <FaGithub />,
    text: "Sign in with Github",
    provider: "github",
  },
  {
    icon: (
      <IconContext.Provider value={{ color: "#3b5998" }}>
        <FaFacebook />
      </IconContext.Provider>
    ),
    text: "Sign in with Facebook",
    provider: "facebook",
  },
  {
    icon: <FcGoogle />,
    text: "Sign in with Gmail",
    provider: "google",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type AvailableProviderOAuth = "github" | "google" | "facebook";

export default function AuthModal({ isOpen, onClose }: Props) {
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const supabase = useSupabaseClient();

  const createErrorToast = (
    title: string,
    description: string
  ): UseToastOptions => {
    return {
      title,
      description,
      status: "error",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    };
  };

  const loginWithOAuth = async (provider: AvailableProviderOAuth) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) {
        return toast(
          createErrorToast(
            "Cannot created account.",
            "Something error and we cannot create an account for you. Please try again later."
          )
        );
      }
    } catch (err) {
      console.log(err);
      toast(
        createErrorToast(
          "Cannot created account.",
          "Something error and we cannot create an account for you. Please try again later."
        )
      );
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size={["sm", "md", "xl"]}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">Welcome Back.</ModalHeader>
        <ModalCloseButton />

        <VStack mt={8}>
          {btnGroup.map((btn) => (
            <Button
              justifyContent="flex-start"
              key={btn.text}
              minW="64"
              leftIcon={btn.icon}
              rounded="full"
              variant="outline"
              onClick={() =>
                loginWithOAuth(btn.provider as AvailableProviderOAuth)
              }
            >
              {btn.text}
            </Button>
          ))}
        </VStack>

        <VStack mt={4}>
          <HStack>
            <Text>Or </Text>
            <Link href="" color="purple.500">
              create new one?
            </Link>
          </HStack>
        </VStack>

        <ModalFooter textAlign="center" mt={16}>
          <Text fontSize="sm">
            Click “Sign In” to agree to nearly-medium.com's{" "}
            <Link href="" color="purple.500">
              Terms of Service
            </Link>{" "}
            and acknowledge that nearly-medium.com's{" "}
            <Link href="" color="purple.500">
              Privacy Policy
            </Link>{" "}
            applies to you.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
