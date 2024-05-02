import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { images } from "../../constants"
import React, { useState } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components"


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
      data={posts}
      keyExtractor={(items) => items.$id}
      renderItem={(item) => (
        <VideoCard 
          title={item.title}
          thumbnail={item.thumbnail}
          video={item.video}
          creator={item.creater.username}
          avator={item.creator.avator}
          />
      )}
      ListHeaderComponent={() => (
        <View className="flex my-6 px-4 space-y-6">
        <View className="flex justify-between items-start flex-row mb-6">
          <View>
            <Text className="font-pmedium text-sm text-gray-100">
              Welcome Back
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              JSMastery
            </Text>
          </View>

          <View className="mt-1.5">
            <Image 
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
              />
          </View>
        </View>

        <SearchInput />

        <View className="w-full flex-1 pt-5 pb-8">
          <Text className="text-1g font-pregular text-gray-100 mb-3">
            Latest Videos
          </Text>
          <Trending posts={latestPosts ?? []} />
        </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState 
          title="No Videos Found"
          subtitle="No videos created yet"
          />
      )}
      refreshControl={
        <refreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      />
    </SafeAreaView>
  )
}

export default Home