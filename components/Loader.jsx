import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = ({ isLoading }) => {
  return (
    <View
        className="absolute flex justify-center items-center w-full h-full bg-primary/69 z-10"
        style={{height: ScreenStackHeaderRightView,
        }}>
        <ActivityIndicator 
            animating={isLoading}
            color="#fff"
            size={osName === "ios" ? "large" : 50}
            />
    </View>
  )
}

export default Loader