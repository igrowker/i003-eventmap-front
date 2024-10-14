"use client";

import { HiHome } from "react-icons/hi2";
import HomeIcon from "../../../public/HiHome.svg";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { BsPerson, BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname(); //path actual

  //icono seleccionado basado en el path actual
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "/":
        return pathname === "/" ? (
          <HiHome size={30} className="text-white" />
        ) : (
          <HomeIcon size={30} className="text-white" />
        );
      case "/notifications":
        return pathname === "/notifications" ? (
          <IoMdNotifications size={30} className="text-white" />
        ) : (
          <IoMdNotificationsOutline size={30} className="text-white" />
        );
      case "/login":
      case "/register":
        return pathname === "/login" || pathname === "/register" || pathname === "/profile"? (
          <BsFillPersonFill size={30} className="text-white" />
        ) : (
          <BsPerson size={30} className="text-white" />
        );
      default:
        return (
          <>
            <HiHome size={30} className="text-white" />
            <IoMdNotificationsOutline size={30} className="text-white" />
            <BsPerson size={30} className="text-white" />
          </>
        );
    }
  };

  return (
    <main className="fixed bottom-0 left-0 w-full bg-[#6750A4] shadow-lg z-50 z-[9999]">
      <div className="flex justify-around items-center py-3">
        <Link href="/">{renderIcon("/")}</Link>
        <Link href="/notifications">{renderIcon("/notifications")}</Link>
        <Link href="/profile">{renderIcon("/login")}</Link>
      </div>
    </main>
  );
}

export default NavBar;
