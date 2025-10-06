// shared/hooks/useUpdateMovement.js
import { useState } from "react";
import { updateMovement as updateMovementRequest } from '../../services/api';
import toast from "react-hot-toast";

export const useUpdateMovement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const actualizarMovimiento = async (movementId, reason, destiny) => {
    setIsLoading(true);
    try {
      const response = await updateMovementRequest(movementId, { reason, destiny });
      setIsLoading(false);

      if (response?.error) {
        toast.error(response.msg || 'Ocurrió un error al actualizar el movimiento');
        return { success: false };
      }

      toast.success('Movimiento actualizado con éxito!');
      return { success: true, data: response.movement };

    } catch (error) {
      setIsLoading(false);
      toast.error('Ocurrió un error inesperado al actualizar el movimiento.');
      console.error("Error al actualizar movimiento:", error);
      return { success: false, error };
    }
  };

  return {
    actualizarMovimiento,
    isLoading
  };
};