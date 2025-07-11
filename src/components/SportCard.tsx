import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Sport model interface matching your Prisma schema
export interface Sport {
  id: number;
  name: string;
  createdAt?: string; // ISO string from backend
  image: string;
  status?: boolean;
}

interface SportCardProps {
  sport: Sport;
  onEdit: (sport: Sport) => void;
  onDelete: (id: number) => void;
}

const SportCard: React.FC<SportCardProps> = ({ sport, onEdit, onDelete }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: sport.name,
    image: sport.image,
    status: sport.status ?? true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const badgeStyle = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedSport: Sport = {
        ...sport,
        name: editForm.name,
        image: editForm.image,
        status: editForm.status ?? true, // Ensure status is always set
      };

      await onEdit(updatedSport);
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating sport:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await onDelete(sport.id);
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting sport:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEditForm({
      name: sport.name,
      image: sport.image,
      status: sport.status ?? true,
    });
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow overflow-hidden">
      {/* Sport image on top */}
      <Image
        height={400}
        width={400}
        src={sport.image}
        alt={sport.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{sport.name}</h2>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              sport.status ? badgeStyle.active : badgeStyle.inactive
            }`}>
            {sport.status ? "Active" : "Inactive"}
          </span>
        </div>
        {/* Action buttons */}
        <div className="flex space-x-4">
          {/* Edit Dialog */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => {
                  resetForm();
                  setEditOpen(true);
                }}
                aria-label="Edit sport"
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                <Edit size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Sport</DialogTitle>
                <DialogDescription>
                  Make changes to the sport information. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleEditSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={editForm.image}
                      onChange={(e) =>
                        setEditForm({ ...editForm, image: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="isActive" className="text-right">
                      Active
                    </Label>
                    <Switch
                      id="isActive"
                      checked={editForm.status}
                      onCheckedChange={(checked: boolean) =>
                        setEditForm({ ...editForm, status: checked })
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditOpen(false)}
                    disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}
          <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setDeleteOpen(true)}
                aria-label="Delete sport"
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                <Trash2 size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Sport</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete &quot;{sport.name}&quot;? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteOpen(false)}
                  disabled={isLoading}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SportCard;
