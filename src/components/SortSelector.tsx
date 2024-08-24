import React from "react";
import {
  MenuItem,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Wrap,
  WrapItem,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface SortSelectorProps {
  themes: string[];
  colors: string[];
  threePOptions: { value: string; label: string }[];
  onThemeSelect: (theme: string) => void;
  onColorSelect: (colors: string[]) => void; // Accept multiple colors
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
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedThreeP, setSelectedThreeP] = React.useState<string>("");

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    onThemeSelect(theme);
  };

  const handleColorSelect = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    onColorSelect(updatedColors);
  };

  const handleThreePSelect = (option: string) => {
    setSelectedThreeP(option);
    onThreePSelect(option);
  };

  const handleResetFilters = () => {
    setSelectedTheme("");
    setSelectedColors([]);
    setSelectedThreeP("");
    onResetFilters();
  };

  const getSelectedColorsLabel = () => {
    if (selectedColors.length === 0) return "Color";
    if (selectedColors.length === 1)
      return (
        selectedColors[0].charAt(0).toUpperCase() + selectedColors[0].slice(1)
      );
    return `${selectedColors.length} Colors Selected`;
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
        <Menu closeOnSelect={false}>
          <MenuButton as={Button} rightIcon={<BsChevronDown />}>
            {getSelectedColorsLabel()}
          </MenuButton>
          <MenuList>
            <VStack align="start" spacing={1} p={2}>
              {colors.map((color) => (
                <Checkbox
                  key={color}
                  isChecked={selectedColors.includes(color)}
                  onChange={() => handleColorSelect(color)}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Checkbox>
              ))}
            </VStack>
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
