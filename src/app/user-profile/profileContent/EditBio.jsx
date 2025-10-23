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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated bio:", formData);
    onClose(false); // закрываем модалку
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-gray-200 dark:border-neutral-700 shadow-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Edit Profile Bio
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bioText" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bioText"
                name="bioText"
                value={formData.bioText}
                onChange={handleChange}
                className="col-span-3 min-h-[90px]"
                placeholder="Write something about yourself..."
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liveIn" className="text-right">
                Live In
              </Label>
              <Input
                id="liveIn"
                name="liveIn"
                value={formData.liveIn}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Murmansk"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Single"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workPlace" className="text-right">
                Work Place
              </Label>
              <Input
                id="workPlace"
                name="workPlace"
                value={formData.workPlace}
                onChange={handleChange}
                className="col-span-3"
                placeholder="1kodexxx"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="education" className="text-right">
                Education
              </Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="col-span-3"
                placeholder="MGU"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
                placeholder="+7 911 319 2341"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hometown" className="text-right">
                Hometown
              </Label>
              <Input
                id="hometown"
                name="hometown"
                value={formData.hometown}
                onChange={handleChange}
                className="col-span-3"
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
