import React, { useState, createContext, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { trashOutline } from "ionicons/icons";
import { bagCheckOutline } from "ionicons/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "@/components/theme-provider";
import UserInputs from "./components/UserInputs";

setupIonicReact();

interface Foo {
  work?: string;
  underline?: boolean;
}

const initialWork = [
  { work: "0" },
  { work: "1" },
  { work: "2" },
  { work: "3" },
  { work: "4" },
  { work: "5" },
];

function App() {
  const [tasks, setTasks] = useState<Foo[]>(initialWork);
  const [userValue, setUserValue] = useState<string>("");
  const [showIndex, setIndex] = useState<number[]>([]);
  const [newValue, setNewValue] = useState("");
  const [isHidden, setHidden] = useState(0);
  const [isEdit, setEdit] = useState(100);
  const [isOnFocus, setOnFocus] = useState(false);
  const { toast } = useToast();

  const { setTheme } = useTheme();

  const handleIndex = (index: number) => {
    if (showIndex.includes(index))
      setIndex(showIndex.filter((a) => a !== index));
    else setIndex([...showIndex, index]);
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userValue == "") {
      toast({
        variant: "destructive",
        description: 'Cant set  task "' + userValue + '"',
      });
      return;
    }
    setTasks([...tasks, { work: userValue }]); //set task
    toast({
      description: 'Added task "' + userValue + '"',
    });
    setUserValue(""); //clear input
  };

  const handleRemove = () => {
    setTasks(tasks.filter((x, key) => (showIndex.includes(key) ? "" : x.work)));
    setIndex([]);
  };

  const handleRemoveSingle = (value: Foo, index: number) => {
    setTasks(tasks.filter((x) => x.work !== value.work));
    let newArray = [];
    for (let element of showIndex) {
      if (index < element) newArray.push(--element);
      else newArray.push(element);
    }
    setIndex(newArray); //this fix index error
  };

  const handleEditSingle = (value: Foo, newValue: string, index: number) => {
    // console.log("work");
    if (newValue === "") {
      //setEdit(999); //ONLY RESET NEDDED
      console.log("You cant set that");
      return;
    }

    setTasks(
      tasks.map((x) => {
        if (x.work == value.work) {
          return {
            ...x,
            work: newValue,
          };
        } else {
          return x;
        }
      })
    );
    setEdit(999); //ONLY RESET NEDDED
    // setNewValue();
  };

  const handleRemoveAll = () => {
    toast({
      description: "Tasks removed",
    });
    setTasks([]);
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <UserInputs
          setUserValue={setUserValue}
          userValue={userValue}
          onSubmit={(e) => handleForm(e)}
        />

        {/* <div className="flex flex-col justify-center text-center  m-auto">
          <h1 className=" text-4xl text-white"> Task Manager </h1>
          <div className="relative py-10 w-6/12 m-auto">
            <form
              className="flex justify-between"
              onSubmit={(e) => handleForm(e)}
            >
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
              </div> */}
        <div className="flex flex-col justify-center w-2/4 m-auto border-2 p-5 rounded-t-md">
          {tasks.length == 0 && (
            <label className="text-base text-zinc-400 m-auto py-40">
              No task found, add one...
            </label>
          )}
          <ul className="flex flex-col h-fit whitespace-pre-line gap-y-2">
            {tasks.map((value, index) => (
              <li
                className={
                  (showIndex.includes(index) && "listToDoX") + " listToDo"
                }
                onMouseEnter={() => setHidden(index)}
                onMouseLeave={() => setHidden(100)}
                key={index}
              >
                <Checkbox
                  className="h-7 w-7"
                  checked={false}
                  onClick={() => {
                    handleIndex(index);
                  }}
                />
                {isEdit === index ? (
                  <div className="flex flex-col ">
                    <input
                      autoFocus
                      className="propio w-fit"
                      type="text"
                      defaultValue={value.work}
                      onKeyDown={(y) => {
                        y.key == "Enter"
                          ? handleEditSingle(value, newValue, index)
                          : "";
                      }}
                      onChange={(e) => {
                        setNewValue(e.target.value);
                      }}
                      onFocus={(e) => setNewValue(e.target.value)}
                      onBlur={() => setEdit(999)} //MASTER RESET EDIT
                    />
                    <span className="simpleSpan">Pulse "Enter" for submit</span>
                  </div>
                ) : (
                  <p className=" text-ellipsis overflow-hidden">{value.work}</p>
                )}
                {/* {value.work} */}

                <div className="flex flex-auto justify-between">
                  {isHidden === index && (
                    <>
                      <div>
                        <IonIcon
                          icon={createOutline}
                          onClick={() =>
                            isEdit != index ? setEdit(index) : setEdit(999)
                          }
                          className="ionIconEdit"
                        />
                      </div>
                      <div>
                        <IonIcon
                          icon={trashOutline}
                          onClick={() => handleRemoveSingle(value, index)}
                          className="ionIconX"
                        />
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Button className="" onClick={handleRemove}>
            <IonIcon icon={bagCheckOutline} />
            Clear completed
          </Button>
          <Button
            variant="outline"
            className=" text-white bg-red-500 w-1/4"
            onClick={handleRemoveAll}
          >
            Remove
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
