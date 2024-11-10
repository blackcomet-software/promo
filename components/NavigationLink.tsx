"use client";

import { ReactNode } from "react";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const NavigationLink = (props: {
  navId: string;
  children: ReactNode;
}) => {
  return (
    <div onClick={() => scrollToSection(props.navId)}>{props.children}</div>
  );
};
