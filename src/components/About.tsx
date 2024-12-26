import React from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Stack,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";

const About: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      px={8} // Changed from paddingRight/Left
      maxW="1400px"
      mx="auto"
      mt={4} // Important: no top margin
    >
      <Grid
        templateColumns={{ base: "1fr", md: "400px 1fr" }}
        gap={8}
        alignItems="start"
        pt={0} // Added to ensure no extra padding
      >
        {/* Image */}
        <GridItem>
          <Image
            src="/api/placeholder/400/500"
            alt="Fares Zaitoon"
            objectFit="cover"
            width="100%"
            height="auto"
          />
        </GridItem>

        {/* Content */}
        <GridItem>
          <Stack spacing={6}>
            <Box>
              <Heading
                as="h1"
                size="xl"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                Fares Zaitoon
              </Heading>
              <Text fontSize="lg" mb={6} color="gray.700" fontWeight="normal">
                Fares Zaitoon (b. 1990, Egypt) is a documentary photographer and
                visual artist born and raised in Cairo. His work explores themes
                often considered taboo, including drug addiction, mental health,
                identity crises, and personal obsessions. Zaitoon often uses his
                own life experiences as source material for his projects. After
                leaving university in 2016, he committed himself fully to his
                art, focusing on stories that resonate with him. He pursued
                further education through a full scholarship at the Danish
                School of Media & Journalism and H-S Hannover University.
              </Text>
              <Text fontSize="lg" mb={8} color="gray.700" fontWeight="normal">
                His works were exhibited at Cairographie Festival in 2017; in
                'Hakawi' as part of a Paris showcase organized by Cité
                Internationale des Arts, and in Zamalek Art Gallery in Egypt in
                2019. Also, his work has been featured in Vice Arabia, CNN
                Arabic, Mada Masr, Daily News, and Cairo Scene, British Journal
                of Photography, Spiegel magazine, and his most recent
                achievements include being nominated for the CAP Prize 2020 for
                Contemporary African Photography, in 2021 earning a scholarship
                to the Danish school of media and journalism, and in 2022
                receiving a scholarship to H-S Hannover University.
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                EDUCATION & SCHOLARSHIPS
              </Heading>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • A scholarship diploma from the Danish School of Media &
                journalism (2020)
              </Text>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • Scholarship diploma at H-S Hannover University (2022)
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                EXHIBITIONS
              </Heading>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Exhibited my series, 'I have been there' at the Cairographie
                festival in (2017)
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Exhibited my series, 'I have found home' as part of the Paris
                showcase 'Hakawi' organized by Cité Internationale des Arts in
                (2018)
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Exhibited my series, 'Switch the lights off' at the Zamalek
                Art Gallery in (2019)
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Exhibited my series 'The cold is unbearable this summer' with
                ART D' EGYPT (2023)
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Exhibited my series "I have found home" Invitation Art
                Festival: motiva - the ambiguity of belonging to the south of
                Germany
              </Text>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • Exhibited my dummy book 'Untitled Folder' at
                Rautenstrauch-Joest-Museum (2023)
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                GRANTS
              </Heading>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • 2022 received a grant from the ECCA-DMJX photojournalism
                Award.
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                WORKSHOPS
              </Heading>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Art direction Image Making with Kegham Djeghalian
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Building a Photography Topic with Nabil Noutros
              </Text>
              <Text mb={2} color="gray.700" fontWeight="normal">
                • Visual Storytelling with Bruno Boudjelal with the French
                institute
              </Text>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • On instructing photography with the University of KASK in
                Ghent
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                SOLO EXHIBITION
              </Heading>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • Stranger Tourist at Darb 1718 is an Egyptian contemporary art
                and culture center located in the Fustat area of Old Cairo.
                Curated by Farida Youssef (2023)
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                PRESS & FEATURED
              </Heading>
              <Text mb={6} color="gray.700" fontWeight="normal">
                • Vice Arabia, CNN Arabic, Mada Masr, Daily News, Cairo Scene,
                British Journal of Photography, Spiegel magazine and Fluter
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="lg"
                mb={4}
                fontWeight="medium"
                color="gray.800"
              >
                Contact
              </Heading>
              <Text mb={2} color="gray.700" fontWeight="normal">
                Number:{" "}
                <Link href="tel:+201020171772" color="gray.700">
                  +201020171772
                </Link>
              </Text>
              <Text color="gray.700" fontWeight="normal" mb={20}>
                Email:{" "}
                <Link href="mailto:fzaitoon.fz@gmail.com" color="gray.700">
                  fzaitoon.fz@gmail.com
                </Link>
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default About;
