"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";

const RightSideBar = () => {
  const [showAllSponsors, setShowAllSponsors] = useState(false);

  const sponsors = [
    {
      name: "Netflix",
      description: "Watch the latest trending movies and series.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qmBuBERRMhoFTvvNUWw7Kr9iicoxC4c8ZQ&s",
      website: "https://www.netflix.com",
    },
    {
      name: "Instagram",
      description: "Explore the latest features and connect with friends.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NoNt4ECTrCIzRA6PhvyyPThBY9OUEW0-ng&s",
      website: "https://www.instagram.com",
    },
    {
      name: "Spotify",
      description: "Stream your favorite music anytime, anywhere.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShpvQJUXehm_yT1kr2WSATHaDRF88_JjWHcQ&s",
      website: "https://www.spotify.com",
    },
    {
      name: "Amazon",
      description: "Shop for everything you need with fast delivery.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaBLSbp3rFpIZ0kzoreJLN7uZqkJz0h6-RQQ&s",
      website: "https://www.amazon.com",
    },
    {
      name: "Apple",
      description: "Discover innovative products and services.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0qsC4qgsmGTJ9HnNYatRyi7GyJ7GlRMujlw&s",
      website: "https://www.apple.com",
    },
  ];

  const displaySponsors = showAllSponsors ? sponsors : sponsors.slice(0, 3);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Popular Sponsors
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="space-y-4">
            {displaySponsors.map((sponsor, index) => (
              <motion.li
                key={sponsor.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="w-full h-40 object-contain rounded-md mb-2"
                />
                <div className="flex-1">
                  <h3 className="text-md font-semibold">{sponsor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sponsor.description}
                  </p>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    className="text-primary text-sm flex item-center mt-1 hover:underline"
                  >
                    Visit Website <ExternalLink className="ml-1 h-4" />
                  </a>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Toggle button */}
          {sponsors.length > 3 && (
            <button
              onClick={() => setShowAllSponsors(!showAllSponsors)}
              className="mt-4 w-full text-center text-sm text-blue-600 hover:underline"
            >
              {showAllSponsors ? "Show Less" : "Show More"}
            </button>
          )}
        </CardContent>
      </Card>
    </motion.aside>
  );
};

export default RightSideBar;
