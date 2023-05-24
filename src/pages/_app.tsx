import { AppShell, MantineProvider } from "@mantine/core";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { useState } from "react";
import { Header } from "~/components/Header";
import { Navbar } from "~/components/Navbar";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <AppShell
          padding={"xs"}
          navbar={<Navbar isNavbarOpen={!opened} />}
          header={<Header isNavbarOpen={opened} toggleNavbar={setOpened} />}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
