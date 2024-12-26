import React from "react";
import { Box, Grid, GridItem, Image, Heading, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const projectsData = [
  {
    title: "I Found Home",
    imgSrc: "/path/to/image1.jpg",
    path: "/ifoundahome",
  },
  {
    title: "I've been there",
    imgSrc: "/path/to/image2.jpg",
    path: "/ivebeenthere",
  },
  {
    title: "Project The Return Of The Prodigal Son",
    imgSrc: "/path/to/image3.jpg",
    path: "/thereturnof~",
  },
  {
    title: "Stranger Tourist",
    imgSrc: "/path/to/image4.jpg",
    path: "/strangertourist",
  },
  {
    title: "Overexposed ",
    imgSrc: "/path/to/image5.jpg",
    path: "/overexposed",
  },
  {
    title: "Pain Of Others",
    imgSrc: "/path/to/image6.jpg",
    path: "/painofothers",
  },
  {
    title: "Can I Breathe Again?",
    imgSrc: "/path/to/image7.jpg",
    path: "/canibreath~",
  },
];

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box p={5}>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {projectsData.map((project, index) => (
          <GridItem
            key={index}
            as={Link}
            onClick={() => handleNavigate(project.path)}
            _hover={{ transform: "scale(1.05)", transition: "transform 0.3s" }}
          >
            <Box overflow="hidden" borderRadius="md" boxShadow="md">
              <Image
                src={project.imgSrc}
                alt={project.title}
                objectFit="cover"
                w="100%"
                h="200px"
                _hover={{ opacity: 0.8 }}
              />
              <Heading as="h3" size="md" textAlign="center" mt={2}>
                {t(project.title)}
              </Heading>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
