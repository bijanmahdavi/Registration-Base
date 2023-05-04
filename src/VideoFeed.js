import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    const data = [
      { itemId: 1, url: 'https://ia904609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4' },
      { itemId: 2, url: 'https://ia601901.us.archive.org/2/items/honbasho-201611-kyushu/november_02.mp4' },
      // ...
    ];
    setVideos(data);
  };

  const renderItem = ({ item }) => (
    <Video
      source={{ uri: item.url }}
      style={styles.video}
      resizeMode={Video.RESIZE_MODE_COVER}
      shouldPlay
      isLooping
    />
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.itemId.toString()}
      pagingEnabled
      snapToInterval={Dimensions.get('window').height}
      snapToAlignment="start"
      decelerationRate="fast"
      onEndReached={() => {}}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
});

export default VideoFeed;
