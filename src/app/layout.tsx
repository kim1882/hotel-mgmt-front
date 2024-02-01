import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Providers } from "@/lib/providers";
import HotelIcon from "@mui/icons-material/Hotel";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import Sidebar from "@/components/Sidebar";

const WIDTH = 180;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Management",
  description: "Created by Lupita Estrada",
};

const ROUTES = [{ title: "Rooms", href: "/hotel-management", icon: HotelIcon }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="fixed" sx={{ zIndex: 2000 }}>
                <Toolbar sx={{ backgroundColor: "background.paper" }}>
                  <Typography variant="h6" color="text.primary">
                    Hotel Management
                  </Typography>
                </Toolbar>
              </AppBar>
              <Sidebar width={WIDTH} routes={ROUTES} />
              <Box
                component="main"
                sx={{
                  minHeight: "100vh",
                  flexGrow: 1,
                  bgcolor: "background.default",
                  ml: `${WIDTH}px`,
                  mt: ["48px", "56px", "64px"],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
