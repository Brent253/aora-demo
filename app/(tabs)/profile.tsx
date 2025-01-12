import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '@/components/EmptyState'
import { getUserPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

    useEffect(() => {
        console.log('user info:')
        console.log(user)
        refetch();
    }, [])

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace('/sign-in');
    }

    return (
        <View>
            <SafeAreaView className='bg-primary border-2 h-full'>
                <FlatList
                    data={posts}
                    keyExtractor={(item: any) => item.$id}
                    renderItem={({ item }) => (
                        <VideoCard
                            title={item.title}
                            thumbnail={item.thumbnail}
                            username={item.creator.username}
                            avatar={item.creator.avatar}
                            video={item.video}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                            <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
                                <Image
                                    source={icons.logout}
                                    resizeMode='contain'
                                    className='w-6 h-6'
                                />
                            </TouchableOpacity>

                            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                                <Image
                                    source={{ uri: user?.avatar || 'default-avatar-url' }}  // Provide fallback URL if avatar is not available
                                    className='w-[90%] h-[90%] rounded-lg'
                                    resizeMode='cover'
                                />
                            </View>

                            <InfoBox
                                title={user?.username}
                                containerStyles='mt-5'
                                titleStyles='text-lg'
                            />
                            <View className='mt-5 flex-row'>
                                <InfoBox
                                    title={posts.length || 0}
                                    subtitle="Posts"
                                    containerStyles='mr-10'
                                    titleStyles='text-xl'
                                />
                                <InfoBox
                                    title={"1.2k"}
                                    subtitle="Followers"
                                    titleStyles='text-xl'
                                />
                            </View>
                        </View>
                    )}

                    ListEmptyComponent={() => (
                        <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
                    )}

                />
            </SafeAreaView>
        </View>
    )
}

export default Profile;