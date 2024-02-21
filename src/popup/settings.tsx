import {
  Button,
  Heading,
  Skeleton,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"
import { UserStoredSettings } from "./types"
import { v4 as uuidv4 } from "uuid"
import EditMuteKeywordsModal from "./features/MuteKeyword/components/EditMuteKeywordsModal"

const defaultUserSettings: UserStoredSettings = {
  isExcludePrs: false,
  isExcludeDuplicates: false,
  muteKeywords: [],
}

type ChromeStoredSettings = {
  isExcludePrs: boolean
  isExcludeDuplicates: boolean
  muteKeywords: string[]
}

export const SettingsView: React.FC = () => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [userStoredSettings, setUserStoredSettings] = useState<
    UserStoredSettings | undefined
  >(undefined)

  // Storageからデータを取得
  useEffect(() => {
    chrome.storage.sync
      .get(["isExcludePrs", "isExcludeDuplicates", "muteKeywords"])
      .then((data: Partial<ChromeStoredSettings>) => {
        setUserStoredSettings({
          ...defaultUserSettings,
          isExcludePrs: (data["isExcludePrs"] as boolean) ?? undefined,
          isExcludeDuplicates:
            (data["isExcludeDuplicates"] as boolean) ?? undefined,
          muteKeywords:
            (data["muteKeywords"] ?? []).map((k) => ({
              id: uuidv4(),
              value: k,
            })) ?? [],
        })
      })
  }, [])

  const handleEditMuteKeyword = useCallback(
    (id: string, value: string) => {
      if (userStoredSettings === undefined) {
        toast({
          title: "保存に失敗しました。",
          status: "error",
        })
        return
      }
      const _keywords = userStoredSettings.muteKeywords.map((k) =>
        k.id === id ? { ...k, value } : k
      )
      setUserStoredSettings({
        ...userStoredSettings,
        muteKeywords: _keywords,
      })
    },
    [toast, userStoredSettings]
  )

  const handlePushEndMuteKeyword = useCallback(() => {
    if (userStoredSettings === undefined) {
      toast({
        title: "保存に失敗しました。",
        status: "error",
      })
      return
    }
    setUserStoredSettings({
      ...userStoredSettings,
      muteKeywords: [
        ...userStoredSettings.muteKeywords,
        { id: uuidv4(), value: "" },
      ],
    })
  }, [toast, userStoredSettings])

  const handleDeleteMuteKeyword = useCallback(
    (id: string) => {
      if (userStoredSettings === undefined) {
        toast({
          title: "保存に失敗しました。",
          status: "error",
        })
        return
      }
      setUserStoredSettings({
        ...userStoredSettings,
        muteKeywords: userStoredSettings.muteKeywords.filter(
          (k) => k.id !== id
        ),
      })
    },
    [toast, userStoredSettings]
  )

  const handleClose = useCallback(() => {
    if (userStoredSettings === undefined) {
      toast({
        title: "保存に失敗しました。",
        status: "error",
      })
      return
    }
    setUserStoredSettings({
      ...userStoredSettings,
      muteKeywords: userStoredSettings.muteKeywords.filter(
        (k) => k.value !== ""
      ),
    })
    onClose()
  }, [onClose, toast, userStoredSettings])

  /**
   * 保存ボタンクリック時の処理
   */
  const handleSaveButtonClick = useCallback(() => {
    if (userStoredSettings === undefined) {
      toast({
        title: "保存に失敗しました。",
        status: "error",
      })
      return
    }
    toast.promise(
      chrome.storage.sync.set({
        isExcludePrs: userStoredSettings.isExcludePrs,
        isExcludeDuplicates: userStoredSettings.isExcludeDuplicates,
        muteKeywords: userStoredSettings.muteKeywords
          .map((k) => k.value)
          .filter((v) => v !== ""),
      }),
      {
        success: {
          title: "保存しました",
        },
        error: {
          title: "保存に失敗しました。",
        },
        loading: {
          title: "保存中…",
        },
      }
    )
  }, [toast, userStoredSettings])

  return (
    <>
      <VStack my={4} alignItems="flex-start">
        <Heading size="md">設定項目</Heading>
        <Skeleton isLoaded={userStoredSettings !== undefined}>
          {userStoredSettings && (
            <TableContainer w="100%">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>PRを非表示</Td>
                    <Td>
                      <Switch
                        isChecked={userStoredSettings.isExcludePrs}
                        onChange={() =>
                          setUserStoredSettings({
                            ...userStoredSettings,
                            isExcludePrs: !userStoredSettings.isExcludePrs,
                          })
                        }
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>同じ会社の求人を非表示</Td>
                    <Td>
                      <Switch
                        isChecked={userStoredSettings.isExcludeDuplicates}
                        onChange={() =>
                          setUserStoredSettings({
                            ...userStoredSettings,
                            isExcludeDuplicates:
                              !userStoredSettings.isExcludeDuplicates,
                          })
                        }
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <VStack>
                        <Text>ミュートするキーワード</Text>
                        <Text>
                          ({userStoredSettings.muteKeywords.length}件)
                        </Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Button onClick={onOpen}>編集</Button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Skeleton>
        <Button w={24} colorScheme="teal" onClick={handleSaveButtonClick}>
          保存
        </Button>
      </VStack>
      {isOpen && userStoredSettings && (
        <EditMuteKeywordsModal
          isOpen={isOpen}
          onClose={handleClose}
          muteKeywords={userStoredSettings.muteKeywords}
          onPushEnd={handlePushEndMuteKeyword}
          onDelete={handleDeleteMuteKeyword}
          onChange={handleEditMuteKeyword}
        />
      )}
    </>
  )
}
