"use client"
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FileVideoIcon, Image as ImageIcon } from "lucide-react";

export function MetaAddPostForm() {

  return (
    <div className="bg-main-light grid grid-cols-2 gap-x-10">
      <div className="flex flex-col gap-y-4">
        <div className="bg-white">
          {/* <FormField
            control={form.control}
            name="platforms"
            render={({ field }) => ( */}
              {/* <FormItem> */}
                <label>Post to</label>
                <select>
                  {/* <FormControl> */}
                   
                  {/* </FormControl> */}
                  {/* <SelectContent>
                  </SelectContent> */}
                </select>
                {/* <FormMessage /> */}
              {/* </FormItem> */}
            {/* )}
          /> */}
        </div>
        <div className="bg-white space-y-2">
          <label>Media</label>
          <p>Share photos or a video. Instagram posts can&apos;t exceed 10 photos.</p>
          <div className="flex items-center gap-x-2">
            <Button
              className="flex items-center gap-x-2"
              variant="outline"
            >
              Add Photo
              <ImageIcon className="size-4" />
            </Button>
            <Button className="flex items-center gap-x-2">
              Add Video
              <FileVideoIcon className="size-4" />
            </Button>
          </div>
        </div>
        <div className="bg-white space-y-2">
          <label>Post details</label>
          <label>Text</label>
          {/* <FormControl> */}
          <textarea />
          {/* </FormControl> */}
          {/* <FormMessage /> */}
        </div>
        <div className="bg-white flex items-center justify-between">
          <label>Scheduling options</label>
          <div className="flex items-center gap-x-2">
            Program date and time
            <Switch />
          </div>
        </div>
      </div>
    </div>
  )
}
