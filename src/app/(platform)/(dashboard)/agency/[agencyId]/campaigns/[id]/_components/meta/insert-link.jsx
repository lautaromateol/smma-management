"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormInputs } from "@/hooks/use-form-inputs";
import { FaFacebook } from "react-icons/fa6";

export function InsertLink({ form, message }) {

  const [linkValue, setLinkValue] = useState("")
  const [showLinkForm, setShowLinkForm] = useState(false)
  const [showPopover, setShowPopover] = useState(false)

  const { inputs: { attached_media } } = useFormInputs((state) => state)

  function handleCancelLink() {
    setShowLinkForm(false)
    setLinkValue(form.getValues().link)
  }

  function handleSubmitLink() {
    setShowLinkForm(false)
    form.setValue("link", linkValue)
  }

  return (
    <>
      <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverContent>
          <p className="font-semibold text-sm mb-2">Link preview</p>
          <p className="text-sm mb-1">
            {
              attached_media?.length ?
                "To preview a link, remove the media that you selected." :
                "Add a link to preview and use the image from this link in your post."
            }
          </p>
          <div className="flex items-center gap-x-2">
            <FaFacebook className="size-4" />
            <p className="text-sm">Facebook only</p>
          </div>
        </PopoverContent>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            type="button"
            disabled={attached_media?.length}
            onMouseEnter={() => setShowPopover(true)}
            onMouseLeave={() => setShowPopover(false)}
            onClick={() => setShowLinkForm((curr) => !curr)}
            className="grid place-content-center p-4 rounded-full hover:bg-main-light"
          >
            <LinkIcon className="size-4" />
          </Button>
        </PopoverTrigger>
      </Popover>
      {showLinkForm && (
        <div className="w-full space-y-2">
          <FormLabel className={cn(message && "text-destructive")}>Link preview</FormLabel>
          <Input value={linkValue} onChange={(e) => setLinkValue(e.target.value)} placeholder="Enter a link" />
          <FormMessage>
            {message ? message : ""}
          </FormMessage>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={handleCancelLink}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitLink}
              type="button"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
