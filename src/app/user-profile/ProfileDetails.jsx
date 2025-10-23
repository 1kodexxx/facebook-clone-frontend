"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  Cake,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Rss,
} from "lucide-react";
import { useState } from "react";
import EditBio from "./profileContent/EditBio";
import MutualFriends from "./profileContent/MutualFriends";
import PostsContent from "./profileContent/PostsContent";

const ProfileDetails = ({ activeTab }) => {
  const [isSetEditBioModel, setIsSetEditBioModel] = useState(false);

  const userPosts = [
    {
      _id: 1,
      content: "Hello world 🌍 — testing post with comment",
      mediaUrl:
        "https://images.unsplash.com/photo-1760895986008-0a016173836c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=774",
      mediaType: "image",
      comments: [
        {
          user: { username: "Sasha" },
          text: "Nice picture!",
          createdAt: "20-04-2024",
        },
      ],
    },
  ];

  const tabContent = {
    posts: (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ==== POSTS COLUMN ==== */}
        <div className="w-full lg:w-[70%] space-y-6">
          {userPosts.map((post) => (
            <PostsContent key={post._id} post={post} />
          ))}
        </div>

        {/* ==== SIDEBAR (INTRO) ==== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[30%]"
        >
          <Card className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-gray-200 dark:border-neutral-700 shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                Intro
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This is a{" "}
                <span className="font-medium text-primary">1kodexxx</span> soft
                developer
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Home className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Live in Murmansk</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Heart className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Single</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>From Up Murmansk</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Work at 1kodexxx</span>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <GraduationCap className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Studied at MGU</span>
                </div>
              </div>

              <div className="flex items-center mb-4 text-gray-700 dark:text-gray-300">
                <Rss className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>Followed by 40 people</span>
              </div>

              <Button
                className="w-full transition-all duration-200 hover:scale-[1.02]"
                onClick={() => setIsSetEditBioModel(true)}
              >
                Edit Bio
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    ),

    about: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 dark:bg-neutral-900/60 dark:border-neutral-700"
      >
        <Card className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-gray-200 dark:border-neutral-700 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
              About
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is a{" "}
              <span className="font-medium text-primary">1kodexxx</span> soft
              developer
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Home className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>Live in Murmansk</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Heart className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>Single</span>
              </div>

              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>+79113192341</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>pvntheraxxx@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Cake className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>Birthday: 04/03/1997</span>
              </div>
            </div>

            <div className="flex items-center mb-4 text-gray-700 dark:text-gray-300">
              <Rss className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span>Followed by 40 people</span>
            </div>

            <Button
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              onClick={() => setIsSetEditBioModel(true)}
            >
              Edit Bio
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    ),
    friends: <MutualFriends />,
    photos: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <Card className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-gray-200 dark:border-neutral-700 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
              Photos
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {userPosts
                ?.filter(
                  (post) => post?.mediaType === "image" && post?.mediaUrl
                )
                .map((post) => (
                  <img
                    src={post.mediaUrl}
                    key={post._id}
                    alt="user_all_photos"
                    className="w-full h-auto rounded-lg object-cover hover:scale-[1.02] transition-transform duration-200"
                  />
                ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ),
  };

  return (
    <div>
      {tabContent[activeTab] || null}
      <EditBio
        isOpen={isSetEditBioModel}
        onClose={() => setIsSetEditBioModel(false)}
      ></EditBio>
    </div>
  );
};

export default ProfileDetails;
