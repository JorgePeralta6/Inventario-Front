import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const CategorySeacrh = ({ onSearch }) => (
  <InputGroup flex="1">
    <Input
      placeholder="Buscar categorias..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <InputRightElement>
      <LuSearch size={20} />
    </InputRightElement>
  </InputGroup>
);
