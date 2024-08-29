"use client"
import { useOpenModal } from "@/hooks/use-open-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function Modal({ title, description, children }) {

  const { isOpen, onClose } = useOpenModal((state) => state)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-main-tint">
            {title}
          </DialogTitle>
          <DialogDescription className="text-main font-light">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
