import React, { useState, useEffect } from "react";
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";

interface AutoSlideShowProps {
  images: string[];
}

const AutoSlideShow: React.FC<AutoSlideShowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Adjusted to 2 seconds for slideshow interval

    return () => clearInterval(interval);
  }, [images.length]);

  // Determine aspect ratio based on screen size, with a default value
  const aspectRatio =
    useBreakpointValue({
      base: 4 / 3, // 4:2 aspect ratio for mobile
      md: 3 / 1, // 3:2 aspect ratio for desktop
    }) || 2 / 1; // Default aspect ratio if useBreakpointValue returns undefined

  return (
    <Box width="100%" overflow="hidden">
      {/* Use aspectRatio to maintain specific ratio */}
      <Box
        width="100%"
        height="auto"
        sx={{
          position: "relative",
          paddingBottom: `${100 / aspectRatio}%`, // Maintain the aspect ratio
        }}
      >
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover" // Ensure the image covers the entire area
        />
      </Box>
    </Box>
  );
};

export default AutoSlideShow;
