import { AppShell, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Header } from "~/components/Header";
import { Navbar } from "~/components/Navbar";
import { CarrinhoProvider } from "~/contexts/Carrinho";
import { NavbarOpenProvider } from "~/contexts/Navbar";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CarrinhoProvider>
        <NavbarOpenProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "light",
            }}
          >
            <Notifications limit={5} />
            <AppShell padding={"xs"} navbar={<Navbar />} header={<Header />}>
              <Component {...pageProps} />
            </AppShell>
          </MantineProvider>
        </NavbarOpenProvider>
      </CarrinhoProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
