import { useState } from "react"
import { Button, ChakraProvider, Heading, Text } from "@chakra-ui/react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Heading>Hello, World!</Heading>
      <Text>Count: ${count}</Text>
      <Button onClick={() => setCount((prev) => prev + 1)}>Click!</Button>
    </ChakraProvider>
  )
}

export default App
