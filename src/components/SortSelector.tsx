import React from "react";
import {
  MenuItem,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface SortSelectorProps {
  themes: string[];
  colors: string[];
  threePOptions: { value: string; label: string }[];
  onThemeSelect: (theme: string) => void;
  onColorSelect: (color: string) => void;
  onThreePSelect: (option: string) => void;
  onResetFilters: () => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({
  themes,
  colors,
  threePOptions,
  onThemeSelect,
  onColorSelect,
  onThreePSelect,
  onResetFilters,
}) => {
  const [selectedTheme, setSelectedTheme] = React.useState<string>("");
  const [selectedColor, setSelectedColor] = React.useState<string>("");
  const [selectedThreeP, setSelectedThreeP] = React.useState<string>("");

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  const handleThreePSelect = (option: string) => {
    setSelectedThreeP(option);
    onThreePSelect(option);
  };

  const handleResetFilters = () => {
    // Reset the local state values to their default states
    setSelectedTheme("");
    setSelectedColor("");
    setSelectedThreeP("");

    // Call the parent reset function
    onResetFilters();
  };

  return (
    <Wrap spacing={2} mb={4} direction={{ base: "column", sm: "row" }}>
      <WrapItem>
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
      </WrapItem>
      <WrapItem>
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {selectedColor
              ? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
              : "Color"}
          </MenuButton>
          <MenuList>
            {colors.map((color) => (
              <MenuItem key={color} onClick={() => handleColorSelect(color)}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </WrapItem>
      <WrapItem>
        <Menu>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {selectedThreeP
              ? threePOptions.find((option) => option.value === selectedThreeP)
                  ?.label || "No of pieces"
              : "No of pieces"}
          </MenuButton>
          <MenuList>
            {threePOptions.map(({ value, label }) => (
              <MenuItem key={value} onClick={() => handleThreePSelect(value)}>
                {label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </WrapItem>
      <WrapItem>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </WrapItem>
    </Wrap>
  );
};

export default SortSelector;
