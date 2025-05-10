"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import TaskCard from "./TaskCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  category: string;
}

interface TaskBoardProps {
  tasks?: {
    todo: Task[];
    inProgress: Task[];
    completed: Task[];
  };
}

export default function TaskBoard({
  tasks = {
    todo: [
      {
        id: "1",
        title: "Create project plan",
        description: "Outline the project scope and deliverables",
        priority: "high",
        dueDate: "2023-12-15",
        category: "planning",
      },
      {
        id: "2",
        title: "Research competitors",
        description: "Analyze similar products in the market",
        priority: "medium",
        dueDate: "2023-12-10",
        category: "research",
      },
    ],
    inProgress: [
      {
        id: "3",
        title: "Design user interface",
        description: "Create wireframes and mockups",
        priority: "high",
        dueDate: "2023-12-20",
        category: "design",
      },
    ],
    completed: [
      {
        id: "4",
        title: "Setup development environment",
        description: "Install necessary tools and dependencies",
        priority: "low",
        dueDate: "2023-12-05",
        category: "setup",
      },
    ],
  },
}: TaskBoardProps) {
  const [taskColumns, setTaskColumns] = useState(tasks);
  const [draggedTask, setDraggedTask] = useState<{
    task: Task;
    source: string;
  } | null>(null);

  // Task form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
    category: string;
  }>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
    category: "Work",
  });

  // Handle drag start
  const handleDragStart = (task: Task, source: string) => {
    setDraggedTask({ task, source });
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (targetColumn: string) => {
    if (!draggedTask) return;

    const { task, source } = draggedTask;

    // Don't do anything if dropping in the same column
    if (source === targetColumn) {
      setDraggedTask(null);
      return;
    }

    // Create a new state object
    const newTaskColumns = { ...taskColumns };

    // Remove from source column
    newTaskColumns[source as keyof typeof taskColumns] = newTaskColumns[
      source as keyof typeof taskColumns
    ].filter((t) => t.id !== task.id);

    // Add to target column
    newTaskColumns[targetColumn as keyof typeof taskColumns] = [
      ...newTaskColumns[targetColumn as keyof typeof taskColumns],
      task,
    ];

    // Update state
    setTaskColumns(newTaskColumns);
    setDraggedTask(null);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmitTask = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new task with unique ID
    const newTaskWithId = {
      ...newTask,
      id: `task-${Date.now()}`,
    };

    // Add to todo column
    const updatedColumns = {
      ...taskColumns,
      todo: [...taskColumns.todo, newTaskWithId],
    };

    // Update state
    setTaskColumns(updatedColumns);

    // Reset form and close dialog
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: new Date().toISOString().split("T")[0],
      category: "Work",
    });
    setIsFormOpen(false);
  };

  return (
    <div className="bg-background w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Task Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitTask} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Task title"
                required
              />
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Task description"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full items-center gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid w-full items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newTask.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Task</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div
          className="bg-muted rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("todo")}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">To Do</h2>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {taskColumns.todo.length}
            </span>
          </div>
          <div className="space-y-4">
            {taskColumns.todo.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, "todo")}
              >
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  category={task.category}
                  status="todo"
                />
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div
          className="bg-muted rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("inProgress")}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">In Progress</h2>
            <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-xs font-medium">
              {taskColumns.inProgress.length}
            </span>
          </div>
          <div className="space-y-4">
            {taskColumns.inProgress.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, "inProgress")}
              >
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  category={task.category}
                  status="in-progress"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Completed Column */}
        <div
          className="bg-muted rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("completed")}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Completed</h2>
            <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
              {taskColumns.completed.length}
            </span>
          </div>
          <div className="space-y-4">
            {taskColumns.completed.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, "completed")}
              >
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  category={task.category}
                  status="completed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
