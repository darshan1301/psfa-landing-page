"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

// Form data types for newsletter
interface NewsletterFormData {
  subject: string;
  body: string;
}

export const SendNewsletterModal: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    defaultValues: {
      subject: "",
      body: "",
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    console.log("Sending newsletter:", data);
    // TODO: call your send-newsletter API here
    reset();
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-600 hover:text-white hover:bg-green-700 text-white px-6 py-5 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
            <Mail className="w-5 h-5" />
            <span>Send Newsletter</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Newsletter</DialogTitle>
            <DialogDescription>
              Compose your newsletter subject and body below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Subject field */}
            <div className="grid gap-3">
              <Label htmlFor="newsletter-subject">Subject</Label>
              <Input
                id="newsletter-subject"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-600">{errors.subject.message}</p>
              )}
            </div>

            {/* Body field */}
            <div className="grid gap-3">
              <Label htmlFor="newsletter-body">Body</Label>
              <Textarea
                id="newsletter-body"
                rows={6}
                {...register("body", { required: "Body is required" })}
              />
              {errors.body && (
                <p className="text-red-600">{errors.body.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
