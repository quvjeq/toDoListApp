import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  setUserValue: React.Dispatch<React.SetStateAction<string>>;
  userValue: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const UserInputs = ({ setUserValue, userValue, onSubmit }: Props) => {
  return (
    <>
      <div className="relative py-10 w-6/12 m-auto">
        <form className="flex justify-between" onSubmit={(e) => onSubmit(e)}>
          <Input
            type="text"
            placeholder="Type a task..."
            onChange={(e) =>
              setUserValue(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
            value={userValue}
          />
          <Button type="submit" variant={"secondary"}>
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserInputs;
