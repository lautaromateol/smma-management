import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useEffect } from "react"

export function PromotedObject({ form, location, data }) {

  const { fbPageId, igPictureUrl, fbPictureUrl, igPageName, fbPageName } = data

  useEffect(() => {
    switch (location) {
      case "Messaging apps":
        form.setValue("promoted_object", { page_id: fbPageId })
        break;

      case "Instagram profile":
        form.setValue("promoted_object", { page_id: fbPageId })
        form.setValue("destination_type", "INSTAGRAM_PROFILE")
        break;

      default:
        break;
    }
  }, [form, location, fbPageId])

  return (
    <>
      {location === "Messaging apps" &&
        <FormField
          control={form.control}
          name="destination_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Messaging apps</FormLabel>
              <FormDescription>Send people to Messenger, Instagram and WhatsApp.</FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform">
                      {field.value === "MESSENGER" ? "Facebook" : field.value === "INSTAGRAM_DIRECT" ? "Instagram" : "Select a platform"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MESSENGER">
                    <div className="flex items-center gap-x-2">
                      <div className="relative size-12">
                        <Image
                          fill
                          alt={`${fbPageName} picture`}
                          src={fbPictureUrl}
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0 5">
                        <p className="font-semibold text-base">Messenger</p>
                        <p className="text-sm">{fbPageName}</p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="INSTAGRAM_DIRECT">
                    <div className="flex items-center gap-x-2">
                      <div className="relative size-12">
                        <Image
                          fill
                          alt={`${igPageName} picture`}
                          src={igPictureUrl}
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0 5">
                        <p className="font-semibold text-base">Instagram</p>
                        <p className="text-sm">@{igPageName}</p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />}
    </>
  )
}
