"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  ListTodoIcon,
} from "lucide-react";

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  completionRate: number;
}

interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  category: string;
}

interface DashboardProps {
  taskStats?: TaskStats;
  upcomingTasks?: UpcomingTask[];
}

export default function Dashboard({
  taskStats = {
    total: 12,
    completed: 5,
    inProgress: 3,
    todo: 4,
    completionRate: 42,
  },
  upcomingTasks = [
    {
      id: "1",
      title: "Complete project proposal",
      dueDate: "2023-06-15",
      priority: "high",
      category: "Work",
    },
    {
      id: "2",
      title: "Review design mockups",
      dueDate: "2023-06-16",
      priority: "medium",
      category: "Design",
    },
    {
      id: "3",
      title: "Prepare presentation",
      dueDate: "2023-06-18",
      priority: "high",
      category: "Work",
    },
    {
      id: "4",
      title: "Weekly team meeting",
      dueDate: "2023-06-20",
      priority: "low",
      category: "Meetings",
    },
  ],
}: DashboardProps) {
  return (
    <div className="w-full h-full p-6 bg-background">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Task Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ListTodoIcon className="h-5 w-5 text-muted-foreground mr-2" />
                  <span className="text-2xl font-bold">{taskStats.total}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle2Icon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {taskStats.completed}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {taskStats.inProgress}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  To Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ListTodoIcon className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-2xl font-bold">{taskStats.todo}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rate */}
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Progress
                  </span>
                  <span className="text-sm font-medium">
                    {taskStats.completionRate}%
                  </span>
                </div>
                <Progress value={taskStats.completionRate} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Task Distribution Chart (simplified) */}
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end justify-between gap-2">
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-12 bg-green-500 rounded-t"
                    style={{
                      height: `${(taskStats.completed / taskStats.total) * 100}%`,
                    }}
                  ></div>
                  <span className="mt-2 text-xs">Completed</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-12 bg-blue-500 rounded-t"
                    style={{
                      height: `${(taskStats.inProgress / taskStats.total) * 100}%`,
                    }}
                  ></div>
                  <span className="mt-2 text-xs">In Progress</span>
                </div>
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-12 bg-orange-500 rounded-t"
                    style={{
                      height: `${(taskStats.todo / taskStats.total) * 100}%`,
                    }}
                  ></div>
                  <span className="mt-2 text-xs">To Do</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        <span>
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{task.category}</span>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
