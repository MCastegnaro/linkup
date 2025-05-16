/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import LinkModal from "@/app/components/modal/LinkModal";
import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";
import { CreateLinkParams } from "@/app/data/interfaces/create-link";
import { UpdateLinkParams } from "@/app/data/interfaces/update-link";
import { useAuth } from "@/app/hooks/useAuthContext";
import { useToast } from "@/app/hooks/useToastContext";
import { CreateLinkService } from "@/app/services/link/CreateLinkService";
import { DeleteLinkService } from "@/app/services/link/DeleteLinkService";
import { ListLinkService } from "@/app/services/link/ListLinkService";
import { UpdateLinkService } from "@/app/services/link/UpdateLinkService";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Trash } from "react-feather";

interface Link {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface LinksList {
  personal?: Array<Link>;
  work?: Array<Link>;
  education?: Array<Link>;
}

const axios = new AxiosAdapter();

export default function LinkManagementPage() {
  const [links, setLinks] = useState<LinksList>({} as LinksList);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<Link | undefined>(undefined);

  const { ShowToast } = useToast();

  const { logout, user } = useAuth();

  const GetLinks = useCallback(async (user_id: string) => {
    await new ListLinkService(axios).list(user_id).then((response) => {
      setLinks(response.links);
    });
  }, []);

  const CreateLink = useCallback(
    async (data: CreateLinkParams) => {
      if (!user) return;

      await new CreateLinkService(axios).create(user.id, data).then(() => {
        ShowToast("Link created!!", "success");
      });
    },
    [ShowToast, user]
  );

  const UpdateLink = useCallback(
    async (data: UpdateLinkParams) => {
      if (!user) return;

      await new UpdateLinkService(axios).patch(data).then(() => {
        ShowToast("Link updated!!", "success");
      });
    },
    [ShowToast, user]
  );

  const RemoveLink = useCallback(
    async (linkId: string) => {
      if (!user) return;

      await new DeleteLinkService(axios).remove(linkId).then(() => {
        ShowToast("Link removed!!", "success");
      });
    },
    [ShowToast, user]
  );

  const handleSubmit = async (data: CreateLinkParams) => {
    if (initialData) {
      UpdateLink({
        ...data,
        id: initialData.id,
      });
      return;
    }
    CreateLink(data);
  };

  useEffect(() => {
    if (user) {
      GetLinks(user.id);
    }
  }, [GetLinks, user]);

  return (
    <section className="flex h-screen bg-white flex-col">
      <header className="flex flex-row justify-around h-25 w-full items-center shadow-xs">
        <span className="font-black text-2xl">LinkifyMe</span>
        <nav className="flex gap-6">
          <Link
            href={"/register"}
            className="hover:text-orange-400 hover:underline "
          >
            Landing page
          </Link>
          <Link
            href={"/register"}
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
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded bg-amber-600 px-6 py-3 font-semibold cursor-pointer text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Add Link
          </button>
          <button
            type="button"
            onClick={logout}
            className="py-3  cursor-pointer text-gray-500 hover:text-orange-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      <section className="h-full">
        <div className="flex gap-8 py-8 px-[10%] w-full">
          <article className="text-black text-lg font-normal bg-orange-200 w-1/3 h-auto rounded p-6 ">
            <span>Work Links</span>
            {links.work?.map((link) => (
              <div key={link.id} className="flex flex-col gap-4 mt-6">
                <div className="bg-white text-black p-6 rounded flex justify-between items-center ">
                  <div
                    onClick={() => {
                      setInitialData(link);
                      setIsModalOpen(true);
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-semibold text-md">{link.title}</span>
                    <span className="font-light text-sm">
                      {link.description}
                    </span>
                  </div>
                  <Trash
                    size={24}
                    className="hover:text-red-800 cursor-pointer"
                    onClick={() => RemoveLink(link.id)}
                  />
                </div>
              </div>
            ))}
          </article>
          <article className="text-black text-lg font-normal bg-gray-300 w-1/3 h-auto rounded p-6 ">
            <span>Personal Links</span>

            {links.personal?.map((link) => (
              <div key={link.id} className="flex flex-col gap-4 mt-6">
                <div className="bg-white text-black p-6 rounded flex justify-between items-center ">
                  <div
                    onClick={() => {
                      setInitialData(link);
                      setIsModalOpen(true);
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-semibold text-md">{link.title}</span>
                    <span className="font-light text-sm">
                      {link.description}
                    </span>
                  </div>
                  <Trash
                    size={24}
                    className="hover:text-red-800 cursor-pointer"
                    onClick={() => RemoveLink(link.id)}
                  />
                </div>
              </div>
            ))}
          </article>
          <article className="text-white text-lg font-normal bg-amber-600 w-1/3 h-auto rounded p-6 ">
            <span>Educational Links</span>
            {links.education?.map((link) => (
              <div key={link.id} className="flex flex-col gap-4 mt-6">
                <div className="bg-white text-black p-6 rounded flex justify-between items-center ">
                  <div
                    onClick={() => {
                      setInitialData(link);
                      setIsModalOpen(true);
                    }}
                    className="flex flex-col cursor-pointer"
                  >
                    <span className="font-semibold text-md">{link.title}</span>
                    <span className="font-light text-sm">
                      {link.description}
                    </span>
                  </div>
                  <Trash
                    size={24}
                    className="hover:text-red-800 cursor-pointer"
                    onClick={() => RemoveLink(link.id)}
                  />
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>

      {isModalOpen && (
        <LinkModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => handleSubmit(data as any)}
          initialData={initialData}
        />
      )}
    </section>
  );
}
