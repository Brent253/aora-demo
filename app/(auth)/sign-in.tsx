import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn, getSession } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

interface SignInProps {

}

const SignIn: React.FC<SignInProps> = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [form, setform] = useState({ email: '', password: '' })
    const [isSubmitting, setisSubmitting] = useState(false)

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
        }
        setisSubmitting(true);

        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);
            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setisSubmitting(false);
        }
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Log in to Aora
                    </Text>

                    <FormField
                        title="Email"
                        placeHolder='test@test.com'
                        value={form.email}
                        handleChangeText={(e: any) => setform({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address" //Useful for autofilling
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: any) => setform({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100'>
                            Don't have account?
                        </Text>
                        <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn