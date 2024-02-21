import {
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import type { MuteKeyword } from "../../../types"

type EditMuteKeywordsModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly muteKeywords: MuteKeyword[]
  readonly onPushEnd: () => void
  readonly onDelete: (id: string) => void
  readonly onChange: (id: string, value: string) => void
}

const EditMuteKeywordsModal: React.FC<EditMuteKeywordsModalProps> = ({
  isOpen,
  onClose,
  muteKeywords,
  onPushEnd,
  onDelete,
  onChange,
}) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody h="100%">
          <IconButton
            w={28}
            aria-label="Push End Mute Keyword"
            icon={
              <HStack>
                <AiOutlinePlus />
                <Text>追加</Text>
              </HStack>
            }
            onClick={onPushEnd}
          />
          <TableContainer>
            <Table variant="unstyled">
              <Tbody>
                {muteKeywords.map((keyword) => (
                  <Tr key={keyword.id}>
                    <Td px={0} py={1}>
                      <Input
                        value={keyword.value}
                        onChange={(e) => onChange(keyword.id, e.target.value)}
                      />
                    </Td>
                    <Td w="10%" px={0} py={1}>
                      <IconButton
                        aria-label="Remove Mute Keyword"
                        variant="outline"
                        icon={<AiOutlineClose />}
                        onClick={() => onDelete(keyword.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditMuteKeywordsModal
