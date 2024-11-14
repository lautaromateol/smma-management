import { Checkbox } from "@/components/ui/checkbox";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { conversionLocation } from "@/constants/conversion-location";

export function ConversionLocation({ location, setLocation }) {

  function onCheckboxChange(value, title) {
   if(value) {
    setLocation(title)
   }
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <FormLabel htmlFor="conversion">Conversion location</FormLabel>
        <FormDescription>Choose where you want to drive traffic. You&apos;ll enter more details about the destination later.</FormDescription>
      </div>
      {conversionLocation.map((item, i) => (
        <div key={i} className="flex items-center gap-x-2">
          <Checkbox checked={location === item.title} onCheckedChange={(value) => onCheckboxChange(value, item.title)} id="conversion" />
          <div className="space-y-0.5">
            <p className="text-sm">{item.title}</p>
            <p className="text-xs">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
