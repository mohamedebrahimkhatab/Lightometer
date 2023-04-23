import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';


const secondToMillis = (min) => min * 1000 ;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ seconds = 0.1, isPaused, onProgress, onEnd,style }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);
  const reset = ()=> setMillis(secondToMillis(seconds));
  
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(secondToMillis(seconds));
  }, [seconds]);

  useEffect(() => {
    onProgress(millis / secondToMillis(seconds));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const seconds_remaining = Math.floor(millis / 1000) % 60;
  return (
    <Text style={[styles.text,style]}>
      {formatTime(seconds_remaining)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 10,
  },
});