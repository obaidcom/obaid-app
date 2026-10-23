import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
const cairo = Cairo({ subsets:["arabic","latin"], variable:"--font-cairo", display:"swap" });
export const metadata: Metadata = {
 title:"متجر عبيد | تسوّق بذكاء واكتشف منتجات مميزة",
 description:"تسوّق من متجر عبيد الإلكتروني واكتشف الإلكترونيات والإكسسوارات ومنتجات المنزل والموضة بتجربة عربية عصرية ومتوافقة مع الهاتف.",
 applicationName:"متجر عبيد",
 metadataBase:new URL("https://obaidcom.github.io/obaid-store/"),
 alternates:{canonical:"/"},
 robots:{index:true,follow:true,googleBot:{"index":true,"follow":true,"max-image-preview":"large"}},
 openGraph:{type:"website",locale:"ar_AR",siteName:"متجر عبيد",title:"متجر عبيد | تسوّق بذكاء",description:"اكتشف منتجات مختارة وتجربة تسوق عربية عصرية من متجر عبيد.",url:"https://obaidcom.github.io/obaid-store/",images:["https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=85"]},
 twitter:{card:"summary_large_image",title:"متجر عبيد | تسوّق بذكاء",description:"تجربة تسوق عربية عصرية للإلكترونيات والإكسسوارات والمنتجات اليومية."},
};
export const viewport: Viewport = { themeColor:"#2457e6", width:"device-width", initialScale:1 };
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ar" dir="rtl" suppressHydrationWarning><body className={cairo.className}><ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>{children}</ThemeProvider></body></html>;
}
