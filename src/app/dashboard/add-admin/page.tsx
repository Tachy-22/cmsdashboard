import { adminAuthRequired } from "@/lib/auth";
import React from "react";
import Fallback from "./fallback";
import AddAdminForm from "@/components/AddAdminForm";
import { getAdmins } from "@/actions/users/getAdmins";
import { User } from "@nextui-org/react";

const page = async () => {
  const isAdmin = await adminAuthRequired();
  if (!isAdmin) return <Fallback />;
  const admins = (await getAdmins()) || [];

  return (
    <div className="max-w-7xl w-full flex flex-col pt-[3rem] px-[3rem] gap-[3rem] ">
      <AddAdminForm />
      <div className="flex flex-col gap-3">
        <div className="">CMS Admins:</div>
        {admins?.map(({ name, email }, id) => {
          return (
            <div key={id}>
              <User name={name} description={email} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
