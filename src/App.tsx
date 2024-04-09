import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ThemeProvider } from "@/components/theme-provider";

import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import UserInputs from "./components/UserInputs";
import TaskList from "./components/TaskList";

setupIonicReact();

type Foo = {
  work?: string;
  completed?: boolean;
  dateCompleted?: string;
};

const initialWork = [
  { work: "0", completed: false },
  { work: "1", completed: false },
  { work: "2", completed: false },
  { work: "3", completed: false },
  { work: "4", completed: false },
  { work: "5", completed: false },
];

function App() {
  const [tasks, setTasks] = useState<Foo[]>(initialWork);
  const [userValue, setUserValue] = useState<string>("");
  const { toast } = useToast();

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userValue == "") {
      toast({
        variant: "destructive",
        description: 'Cant set  task "' + userValue + '"',
      });
      return;
    }
    setTasks([{ work: userValue }, ...tasks]); //set task
    toast({
      description: 'Added task "' + userValue + '"',
    });
    setUserValue(""); //clear input
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <h1 className=" text-center text-4xl text-white"> Task Manager </h1>
        <UserInputs
          setUserValue={setUserValue}
          userValue={userValue}
          onSubmit={(e) => handleForm(e)}
        />
        <TaskList setTasks={setTasks} tasks={tasks}></TaskList>
      </ThemeProvider>
    </>
  );
}

export default App;
