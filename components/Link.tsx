import {
  Link as UILink,
  type ThemingProps,
  type LinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";

type Props = LinkProps &
  ThemingProps & {
    href: string;
    children: React.ReactNode | string;
  };

export default function Link({ href, ...rest }: Props) {
  return (
    <UILink
      _hover={{ textDecoration: "none" }}
      as={NextLink}
      href={href}
      {...rest}
    />
  );
}
