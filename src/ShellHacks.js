import {
  Navbar,
  Select,
  Text,
  createStyles,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconHome,
  IconLogout,
  IconMessage,
  IconReceipt2,
  IconSkull,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { accountsAtom, accountsIndexAtom, customerAtom } from "./atoms";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: "uppercase",
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },
}));

const tabs = {
  account: [
    { link: "/", label: "Home", icon: IconHome },
    { link: "/loans", label: "Loan Progress", icon: IconReceipt2 },
    { link: "/chat", label: "Chat", icon: IconMessage },
  ],
  general: [{ link: "", label: "Orders", icon: IconSkull }],
};

export function NavbarSegmented() {
  const customer = useAtomValue(customerAtom);

  const { classes, cx } = useStyles();
  const [section, setSection] = useState("account");
  const [active, setActive] = useState("Billing");
  const [activeAcc, setActiveAcc] = useAtom(accountsIndexAtom);
  const accounts = useAtomValue(accountsAtom);

  let links = tabs[section].map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section>
        <Text
          weight={500}
          size="sm"
          className={classes.title}
          color="dimmed"
          mb="xs"
        >
          {customer.name}
        </Text>

        <Select
          label="Change to a different account"
          data={accounts.map((acc, i) => ({
            value: i,
            label: acc.name,
          }))}
          placeholder="Pick one"
          searchable
          nothingFound="No options"
          value={activeAcc}
          onChange={setActiveAcc}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
