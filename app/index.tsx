import Colors from '@/constants/Colors';
import { STRING_CONSTANTS } from '@/constants/strings';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";


const Page = () => {

    const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
    

     const handleLayout = (event) => {
        const { width, height, x, y } = event.nativeEvent.layout;
        console.log('Component dimensions:', { width, height, x, y });
        // You can also update state here to store the dimensions if needed
      };

    return (
        <View className='flex-1 justify-between items-center'>
            { assets && (
                <Video
                resizeMode={ResizeMode.COVER} 
                source={{ uri: assets[0].uri }}
                isMuted
                isLooping
                shouldPlay
                style = {styles.video} />
            )}
            <View className='p-5 text-wrap mt-20'>
                <Text className='text-4xl text-white font-black uppercase'>{STRING_CONSTANTS.welcome_label}</Text>
            </View>
            <View className='flex-row justify-center gap-5 mb-20 px-5'>
                <Link onLayout={handleLayout} style={[styles.pillButton]} href={'/login'} asChild>
                <Pressable className=''>
                    <Text className='text-white text-xl font-medium'>{STRING_CONSTANTS.login_label}</Text>
                </Pressable>
                </Link>

                <Link onLayout={handleLayout} style={[styles.pillButton,{ backgroundColor: 'white' }]} href={'/signup'} asChild>
                <Pressable className=''>
                    <Text className='text-xl font-medium text-black'>{STRING_CONSTANTS.signup_label}</Text>
                </Pressable>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    video : {
        width: '100%', 
        height: '100%',
        position: 'absolute'
    },
    pillButton: {
        padding: 10,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.dark
    }
})

export default Page;