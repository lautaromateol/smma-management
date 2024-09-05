"use client"
import { deleteContract } from "@/actions/delete-contract";
import { useAction } from "@/hooks/use-action";
import { ArrowUpRightFromSquare, File, Trash } from "lucide-react";
import { toast } from "sonner";

export function Contract({ contract }) {

  const { execute, isPending } = useAction(deleteContract, {
    onSuccess: (data) => {
      toast.success(`Contract "${data.name} deleted"`)
    },
    onError: (error) => toast.error(error)
  })

  function handleDelete() {
    if (isPending) return

    execute({ fullPath: contract.fullPath, id: contract.id })
  }

  return (
    <div className="flex items-center gap-x-2 p-2 border rounded-md">
      <File className="size-4" />
      <p className="text-sm font-medium">{contract.name}</p>
      <div className="flex items-center gap-x-2 ml-auto">
        <a target="_blank" href={contract.contractUrl} className="rounded-md p-2 border">
          <ArrowUpRightFromSquare className="size-4" />
        </a>
        <div role="button" onClick={handleDelete} className="rounded-md p-2 border">
          <Trash className="size-4" />
        </div>
      </div>
    </div>
  )
}
