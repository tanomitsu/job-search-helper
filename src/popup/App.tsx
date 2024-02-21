import { Box, ChakraProvider } from "@chakra-ui/react"
import { SettingsView } from "./settings"

function App() {
  return (
    <ChakraProvider>
      <Box w={350} p={8}>
        <SettingsView />
      </Box>
    </ChakraProvider>
  )
}

export default App
