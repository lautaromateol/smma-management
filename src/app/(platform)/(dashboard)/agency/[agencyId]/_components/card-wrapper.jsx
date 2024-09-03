import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CardWrapper({ title, description, footer, children, className }) {
  return (
    <Card className={cn(
      "border-b-4 border-r-4 border-main",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-main-tint">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {footer}
      </CardFooter>
    </Card>
  )
}

