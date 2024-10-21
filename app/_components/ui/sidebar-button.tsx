"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const SidebarButton = ({ icon, text, href }: SidebarButtonProps) => {
  const pathName = usePathname();
  return (
    <Button
      variant={pathName === href ? "default" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>
        {icon}
        {text}
      </Link>
    </Button>
  );
};

export default SidebarButton;
