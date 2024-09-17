import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export function PlatformSelector({ form, fbPageName, igPageName }) {

  return (
    <div className="bg-white p-4">
       <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FACEBOOK">
                    <div className="flex items-center gap-x-2">
                      <FaFacebook className="size-4" />
                      {fbPageName}
                    </div>
                  </SelectItem>
                  <SelectItem value="INSTAGRAM">
                    <div className="flex items-center gap-x-2">
                      <FaInstagram className="size-4" />
                      {igPageName}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  )
}
