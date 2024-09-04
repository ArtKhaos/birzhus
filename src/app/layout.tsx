import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.scss";
import classNames from "classnames";
import {ProfileProvider} from "@/context/profileContext";
import NavBar from "@/components/nav/navBar";

const montserrat = Montserrat({subsets: ["latin"], variable: '--mont'});

export const metadata: Metadata = {
    title: "Биржус",
    description: "Биржа телеграм",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="ru">
        <meta charSet="utf-8"/>
        <body className={classNames(montserrat.className, montserrat.variable)}>
        <ProfileProvider>
            <NavBar/>
            {children}
        </ProfileProvider>
        </body>
        </html>
    );
}
