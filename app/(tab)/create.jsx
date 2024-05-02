import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title:"",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image" ? ["image/png", "image/jpg"] : ["video/mp4", "video/gif"],
    })

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form, 
          thumbnail: result.assets[0],
        })
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2))
      }, 100);
    }
  }

  const submit = async () => {
    if (
      (form.prompt === "") | (form.title === "") | !form.thumbnail | !form.video) {
        return Alert.alert("Please provide all fields")
      }

      setUploading(true);
      try {
        await createVideoPost({
          ...form,
          userId: user.$id,
        })

        Alert.alert("Success", "Post uploaded successfully");
        router.push("/home")
      }
    )
  }
  return (
    <View>
      <Text>Create</Text>
    </View>
  )
}

export default Create