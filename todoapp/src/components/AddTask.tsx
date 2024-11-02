import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

type Task = {
  name: string;
  details: string;
  completed: boolean;
};

const AddTaskComponent = ({ addTask }: { addTask: (task: Task) => void }) => {
  const [task, setTask] = useState<Task>({
    name: "",
    details: "",
    completed: false,
  });

  const WilladdTask = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ name: "", details: "", completed: false });
  };

  return (
    <Card className="w-[350px] absolute top-1/2 left-">
      <CardHeader>
        <CardTitle className="text-2xl">Tell me more about the task</CardTitle>
        {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Insert Task Name"
                onChange={(e) => setTask({ ...task, name: e.target.value })}
                value={task.name}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"> Add Description or Detail</Label>
              <Input
                id="name"
                placeholder="Insert Task Name"
                onChange={(e) => setTask({ ...task, details: e.target.value })}
                value={task.details}
              />
            </div>
            {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={WilladdTask}>Add Task</Button>
      </CardFooter>
    </Card>
  );
};

export default AddTaskComponent;
