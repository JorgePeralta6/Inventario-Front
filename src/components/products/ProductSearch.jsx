import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const ProductSearch = ({ onSearch }) => (
  <InputGroup flex="1">
    <Input
      placeholder="Buscar productos..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <InputRightElement>
      <LuSearch size={20} />
    </InputRightElement>
  </InputGroup>
);
