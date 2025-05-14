"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface WidgetWrapperProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  headerAction?: React.ReactNode;
}

export function WidgetWrapper({
  title,
  className,
  children,
  isLoading = false,
  headerAction,
}: WidgetWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className={cn("transition-all duration-300 ease-in-out", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          {headerAction}
        </div>
      </CardHeader>
      {isLoading ? (
        <CardContent className="p-4">
          <LoadingSkeleton />
        </CardContent>
      ) : (
        <CardContent className={cn("p-4 transition-all duration-300", 
          !isExpanded && "h-0 p-0 overflow-hidden"
        )}>
          {children}
        </CardContent>
      )}
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}