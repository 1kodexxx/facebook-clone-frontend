"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, PenLine, Save, Upload, X } from "lucide-react";
import { useState } from "react";

const ProfileHeader = () => {
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const [isEditCoverModel, setIsEditCoverModel] = useState(false);
  const [isCoverPhotoPreview, setIsCoverPhotoPreview] = useState(false);

  return (
    <div className="relative">
      {/* ==== COVER IMAGE ==== */}
      <div className="relative h-64 md:h-80 bg-gray-300 overflow-hidden">
        <img src="" alt="cover" className="w-full h-full object-cover" />
        <Button
          className="absolute bottom-4 right-4 flex items-center"
          variant="secondary"
          size="sm"
          onClick={() => setIsEditCoverModel(true)}
        >
          <Camera className="mr-2 h-4 w-4" />
          <span className="hidden md:block">Edit Cover Photo</span>
        </Button>
      </div>
      {/* ==== PROFILE INFO ==== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end md:space-x-5">
          <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-600">
            <AvatarImage />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
              D
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 md:mt-0 text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sasha Pushkin
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">
              3.5k friends
            </p>
          </div>

          <Button
            className="mt-4 md:mt-0 flex items-center gap-2"
            onClick={() => setIsEditProfileModal(true)}
          >
            <PenLine className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
      {/* ==== EDIT PROFILE MODAL ==== */}
      <AnimatePresence>
        {isEditProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              {/* === HEADER === */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Profile
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditProfileModal(false)}
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Button>
              </div>

              {/* === FORM === */}
              <form className="space-y-5">
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-600 mb-4">
                    <AvatarImage />
                    <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white">
                      D
                    </AvatarFallback>
                  </Avatar>

                  <input type="file" accept="image/*" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Change Profile Picture
                  </Button>
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==== EDIT COVER MODAL ==== */}
      <AnimatePresence>
        {isEditCoverModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              {/* === HEADER === */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Cover Photo
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setisEditCoverModel(false)}
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                </Button>
              </div>

              {/* === FORM === */}
              <form className="space-y-5">
                <div className="flex flex-col items-center mb-4">
                  {isCoverPhotoPreview && (
                    <img
                      src=""
                      alt="cover-photo"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <input type="file" accept="image/*" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Select New Cover Photo
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <Save className="h-4 w-4" />
                  Save Cover Photo
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileHeader;
