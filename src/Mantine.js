import { AppShell, MantineProvider } from "@mantine/core";
import Header from "~/Header";
import { NavbarSegmented } from "~/Navbar";

export default function Mantine({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <AppShell
        padding="md"
        navbar={<NavbarSegmented />}
        header={<Header />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
}
