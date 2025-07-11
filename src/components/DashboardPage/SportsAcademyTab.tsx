import React, { useEffect, useState } from "react";
import { Edit, GraduationCap, Loader2, Trash2 } from "lucide-react";
import { AddAcademyForm } from "../AddAcademyForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import Image from "next/image";
import Link from "next/link";

// Interface for academy data
export interface Academy {
  id: string;
  createdAt?: string; // ISO string from backend
  name: string;
  location: string;
  description: string;
  images: string[]; // Array of image URLs
  isActive?: boolean; // Active status
}

export default function SportsAcademyTab() {
  const [academies, setAcademies] = React.useState<Academy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial academy data from backend API
    const fetchAcademies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/panel-api/sports-academy");
        if (!response.ok) {
          throw new Error("Failed to fetch academies");
        }
        const data = await response.json();
        setAcademies(data.academies || []);
      } catch (error) {
        console.error("Error fetching academies:", error);
        // Handle error (e.g., show notification)
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademies();
  }, []);

  const addAcademyHandler = async (academy: Academy) => {
    console.log("Academy added:", academy);

    setAcademies((prev) => [...prev, academy]);
  };

  const deleteAcademyHandler = async (id: string) => {
    try {
      const response = await fetch(`/api/panel-api/sports-academy`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete academy");
      }

      setAcademies((prev) => prev.filter((academy) => academy.id !== id));
    } catch (error) {
      console.error("Error deleting academy:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sports Academy</h2>
          <p className="text-gray-600 mt-1">
            Manage your academy programs and enrollments
          </p>
        </div>
        <AddAcademyForm onAdd={addAcademyHandler} />
      </div>

      {/* Empty State */}
      {academies.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <GraduationCap className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Academy Programs
            </h3>
            <p className="text-gray-600">
              Your sports academy programs and student enrollments will show up
              here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academies.map((academy) => (
            <AcademyCard
              key={academy.id}
              academy={academy}
              // onEdit={editAcademyHandler}
              onDelete={deleteAcademyHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// components/AcademyCard.tsx

interface AcademyCardProps {
  academy: Academy;
  // onEdit: (academy: Academy) => void;
  onDelete: (id: string) => void;
  // onDeleteImage: (academyId: number, imageUrl: string) => void;
}

export function AcademyCard({ academy, onDelete }: AcademyCardProps) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(academy.id);
    setOpenDelete(false);
  };

  return (
    <Card className="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{academy.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full overflow-hidden rounded-lg">
          <Image
            height={480}
            width={640}
            src={academy.images[0]}
            alt={academy.name}
            className="object-cover h-full w-full"
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Location: {academy.location}
        </p>
        <p className="text-sm  mt-1">
          Status:{" "}
          <span
            className={
              academy.isActive
                ? "text-green-600 uppercase font-bold"
                : "text-red-600 uppercase font-bold"
            }>
            {academy.isActive ? "Active" : "Inactive"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link
          href={`/panel/sports-academy/${academy.id}`}
          className="flex mx-4 border rounded-xl px-2 py-1 items-center space-x-1">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </Link>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center space-x-1">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>{academy.name}</strong>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

// export function AcademyCard({
//   academy,
//   onEdit,
//   onDelete,
//   onDeleteImage,
// }: AcademyCardProps) {
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editName, setEditName] = useState(academy.name);
//   const [editLocation, setEditLocation] = useState(academy.location);
//   const [editImage, setEditImage] = useState(academy.images[0] || "");

//   const handleConfirmEdit = () => {
//     onEdit({
//       ...academy,
//       name: editName,
//       location: editLocation,
//       images: [editImage, ...academy.images.slice(1)],
//     });
//     setOpenEdit(false);
//   };

//   return (
//     <>
//       <Card className="max-w-sm w-full mx-auto">
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold">
//             {academy.name}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-48 w-full overflow-hidden rounded-lg">
//             <Image
//               height={480}
//               width={640}
//               src={academy.images[0]}
//               alt={academy.name}
//               className="object-cover h-full w-full"
//             />
//           </div>
//           <p className="mt-4 text-sm text-gray-600">
//             Location: {academy.location}
//           </p>
//         </CardContent>
//         <CardFooter className="flex justify-end space-x-2">
//           <Dialog open={openEdit} onOpenChange={setOpenEdit}>
//             <DialogTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center space-x-1">
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogDescription>Update the details below</DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Name</label>
//                   <Input
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Location
//                   </label>
//                   <Input
//                     value={editLocation}
//                     onChange={(e) => setEditLocation(e.target.value)}
//                   />
//                 </div>

//                 {/* Manage existing images */}
//                 <div>
//                   <label className="block text-sm font-medium mb-1">
//                     Images
//                   </label>
//                   <div className="grid grid-cols-3 gap-2">
//                     {academy.images.map((url, idx) => (
//                       <div
//                         key={idx}
//                         className="relative border rounded overflow-hidden">
//                         <Image
//                           src={url}
//                           alt={`${academy.name}-${idx}`}
//                           width={120}
//                           height={80}
//                           className="object-cover w-full h-full"
//                         />
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           className="absolute top-1 right-1 p-1"
//                           onClick={() => onDeleteImage(academy.id, url)}>
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </DialogClose>
//                 <Button onClick={handleConfirmEdit}>Save</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 className="flex items-center space-x-1">
//                 <Trash2 className="w-4 h-4" />
//                 <span>Delete</span>
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogDescription>
//                   Are you sure you want to delete{" "}
//                   <strong>{academy.name}</strong>? This action cannot be undone.
//                 </DialogDescription>
//               </DialogHeader>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </DialogClose>
//                 <Button
//                   variant="destructive"
//                   onClick={() => onDelete(academy.id)}>
//                   Delete
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </CardFooter>
//       </Card>
//     </>
//   );
// }
