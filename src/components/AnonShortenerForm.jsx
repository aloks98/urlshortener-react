import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  Box,
  Input,
  Flex,
  Heading,
  Button,
  FormErrorMessage,
  FormHelperText,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const ANON_SHORTEN_URL = 'http://192.168.29.241:9200/api/anon_shorten';

const schema = yup.object().shape({
  url: yup
    .string()
    .url('Please enter a valid URL (with http:// or https://)')
    .required('Required'),
  slug: yup.string(),
});



const AnonShortenerForm = () => {
  
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [url, setUrl] = useState("")
  const { hasCopied, onCopy } = useClipboard(url)
  const toast = useToast()

  const onSubmit = async data => {
      if(data.slug === "") {
        try {
            const res = await axios.post(ANON_SHORTEN_URL, { url: data.url });
            setUrl("https://skipto.site/"+res.data.slug)
        } catch(error) {
          toast({
            title: "An Error Occured",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      } else {
        try {
            const res = await axios.post(ANON_SHORTEN_URL, data);
            setUrl("https://skipto.site/"+res.data.slug)
        } catch(error) {
          toast({
            title: "An Error Occured",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
      }
    
  };

  


  return (
    <>
      <Header />
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100%"
        textAlign="center"
      >
        <Heading mt={10}>A Free and Open Source URL Shortener!</Heading>
        <Box p={8} border="4px" borderRadius={9} borderColor="gray.500" m={10}>
          <Box textAlign="center" p={5}>
            <Heading>Shorten your URL</Heading>
          </Box>
          <Box my={4} textAlign="center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl my={4} id="url" isRequired isInvalid="true">
                <FormLabel>Long URL</FormLabel>
                <Input
                  type="text"
                  name="url"
                  placeholder="Long URL"
                  ref={register}
                />
                <FormErrorMessage>
                  {errors.url && errors.url.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl my={4} id="slug" w={1 / 2}>
                <FormLabel>Slug</FormLabel>
                <Input type="text" name="slug" ref={register} />
                <FormHelperText>Optional custom back half.</FormHelperText>
              </FormControl>
              <Button colorScheme="teal" size="lg" mt={4} type="submit">
                Submit
              </Button>
            </form>
          </Box>
          {url && <><Input value={url} isReadOnly w='70%' />
        <Button onClick={onCopy} mx={2} my={3}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
          </>}

        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default AnonShortenerForm;
