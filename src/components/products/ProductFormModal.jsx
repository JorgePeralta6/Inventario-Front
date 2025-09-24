import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Stack,
  SimpleGrid
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useProductUtils } from "../../shared/hooks/useProductUtils";
import { getProducts, saveProducts, updateProducts } from "../../services";
import toast from "react-hot-toast";
import "../../pages/products/ProductPage.css";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

export const ProductFormModal = ({ isOpen, onClose, productToEdit, onProductSaved }) => {
  const { categories } = useProductUtils();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    entryDate: "",
    image: "",
    hasExpiration: false,
    expirationDate: ""
  });

  useEffect(() => {
    if (productToEdit) {
      const categoryFound = categories.find(cat => cat.name === productToEdit.category);

      setForm({
        name: String(productToEdit.name) || "",
        description: String(productToEdit.description) || "",
        price: String(productToEdit.price?.$numberDecimal ?? productToEdit.price) || "",
        stock: String(productToEdit.stock) || "",
        category: categoryFound?._id || "",
        entryDate: productToEdit.entryDate ? formatDate(productToEdit.entryDate) : "",
        image: String(productToEdit.image) || "",
        hasExpiration: productToEdit?.hasExpiration || false,
        expirationDate: productToEdit?.expirationDate ? formatDate(productToEdit.expirationDate) : "",

      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        entryDate: "",
        image: "",
        hasExpiration: false,
        expirationDate: ""
      });
    }
    if (productToEdit?.expirationDate) {
      const today = new Date();
      const exp = new Date(productToEdit.expirationDate);
      const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

      if (diffDays > 0 && diffDays <= 7) {
        toast.error(`¡El producto caduca en ${diffDays} día(s)!`, {
          style: {
            background: 'orange',
            color: 'white'
          }
        });
      }
    }

  }, [productToEdit, isOpen, categories]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.category) {
      return toast.error("Debe seleccionar una categoría y un proveedor", {
        style: {
          background: 'red',
          color: 'white',
          whiteSpace: 'pre-line'
        }
      });
    }

    let res;
    if (productToEdit) {
      res = await updateProducts(productToEdit._id, form);
    } else {
      res = await saveProducts(form);
    }

    if (res?.error) {
      return toast.error(res.msg, {
        style: {
          background: 'red',
          color: 'white',
          whiteSpace: 'pre-line'
        }
      });
    }

    toast.success(productToEdit ? "Producto actualizado correctamente" : "Producto guardado correctamente", {
      style: {
        background: 'green',
        color: 'white'
      }
    });
    onClose();
    onProductSaved();
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };



  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered >
        <ModalOverlay />
        <ModalContent className="modal-form">
          <ModalHeader>{productToEdit ? "Editar Producto" : "Registrar Nuevo Producto"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input name="name" value={form.name} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input name="description" value={form.description} onChange={handleChange} />
              </FormControl>


              <FormControl isRequired>
                <FormLabel>Stock</FormLabel>
                <Input type="number" name="stock" value={form.stock} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Categoría</FormLabel>
                <Select name="category" value={form.category} onChange={handleChange}>
                  <option value="">Seleccione una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Fecha de Ingreso</FormLabel>
                <Input type="date" name="entryDate" value={form.entryDate} onChange={handleChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Imagen (URL)</FormLabel>
                <Input name="image" value={form.image} onChange={handleChange} />
              </FormControl>
            </SimpleGrid>

            <FormControl mt={4}>
              <FormLabel>
                <input
                  type="checkbox"
                  name="hasExpiration"
                  checked={form.hasExpiration}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: "8px" }}
                />
                ¿Tiene fecha de vencimiento?
              </FormLabel>
            </FormControl>

            {form.hasExpiration && (
              <FormControl isRequired mt={2}>
                <FormLabel>Fecha de Vencimiento</FormLabel>
                <Input
                  type="date"
                  name="expirationDate"
                  value={form.expirationDate}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {productToEdit ? "Editar" : "Guardar"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
