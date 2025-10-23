import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const EditBio = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>Edit Bio</DialogHeader>
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea id="bioText" name="bioText" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liveIn" className="text-right">
                Live In
              </Label>
              <Input id="liveIn" name="liveIn" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="relationship"
                name="relationship"
                className="text-right"
              >
                Relationship
              </Label>
              <Input id="liveIn" name="liveIn" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="workPlace"
                name="workPlace"
                className="text-right"
              >
                Work Place
              </Label>
              <Input id="workPlace" name="workPlace" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="education"
                name="education"
                className="text-right"
              >
                Education
              </Label>
              <Input id="education" name="education" className="col-span-3" />
            </div>{" "}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" name="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" name="phone" className="col-span-3" />
            </div>{" "}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hometown" name="hometown" className="text-right">
                Hometown
              </Label>
              <Input id="hometown" name="hometown" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
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
