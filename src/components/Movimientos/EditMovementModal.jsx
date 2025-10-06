// components/Movimientos/EditMovementModal.jsx
import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useColorModeValue,
  Text,
  Box
} from '@chakra-ui/react';
import { useUpdateMovement } from '../../shared/hooks/useUpdateMovement';

export const EditMovementModal = ({ isOpen, onClose, movement, onSuccess }) => {
  const [formData, setFormData] = useState({
    reason: '',
    destiny: ''
  });
  const { actualizarMovimiento, isLoading } = useUpdateMovement();

  const formBackground = useColorModeValue('white', 'gray.700');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const infoBg = useColorModeValue('gray.50', 'gray.600');
  const infoTextColor = useColorModeValue('gray.700', 'gray.100');

  useEffect(() => {
    if (movement && isOpen) {
      setFormData({
        reason: movement.razon !== 'N/A' ? movement.razon : '',
        destiny: movement.destino !== 'N/A' ? movement.destino : ''
      });
    }
  }, [movement, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.reason.trim() || !formData.destiny.trim()) {
      return;
    }

    const result = await actualizarMovimiento(
      movement._id, 
      formData.reason, 
      formData.destiny
    );

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ reason: '', destiny: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent bg={formBackground}>
        <ModalHeader>Editar Movimiento de Salida</ModalHeader>
        <ModalCloseButton isDisabled={isLoading} />
        
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              {/* Info del movimiento - Solo texto */}
              <Box 
                w="full" 
                p={3} 
                bg={infoBg} 
                borderRadius="md"
                borderLeft="4px solid"
                borderColor="red.500"
              >
                <Text fontSize="sm" color={infoTextColor} fontWeight="semibold">
                  {movement?.producto} - {movement?.cantidad} unidades
                </Text>
                <Text fontSize="xs" color={infoTextColor} mt={1}>
                  {movement?.fecha}
                </Text>
              </Box>

              <FormControl isRequired>
                <FormLabel color={labelColor}>Razón</FormLabel>
                <Input
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Ej: Se fue del psg"
                  isDisabled={isLoading}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color={labelColor}>Destino</FormLabel>
                <Input
                  name="destiny"
                  value={formData.destiny}
                  onChange={handleChange}
                  placeholder="Ej: Madrid"
                  isDisabled={isLoading}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={handleClose}
              isDisabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              colorScheme="blue" 
              type="submit"
              isLoading={isLoading}
            >
              Actualizar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};