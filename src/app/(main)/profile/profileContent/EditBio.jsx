"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";

const EditBio = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    bioText: "",
    liveIn: "",
    relationship: "",
    workPlace: "",
    education: "",
    phone: "",
    hometown: "",
  });

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated bio:", formData);
    // закрываем модалку
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          w-[92vw] sm:max-w-[520px]
          max-h-[85vh] overflow-y-auto
          bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
          border border-gray-200 dark:border-neutral-700 shadow-xl rounded-xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Edit Profile Bio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-2">
            {/* Bio */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-3">
              <Label htmlFor="bioText" className="sm:text-right pt-2">
                Bio
              </Label>
              <Textarea
                id="bioText"
                name="bioText"
                value={formData.bioText}
                onChange={handleChange}
                className="sm:col-span-3 min-h-[90px]"
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Live In */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="liveIn" className="sm:text-right">
                Live In
              </Label>
              <Input
                id="liveIn"
                name="liveIn"
                value={formData.liveIn}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="Murmansk"
              />
            </div>

            {/* Relationship */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="relationship" className="sm:text-right">
                Relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="Single"
              />
            </div>

            {/* Work Place */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="workPlace" className="sm:text-right">
                Work Place
              </Label>
              <Input
                id="workPlace"
                name="workPlace"
                value={formData.workPlace}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="1kodexxx"
              />
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="education" className="sm:text-right">
                Education
              </Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="MGU"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="phone" className="sm:text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="+7 911 319 2341"
              />
            </div>

            {/* Hometown */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3">
              <Label htmlFor="hometown" className="sm:text-right">
                Hometown
              </Label>
              <Input
                id="hometown"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                className="sm:col-span-3"
                placeholder="Murmansk"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="flex items-center gap-2 transition-all duration-200 hover:scale-[1.02]"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBio;
