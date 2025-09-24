import { SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import CategoryCard from "./CategoryCard";

export const Category = ({ category, handleEditCategory, handleDeleteCategory }) => {

    return (
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={10} p={6} >
            {category.map((c) => (
                <CategoryCard
                    key={c._id}
                    category={c}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            ))}

        </SimpleGrid>
    )
}