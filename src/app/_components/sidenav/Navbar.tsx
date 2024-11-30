"use client";

import { useState } from "react";
import { FaTachometerAlt, FaStore, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "./Navbar.module.css";

interface NavbarLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${active ? classes.active : ""}`}
      >
        <Icon size={20} />
      </UnstyledButton>
    </Tooltip>
  );
}

const sidebardata = [
  { icon: FaTachometerAlt, label: "Dashboard", path: "/" },
  { icon: FaStore, label: "Shops", path: "/shops" },
  { icon: FaCogs, label: "Settings", path: "#settings" },
];

export function Navbar() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const links = sidebardata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        router.push(link.path);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <div className={classes.logo}>Shop Yangu</div>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink
          icon={FaSignOutAlt}
          label="Logout"
          onClick={() => router.push("/")}
        />
      </Stack>
    </nav>
  );
}
