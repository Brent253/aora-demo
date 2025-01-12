import { TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    title: string;
    containerStyles: string;
    handlePress(): void;
    textStyles?: string;
    isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
                className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}
            >
                <Text className={`text-primary font-psemibold text-lg p-5 ${textStyles}`}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton