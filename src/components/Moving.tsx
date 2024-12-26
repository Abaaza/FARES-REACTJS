import React from "react";
import ReactPlayer from "react-player";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";

const videoData = [
  {
    url: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    title: "Sample Video 1",
  },
  {
    url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    title: "Sample Video 2",
  },
  {
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    title: "Sample Video 3",
  },
  {
    url: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
    title: "Sample Video 4",
  },
  {
    url: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
    title: "Sample Video 4",
  },
  {
    url: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
    title: "Sample Video 4",
  },
  {
    url: "https://www.youtube.com/watch?v=HgzGwKwLmgM",
    title: "Sample Video 4",
  },
  // Add more video data here
];

const Moving: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={6} textAlign="center">
        Video Grid
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {videoData.map((video, index) => (
          <GridItem key={index} w="100%" h="auto">
            <ReactPlayer
              url={video.url}
              width="100%"
              height="200px"
              controls={true}
            />
            <Text mt={2} textAlign="center" fontWeight="bold">
              {video.title}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Moving;
