import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import logo from '../aloks.svg'

const Footer = (props) => {
    return (
        <Flex direction='column' justify='center' align='center' {...props}>
            <p>Made with 💘 by</p>
            <Image src={logo} width='128px' padding='8px'/>
        </Flex>
    )
}

export default Footer;