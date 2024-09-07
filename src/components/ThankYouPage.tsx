import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const ThankYouPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box p={5} textAlign="center">
      <Heading as="h1" mb={4}>
        {t("thankYou")}
      </Heading>
    </Box>
  );
};

export default ThankYouPage;
