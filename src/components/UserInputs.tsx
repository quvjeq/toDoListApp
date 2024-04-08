import { Button } from "@/components/ui/button";

type Foo = {
  work?: string;
  underline?: boolean;
};

type Props = {
  setUserValue: React.Dispatch<React.SetStateAction<string>>;
  userValue: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const UserInputs = ({ setUserValue, userValue, onSubmit }: Props) => {
  return (
    <>
      <div className="flex flex-col justify-center text-center  m-auto">
        <h1 className=" text-4xl text-white"> Task Manager </h1>
        <div className="relative py-10 w-6/12 m-auto">
          <form className="flex justify-between" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              placeholder="Type task..."
              className="rounded-full px-3 w-9/12"
              onChange={(e) => {
                let t = e.target.value;
                setUserValue(t.charAt(0).toUpperCase() + t.slice(1));
              }}
              value={userValue}
            />
            <Button className="py-6">Add</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInputs;
