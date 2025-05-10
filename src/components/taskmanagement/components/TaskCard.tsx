import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag } from "lucide-react";

interface TaskCardProps {
  id?: string;
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  category?: string;
  status?: "todo" | "in-progress" | "completed";
}

const TaskCard = ({
  id = "task-1",
  title = "Complete project proposal",
  description = "Draft the initial project proposal with timeline and resource requirements",
  priority = "medium",
  dueDate = "2023-12-15",
  category = "Work",
  status = "todo",
}: TaskCardProps) => {
  // Map priority to colors
  const priorityColors = {
    low: "bg-green-100 text-green-800 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    high: "bg-red-100 text-red-800 hover:bg-red-200",
  };

  // Map category to colors
  const categoryColors: Record<string, string> = {
    Work: "bg-blue-100 text-blue-800",
    Personal: "bg-purple-100 text-purple-800",
    Study: "bg-indigo-100 text-indigo-800",
    Health: "bg-green-100 text-green-800",
    Finance: "bg-emerald-100 text-emerald-800",
    Other: "bg-gray-100 text-gray-800",
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className="w-full max-w-[280px] bg-white shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      draggable="true"
      data-task-id={id}
      data-task-status={status}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm truncate flex-1">{title}</h3>
          <Badge className={priorityColors[priority]}>{priority}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex flex-col items-start space-y-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{formatDate(dueDate)}</span>
          </div>
          <Badge
            variant="outline"
            className={`${categoryColors[category] || categoryColors.Other} text-xs`}
          >
            <Tag className="h-3 w-3 mr-1" />
            {category}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
