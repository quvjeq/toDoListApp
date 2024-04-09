import React, { useState } from "react";

import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { trashOutline } from "ionicons/icons";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PanelTask from "@/components/PanelTask";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import moment from "moment";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ZoomInIcon } from "@radix-ui/react-icons";

class DateClass {
  public getDate(): string {
    return moment().format("llll");
  }
}

type Foo = {
  work?: string;
  completed?: boolean;
  dateCompleted?: string;
};

type Props = {
  style?: React.CSSProperties;
  setTasks: React.Dispatch<React.SetStateAction<Foo[]>>;
  tasks: Foo[];
  children?: React.ReactNode;
};

const TaskList = ({ setTasks, tasks }: Props) => {
  // const handleIndex = (index: number) => {
  //   if (showIndex.includes(index))
  //     setIndex(showIndex.filter((a) => a !== index));
  //   else setIndex([...showIndex, index]);
  // };

  const handleComplete = (value: Foo) => {
    setTasks(
      tasks.map((x) => {
        if (x.work == value.work) {
          return {
            ...x,
            completed: true,
          };
        } else {
          return x;
        }
      })
    );
    console.log(tasks);
  };

  const handleRemoveSingle = (value: Foo, index: number) => {
    setTasks(tasks.filter((x) => x.work !== value.work));
    let newArray = [];
    for (let element of showIndex) {
      if (index < element) newArray.push(--element);
      else newArray.push(element);
    }
    setIndex(newArray); //re-ordenate indexes
  };

  const handleEditSingle = (value: Foo, newValue: string) => {
    if (newValue === "") {
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
  };

  const handleClear = () => {
    let a = tasks.filter((x) => x.completed && x); // list of completeds
    let c = a.map((x) => {
      // adding new object
      return {
        ...x,
        dateCompleted: moment().format("llll"),
      };
    });

    setTasksComplete([...tasksComplete, ...c]);
    setTasks(tasks.filter((x) => (x.completed ? "" : x))); // delete from original list
  };

  const handleRemoveAll = () => {
    toast({
      description: "Tasks removed",
    });
    setTasks([]);
  };

  const [tasksComplete, setTasksComplete] = useState<Foo[]>([]);

  const [isHidden, setHidden] = useState(0);
  const [isEdit, setEdit] = useState(100);
  const [showIndex, setIndex] = useState<number[]>([]);
  const [newValue, setNewValue] = useState("");
  const { toast } = useToast();

  return (
    <>
      <Card className="w-2/3 min-w-80 m-auto">
        <CardHeader>
          <CardTitle>Control Panel</CardTitle>
        </CardHeader>
        <CardFooter>
          <PanelTask
            handleRemove={handleClear}
            handleRemoveAll={handleRemoveAll}
          />
        </CardFooter>
      </Card>

      <Tabs defaultValue="account" className="w-full my-8">
        <TabsList className="grid w-2/3 grid-cols-2 m-auto">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="w-2/3 min-w-80 m-auto">
            <ul
              className="my-6 mx-6 ml-6 [&>li]:mt-2 overflow-y-auto"
              style={{ maxHeight: "40vh" }}
            >
              {tasks.length == 0 && (
                <label className="text-base text-zinc-400 m-auto">
                  No task found, add one...
                </label>
              )}

              {tasks.map((value, index) => (
                <li
                  className={"listToDo " + (value.completed ? "listToDoX" : "")}
                  onMouseEnter={() => setHidden(index)}
                  onMouseLeave={() => setHidden(100)}
                  key={index}
                >
                  <Checkbox
                    className="h-7 w-7"
                    checked={false}
                    onClick={() => {
                      // handleIndex(index);
                      handleComplete(value);
                    }}
                  />
                  {/* EDIT START */}
                  {isEdit === index ? (
                    <div className="flex flex-col ">
                      <Input
                        autoFocus
                        type="text"
                        defaultValue={value.work}
                        onKeyDown={(y) => {
                          y.key == "Enter"
                            ? handleEditSingle(value, newValue)
                            : "";
                        }}
                        onChange={(e) => {
                          setNewValue(e.target.value);
                        }}
                        onFocus={(e) => setNewValue(e.target.value)}
                        onBlur={() => setEdit(999)} //MASTER RESET EDIT
                      />
                      <div className="relative">
                        <span className="simpleSpan absolute top-0 text-gray-500 opacity-60  ">
                          "Enter" for submit
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Label className="text-ellipsis overflow-hidden">
                        {value.work}
                      </Label>
                    </>
                  )}
                  {/* EDIT END */}
                  {/* ACTIONS - START */}
                  <div className="flex flex-auto justify-between">
                    {isHidden === index && !value.completed && (
                      <>
                        <IonIcon
                          icon={createOutline}
                          onClick={() => isEdit != index && setEdit(index)}
                          className="opacity-40 hover:opacity-90 text-2xl"
                        />

                        <IonIcon
                          icon={trashOutline}
                          onClick={() => handleRemoveSingle(value, index)}
                          className="opacity-40 hover:opacity-90 text-2xl"
                        />
                      </>
                    )}
                  </div>
                  {/* ACTIONS - END */}
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="w-2/3 min-w-80 m-auto">
            <ul
              className="my-6 mx-6 ml-6 [&>li]:mt-2 overflow-y-auto"
              style={{ maxHeight: "40vh" }}
            >
              {tasksComplete.length == 0 && (
                <label className="text-base text-zinc-400 m-auto">
                  Complete first some tasks
                </label>
              )}

              {tasksComplete.map((value, index) => (
                <li key={index} className="flex justify-between ">
                  <Checkbox className="h-7 w-7" checked={true} />

                  <Label className="text-ellipsis overflow-hidden">
                    {value.work}
                  </Label>
                  <Label className="text-gray-500 opacity-70 italic">
                    {value.dateCompleted}
                  </Label>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default TaskList;
