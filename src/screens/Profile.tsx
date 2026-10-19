import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, Image } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../tokens';
import { BackArrow, ShareIcon } from '../icons';
import { accountProfile } from '../data';


function MoreDots({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill={color}>
      <Circle cx="3.6" cy="12" r="2.4" />
      <Circle cx="12" cy="12" r="2.4" />
      <Circle cx="20.4" cy="12" r="2.4" />
    </Svg>
  );
}

function CalendarSmall({ size = 13, color = '#C4C4C5' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round">
      <Rect x="3" y="4.5" width="18" height="16.5" rx="3" />
      <Path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </Svg>
  );
}

interface ProfileProps {
  onBack: () => void;
  avatar: React.ReactNode;
}

export function ProfileScreen({ onBack, avatar }: ProfileProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const p = accountProfile;
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={styles.navBtn} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="More options"
          accessibilityState={{ expanded: menuOpen }}
          onPress={() => setMenuOpen((v) => !v)}
          style={styles.navBtn}
          activeOpacity={0.7}
        >
          <MoreDots color={menuOpen ? '#B9B9BA' : colors.ink} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatar}>{avatar}</View>
      <Text style={styles.name} accessibilityRole="header">{p.name}</Text>
      <View style={styles.joinedRow}>
        <CalendarSmall />
        <Text style={styles.joined}>{p.joined}</Text>
      </View>
      <View style={styles.countsRow}>
        <Text style={styles.count}>{p.hosted}</Text>
        <Text style={styles.countLabel}> Hosted</Text>
        <Text style={[styles.count, { marginLeft: 12 }]}>{p.attended}</Text>
        <Text style={styles.countLabel}> Attended</Text>
      </View>
      <View style={styles.rule} />
      <Image source={require('../../assets/hosts/empty-tile.png')} style={styles.emptyTile as object} />
      <Text style={styles.emptyTitle}>Nothing Here, Yet</Text>
      <Text style={styles.emptyBody}>{`${p.name} has no public events at this time.`}</Text>
      {menuOpen && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setMenuOpen(false)} accessibilityLabel="Close menu" />
          <View style={styles.menu} accessibilityRole="menu">
            <TouchableOpacity accessibilityRole="menuitem" style={styles.menuItem} onPress={() => setMenuOpen(false)} activeOpacity={0.7}>
              <Text style={styles.menuText}>Share…</Text>
              <View style={{ flex: 1 }} />
              <ShareIcon size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: '100%', backgroundColor: colors.white, overflow: 'hidden' },
  header: { position: 'absolute', top: 4, left: 8, right: 12, height: 48, flexDirection: 'row', alignItems: 'center' },
  navBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  avatar: { position: 'absolute', left: 16, top: 56, width: 80, height: 80, borderRadius: 40, overflow: 'hidden' },
  name: { position: 'absolute', left: 16, top: 150.2, fontSize: 24, lineHeight: 30, fontWeight: '600', color: colors.ink },
  joinedRow: { position: 'absolute', left: 16.7, top: 194.6, height: 18, flexDirection: 'row', alignItems: 'center' },
  joined: { marginLeft: 6, fontSize: 15, lineHeight: 18, color: colors.inkMuted },
  countsRow: { position: 'absolute', left: 16.7, top: 226.4, height: 18, flexDirection: 'row', alignItems: 'center' },
  count: { fontSize: 15, lineHeight: 18, color: colors.inkSecondary, fontWeight: '500' },
  countLabel: { fontSize: 15, lineHeight: 18, color: colors.inkMuted },
  rule: { position: 'absolute', left: 0, right: 0, top: 261.5, height: 1, backgroundColor: colors.divider },
  emptyTile: { position: 'absolute', left: 164.5, top: 436, width: 64, height: 64, borderRadius: 15 },
  emptyTitle: { position: 'absolute', left: 16, right: 16, top: 515.4, textAlign: 'center', fontSize: 18, lineHeight: 24, fontWeight: '600', color: colors.inkSecondary },
  emptyBody: { position: 'absolute', left: 16, right: 16, top: 544.6, textAlign: 'center', fontSize: 15, lineHeight: 20, color: colors.inkSecondary },
  menu: {
    position: 'absolute', left: 180.6, top: 48.2, width: 196.5, height: 45.1, borderRadius: 6,
    backgroundColor: '#F4F5F6', shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  menuItem: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 16.6, paddingRight: 15 },
  menuText: { fontSize: 16, color: colors.ink },
});
