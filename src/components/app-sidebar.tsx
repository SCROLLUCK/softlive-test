import { Puzzle, ShoppingCart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, matchPath, useLocation } from "react-router-dom";
import Logo from "@/assets/logo.png";

import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const location = useLocation();
  const { t } = useTranslation();

  const items = [
    {
      title: t("app.product.products"),
      url: "/products",
      activeRoutes: ["/", "/products", "/products/new", "/products/:id"],
      icon: ShoppingCart,
    },
    {
      title: t("app.product.categories"),
      url: "/categories",
      activeRoutes: ["/", "/categories"],
      icon: Puzzle,
    },
  ];

  const isRouteActive = (patterns: string[]) => {
    return patterns.some((pattern) => matchPath(pattern, location.pathname));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-gray-800">
        <img src={Logo} />
      </SidebarHeader>
      <SidebarContent className="bg-gray-800">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="bg-gray-700 text-white data-[active=true]:bg-white data-[active=true]:text-gray-800"
                    isActive={isRouteActive(item.activeRoutes)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
