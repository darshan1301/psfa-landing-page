// components/DeleteDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
  triggerLabel?: string;
  confirmLabel?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
}

export default function DeleteDialog({
  triggerLabel = "Delete",
  confirmLabel = "Confirm Delete",
  description = "This action cannot be undone. It will permanently delete this item.",
  onConfirm,
}: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 rounded-lg bg-red-100 text-sm font-medium text-red-600 hover:bg-red-200 transition">
          {triggerLabel}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
