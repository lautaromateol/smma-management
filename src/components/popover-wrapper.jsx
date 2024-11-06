import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function PopoverWrapper({ open, onOpenChange, className, align, children, trigger }) {

  if (open) return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverContent className={className} align={align}>
        {children}
      </PopoverContent>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
    </Popover>
  )

  return (
    <Popover>
      <PopoverContent className={className} align={align}>
        {children}
      </PopoverContent>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
    </Popover>
  )
}
