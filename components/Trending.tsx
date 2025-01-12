import React, { useState } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as AnimaTable from 'react-native-animatable';
import { icons } from '../constants';
import { WebView } from 'react-native-webview';

interface TrendingItemProps {
    activeItem: string;
    item: any;
}

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1.1,
    },
};

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false);

    return (
        <AnimaTable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ? (
                // Embed Vimeo video using WebView
                <WebView
                    source={{ uri: item.video }} // Use the Vimeo video ID
                    style={{ width: '300', height: 250, resizeMode: 'contain', flex: 1 }}
                    javaScriptEnabled
                    allowsInlineMediaPlayback
                    startInLoadingState
                    scalesPageToFit={false}
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{
                            uri: item.thumbnail,
                        }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </AnimaTable.View>
    );
};

interface TrendingProps {
    posts: [];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    const viewableItemsChange = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item: any) => item.$id}
            renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
            onViewableItemsChanged={viewableItemsChange}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            contentOffset={{ x: 170 }}
            horizontal
        />
    );
};


export default Trending;
