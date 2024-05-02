import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const FormField = ({
    title, 
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View>
        <TextInput 
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder='placeholder'
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image 
                    image={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                    />

            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField