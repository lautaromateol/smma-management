"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function InsertLink({ form, message }) {

  const [linkValue, setLinkValue] = useState("")
  const [showLinkForm, setShowLinkForm] = useState(false)

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
      <Button
        variant="ghost"
        type="button"
        onClick={() => setShowLinkForm((curr) => !curr)}
        className="grid place-content-center p-4 rounded-full hover:bg-main-light"
      >
        <LinkIcon className="size-4" />
      </Button>
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
