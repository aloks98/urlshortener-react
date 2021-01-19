import React from 'react';
import { Flex, Box, Spacer, Button, Image, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import logo from '../skiptosite.svg';



const Header = () => {
  const bg = useColorModeValue("#81E6D9", "#171923")
const color = useColorModeValue("white", "gray.800")
  return (
    <Flex p={4} bg={bg}>
      <Image src={logo} w="20%" />
      <Spacer />
      <ColorModeSwitcher mr={4} />
      {/* <Box>
                <Button colorScheme="teal" mr="4">
                Sign Up
                </Button>
                <Button colorScheme="teal">Log in</Button>
            </Box> */}
    </Flex>
  );
};

export default Header;
