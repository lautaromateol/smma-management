"use client"
import { useOpenModal } from "@/hooks/use-open-modal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

export function Modal({ title, description, className, children, modalId }) {

  const { onClose, id } = useOpenModal((state) => state)

  if (id === modalId) {
    return (
      <Dialog
        open={id}
        onOpenChange={onClose}
      >
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle className="text-main-tint">
              {title}
            </DialogTitle>
            {description && <DialogDescription className="text-main font-light">
              {description}
            </DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
}
