import Image from "next/image"

import { HeaderContainer } from "@/styles/components/header"

import logoImg from "@/assets/logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />
    </HeaderContainer>
  );
}
