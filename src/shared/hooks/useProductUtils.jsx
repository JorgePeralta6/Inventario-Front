import { useState, useEffect } from "react";
import { getCategories } from "../../services";
import toast from "react-hot-toast";

export const useProductUtils = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const catRes = await getCategories();
    if (catRes.error) return toast.error("Error al obtener categorías");
    setCategories(catRes.data.categories || []);

  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories };
};
