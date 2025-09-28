import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Login } from '../components/Login'

const MotionBox = motion(Box)

const Auth = () => {
    // Animación para el contenido
    const variants = {
        hidden: { opacity: 0, y: 30, transition: { duration: 0.4 } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    }

    // Fondo fijo (puedes cambiar los colores como quieras)
    const background = "linear-gradient(135deg,rgb(197, 71, 71),rgba(161, 196, 253, 0.34))"

    return (
        <MotionBox
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
            bg={background}
        >
            <MotionBox
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                width="100%"
                maxW="400px"
            >
                <Login />
            </MotionBox>
        </MotionBox>
    )
}

export default Auth
