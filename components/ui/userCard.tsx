import { AccountType } from "@/types";
import { Button } from "./button";
import DeleteUser from "@/app/accounts/deleteUser";

const UserCard = ({
  name,
  email,
  role,
}: Pick<AccountType, "name" | "email" | "role">) => {
  return (
    <div className="bg-background px-8 py-6 w-full rounded-md flex flex-col space-y-4">
      <h1>
        Name: <span className="text-lg font-semibold">{name}</span>
      </h1>
      <h1>
        Email: <span className="text-lg font-semibold">{email}</span>
      </h1>
      <h1>
        Role: <span className="text-lg font-semibold">{role}</span>
      </h1>
      <DeleteUser />
    </div>
  );
};

export default UserCard;
