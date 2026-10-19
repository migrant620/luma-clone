import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';


const C = {
  stroke: '#F2F2F2',
  fill: '#F9F9F9',
  bar: '#EDEEEE',
  grey: '#EBECED',
  blue: '#287EFF',
  online: '#13BC00',
} as const;

const ROWS = [
  { top: 43.7, bars: [57.9, 75.3], kind: 'thumb' as const },
  { top: 94.5, bars: [67.2, 112.5], kind: 'warm' as const },
  { top: 146.3, bars: [39.3, 124.5], kind: 'sun' as const },
];

export const CHAT_ART_HEIGHT = 203.1;

export function ChatIllustration() {
  return (
    <View style={styles.box} {...({ 'aria-hidden': true } as object)} pointerEvents="none">
      <View style={styles.outline} />
      {ROWS.map((r) => (
        <React.Fragment key={r.top}>
          {r.kind === 'thumb' ? (
            <Image source={require('../../assets/covers/cover-popup.jpg')} style={[styles.thumb, { top: r.top }] as object} />
          ) : (
            <View style={[styles.person, { top: r.top, backgroundColor: r.kind === 'warm' ? '#E9A23B' : '#F4D35E' }]} />
          )}
          <View style={[styles.bar, { top: r.top + 8.2, width: r.bars[0] }]} />
          <View style={[styles.bar, { top: r.top + 23.5, width: r.bars[1] }]} />
        </React.Fragment>
      ))}
      <View style={styles.online} />
      <View style={styles.fade} />
      <View style={styles.greyBubble}>
        <Text style={styles.greyText}>{'Save me a seat\nat the opening'}</Text>
      </View>
      <View style={[styles.tail, { left: 68.1, top: 38.5, backgroundColor: C.grey }]} />
      <View style={styles.blueBubble}>
        <Text style={styles.blueText}>On my way!</Text>
      </View>
      <View style={[styles.tail, { left: 228.7, top: 75.7, backgroundColor: C.blue }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: 233.6, height: CHAT_ART_HEIGHT, marginLeft: 10.4, marginTop: -6 },
  outline: {
    position: 'absolute', left: 0, top: 28.5, width: 223.8, bottom: 0,
    borderWidth: 3.7, borderBottomWidth: 0, borderColor: C.stroke, backgroundColor: C.fill,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  thumb: { position: 'absolute', left: 17.7, width: 39.3, height: 39.3, borderRadius: 5 },
  person: { position: 'absolute', left: 17.7, width: 39.3, height: 39.3, borderRadius: 19.65 },
  bar: { position: 'absolute', left: 63.5, height: 8.5, borderRadius: 4.25, backgroundColor: C.bar },
  online: { position: 'absolute', left: 48.3, top: 126.2, width: 7.6, height: 7.6, borderRadius: 3.8, backgroundColor: C.online, borderWidth: 1.4, borderColor: '#FFFFFF' },
  fade: {
    position: 'absolute', left: -4, right: -4, bottom: 0, height: 40,
    ...(Platform.OS === 'web' ? ({ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 90%)' } as object) : { backgroundColor: 'transparent' }),
  },
  greyBubble: { position: 'absolute', left: 72.3, top: 0, width: 120, height: 43.3, borderRadius: 21.65, backgroundColor: C.grey, alignItems: 'center', justifyContent: 'center' },
  greyText: { fontSize: 12.2, lineHeight: 15.4, color: '#151516', textAlign: 'center' },
  blueBubble: { position: 'absolute', left: 146.6, top: 52.1, width: 82.9, height: 28.3, borderRadius: 14.15, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  blueText: { fontSize: 13, color: '#FFFFFF', fontWeight: '500' },
  tail: { position: 'absolute', width: 5, height: 5, borderRadius: 2.5 },
});
