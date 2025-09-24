'use client'

import React from 'react'
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'


const MotionBox = motion.create(Box)

function AnimatedCard({ image, alt, title, description, to }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.3 })
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) navigate(to)
  }

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role={'group'}
      p={6}
      mt={10}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      cursor="pointer"
      onClick={handleClick}
    >
      <Box
        rounded={'lg'}
        mt={-12}
        pos={'relative'}
        height={'230px'}
        _after={{
          transition: 'all .3s ease',
          content: '""',
          w: 'full',
          h: 'full',
          pos: 'absolute',
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
        _groupHover={{
          _after: { filter: 'blur(20px)' },
        }}
      >
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={image}
          alt={alt}
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.1)' }}
        />
      </Box>
      <Stack pt={10} align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          {title}
        </Text>
        <Text fontWeight={800} fontSize={'xl'} textAlign="center">
          {description}
        </Text>
      </Stack>
    </MotionBox>
  )
}

export default function HeadLine() {
  const bgText = useColorModeValue('black', 'black')
  const bgHeadLine = useColorModeValue('gray.100', 'white')

  return (
    <Box textAlign="center" py={10} px={6} bg={bgHeadLine}>
      <Heading as="h2" size="xl" mt={6} mb={2} color={bgText}>
        Almacen Informatica
      </Heading>
      <Flex justify="center" gap={6} wrap="wrap">
        <AnimatedCard
          image="https://i.ibb.co/9mtJTX7j/Dise-o-sin-t-tulo.png"
          alt="Almacen"
          description="Productos"
          title="Productos"
          to="/products"
        />
        <AnimatedCard
          image="data:image/jpeg;base64,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"
          alt="Movimientos"
          description="Movimientos"
          title="Movimientos"
          to="/movimientos"
        />
        <AnimatedCard
          image="https://images.unsplash.com/photo-1504376830547-506dedfe1fe9?q=80&w=2070&auto=format&fit=crop"
          description="Categorias"
          title="Categorias"
          to="/category"
        />
      </Flex>
    </Box>
  )
}
