"use client";

import Image from "next/image";
import Link from "next/link";

import { Star } from "react-feather";

import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";
import { useAuth } from "@/app/hooks/useAuthContext";
import {
  ListLinkService,
  PublicLinkResponse,
} from "@/app/services/link/ListLinkService";
import Profile from "@/public/assets/profile.avif";
import { useCallback, useEffect, useState } from "react";

const axios = new AxiosAdapter();

export default function LinkManagementPage() {
  const [userData, setLinks] = useState<PublicLinkResponse>(
    {} as PublicLinkResponse
  );

  const { user } = useAuth();

  const GetLinks = useCallback(async (username: string) => {
    await new ListLinkService(axios).listPublic(username).then((response) => {
      setLinks(response);
    });
  }, []);

  useEffect(() => {
    if (user) {
      GetLinks(user.username);
    }
  }, [GetLinks, user]);

  return (
    <section className="flex h-screen bg-white flex-col">
      <header className="flex flex-row justify-around h-25 w-full items-center shadow-xs">
        <span className="font-black text-2xl">LinkifyMe</span>
        <nav className="flex gap-6">
          <Link
            href={"/link-management"}
            className=" hover:text-orange-400  hover:underline "
          >
            Link Management
          </Link>
          <Link
            href={"/register"}
            className=" hover:text-orange-400 hover:underline"
          >
            Settings
          </Link>
        </nav>
      </header>

      <section className="h-full">
        <div className="flex gap-8 py-16 px-[10%] w-full items-center flex-col">
          <div className="flex overflow-hidden">
            <Image
              className="inline-block rounded-full ring-2 ring-white"
              alt="people creating a UI interface"
              width={200}
              src={Profile}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">{userData.fullname}</span>
            <p className="text-md">
              Here we can implement a bio for the user to tell a little about
              their story.
            </p>
          </div>
          <section className="flex flex-wrap gap-8 justify-center">
            {userData.links?.map((link) => (
              <article
                key={link.id}
                className="flex min-w-[300px] items-center shadow-lg gap-2 cursor-pointer hover:shadow-amber-200 rounded-2xl p-6"
              >
                <Star className="text-amber-400" />
                <article className="flex flex-col">
                  <span className="text-lg font-black">{link.title}</span>
                  <span>{link.description}</span>
                </article>
              </article>
            ))}
          </section>
        </div>
      </section>
    </section>
  );
}
