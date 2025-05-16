"use client";

import { useAuth } from "@/app/hooks/useAuthContext";

interface HeaderProps {
  showOptions: boolean;
}

export default function Header({ showOptions = true }: HeaderProps) {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <div className="bg-white flex-col p-10 shadow-amber-50">
      <div className="mx-auto flex max-w-7xl justify-between">
        <article>
          <span>LinkUp</span>
          <span>Xicone</span>
        </article>
        {showOptions && user && <span>{getInitials(user.username)}</span>}
      </div>
    </div>
  );
}
