import React, { useState } from "react";
import { MenuItem, Menu, MenuButton, Button, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface SortSelectorProps {
  themes: string[];
  onThemeSelect: (theme: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  themes,
  onThemeSelect,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedTheme
          ? selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
          : "Theme"}
      </MenuButton>
      <MenuList>
        {themes.map((theme) => (
          <MenuItem key={theme} onClick={() => handleThemeSelect(theme)}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
