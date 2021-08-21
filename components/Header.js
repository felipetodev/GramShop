import { Image, Heading, Text, Stack, Box, Flex, Link } from '@chakra-ui/react'
import { APP } from 'app/constants'

export default function Header () {
  return (
    <Stack marginBottom={12}>
      <Image borderRadius={{ base: 'none', sm: 'lg' }} height='100%' maxHeight={64} src={APP.banner} />
      <Stack
        spacing={{ base: 3, sm: 6 }}
        alignItems='flex-start'
        direction={{ base: 'column', sm: 'row' }}
        paddingX={4}
      >
        <Box
          backgroundColor='white'
          padding={1}
          marginTop={{ base: -8, sm: -12 }}
          minWidth={{ base: 24, sm: 32 }}
          borderRadius={9999}
        >
          <Image
            borderRadius={9999}
            w={{ base: 24, sm: 32 }}
            h={{ base: 24, sm: 32 }}
            src={APP.avatar}
          />
        </Box>
        <Stack spacing={2} flex='1'>
          <Heading>{APP.title}</Heading>
          <Text color='gray.500' fontWeight='500'>{APP.description}</Text>
        </Stack>
        <Stack direction='row' justifyContent='flex-end'>
          {APP.social.map(({ social, link }) => (
            <Link key={social} href={link} isExternal borderRadius={9999}>
              <Flex
                key={social}
                w={{ base: 9, sm: 10 }}
                h={{ base: 9, sm: 10 }}
                borderRadius={9999}
                backgroundColor='primary.500'
                alignItems='center'
                justifyContent='center'
                color='white'
              >
                <Image alt={social} src={`https://icongr.am/fontawesome/${social}.svg?size=24&color=ffffff`} />
              </Flex>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
