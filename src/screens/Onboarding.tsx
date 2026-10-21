import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { colors } from '../tokens';
import { BackArrow, LockIcon, SparkleIcon, ChevronDown } from '../icons';


const ONB = {
  page: '#FFFFFF',
  notifyPage: '#F4F4F6',
  field: '#F6F6F6',
  iconDisc: '#F6F6F6',
  notifyDisc: '#EBEBED',
  iconInk: '#9B9B9C',
  placeholder: '#BDBDBE',
  disabledFill: '#7F7F7F',
  disabledText: '#C5C5C5',
  fingerprint: '#ED2B32',
  lock: '#AB46DD',
  devices: '#F8712B',
  chevronDisc: '#EFF0F0',
  phoneShell: '#EBEBED',
  label: '#A1A1A2',
  hint: '#BDBDBE',
} as const;

const DISC_CX = 196.5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_MIN = 10;

interface HeaderProps {
  onBack?: () => void;
  onSkip?: () => void;
}

function OnbHeader({ onBack, onSkip }: HeaderProps) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
      ) : <View style={styles.backBtn} />}
      <View style={{ flex: 1 }} />
      {onSkip && (
        <TouchableOpacity accessibilityRole="button" onPress={onSkip} style={styles.skipBtn} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function IconDisc({ size, bg, cy = 92.4, children }: { size: number; bg: string; cy?: number; children: React.ReactNode }) {
  return (
    <View style={[styles.disc, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg, top: cy - size / 2, left: DISC_CX - size / 2 }]}>
      {children}
    </View>
  );
}

interface PrimaryProps {
  label: string;
  enabled?: boolean;
  onPress: () => void;
}

function PrimaryButton({ label, enabled = true, onPress }: PrimaryProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: !enabled }}
      disabled={!enabled}
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.primary, { backgroundColor: enabled ? colors.btnBlack : ONB.disabledFill }]}
    >
      <Text style={[styles.primaryText, { color: enabled ? '#FFFFFF' : ONB.disabledText }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function EnvelopeGlyph({ size = 30, color = ONB.iconInk }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round">
      <Rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <Path d="M3 6.2 L12 12.8 L21 6.2" />
    </Svg>
  );
}

function HandsetGlyph({ size = 30, color = ONB.iconInk }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round">
      <Rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <Path d="M10.5 5.2 H13.5" />
      <Path d="M10 10h0.01M12 10h0.01M14 10h0.01M10 12.5h0.01M12 12.5h0.01M14 12.5h0.01M10 15h0.01M12 15h0.01M14 15h0.01" strokeWidth={1.4} />
    </Svg>
  );
}

export function EmailSignInScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [email, setEmail] = React.useState('');
  const valid = EMAIL_RE.test(email.trim());
  return (
    <View style={styles.root}>
      <OnbHeader onBack={onBack} />
      <IconDisc size={56} bg={ONB.iconDisc}><EnvelopeGlyph /></IconDisc>
      <Text style={styles.title} accessibilityRole="header">Sign In with Email</Text>
      <Text style={styles.subtitle}>Please sign in or sign up below.</Text>
      <TextInput
        style={[styles.field, { top: 203.4 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="jane@luma.com"
        placeholderTextColor={ONB.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        accessibilityLabel="Email"
        onSubmitEditing={() => { if (valid) onNext(); }}
      />
      <PrimaryButton label="Next" enabled={valid} onPress={onNext} />
    </View>
  );
}

function formatUsPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function LinkPhoneScreen({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = React.useState('');
  const valid = phone.replace(/\D/g, '').length >= PHONE_DIGITS_MIN;
  return (
    <View style={styles.root}>
      <OnbHeader onSkip={onNext} />
      <IconDisc size={56} bg={ONB.iconDisc}><HandsetGlyph /></IconDisc>
      <Text style={styles.title} accessibilityRole="header">Link Phone Number</Text>
      <Text style={[styles.subtitle, styles.subtitleWide]}>
        Link your phone number to receive reminders via SMS and find your friends.
      </Text>
      <TextInput
        style={[styles.field, { top: 223.4 }]}
        value={phone}
        onChangeText={(t) => setPhone(formatUsPhone(t))}
        placeholder="(201) 555-0123"
        placeholderTextColor={ONB.placeholder}
        keyboardType="phone-pad"
        accessibilityLabel="Phone number"
      />
      <PrimaryButton label="Next" enabled={valid} onPress={onNext} />
    </View>
  );
}

function FingerprintGlyph({ size = 20, color = ONB.fingerprint }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round">
      <Path d="M5 9.5a7.5 7.5 0 0 1 14 0" />
      <Path d="M7.5 20c-.8-1.8-1.2-3.8-1.2-6a5.7 5.7 0 0 1 11.4 0" />
      <Path d="M10.5 21c-.8-2-1.2-4.4-1.2-7a2.7 2.7 0 0 1 5.4 0c0 1.6.2 3.1.6 4.5" />
      <Path d="M12 14c0 2.6.4 4.8 1.3 7" />
      <Path d="M17.7 16.5c0 1.5.2 2.8.5 3.8" />
    </Svg>
  );
}

function DevicesGlyph({ size = 20, color = ONB.devices }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round">
      <Rect x="2.5" y="4" width="15" height="11" rx="1.8" />
      <Path d="M6 19.5h6" strokeLinecap="round" />
      <Rect x="14.5" y="9" width="7" height="11.5" rx="1.6" fill="#FFFFFF" />
    </Svg>
  );
}

function PersonKeyGlyph({ size = 30, color = ONB.iconInk }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="10" cy="7.5" r="4" />
      <Path d="M3 20c0-3.6 3-6.2 7-6.2 1.2 0 2.3.2 3.2.6" />
      <Circle cx="17.5" cy="15" r="2.4" />
      <Path d="M17.5 17.4V22M17.5 19.6h1.8" />
    </Svg>
  );
}

const PASSKEY_POINTS = [
  { title: 'Go Password-Free', body: 'Sign in instantly using your biometrics, without needing to enter a password or SMS code.', icon: <FingerprintGlyph /> },
  { title: 'Built-in Security', body: 'Passkeys are securely stored on-device, protecting you against threats like phishing.', icon: <LockIcon size={20} color={ONB.lock} /> },
  { title: 'Works Across Devices', body: 'The system seamlessly syncs passkeys across devices, letting you sign in from anywhere.', icon: <DevicesGlyph /> },
];

export function PasskeyPromptScreen({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.root}>
      <OnbHeader onSkip={onNext} />
      <IconDisc size={64} cy={96.6} bg={ONB.iconDisc}><PersonKeyGlyph size={32} /></IconDisc>
      <Text style={[styles.title, styles.titlePasskey]} accessibilityRole="header">Simplify Your Sign In</Text>
      <Text style={[styles.subtitle, styles.subtitlePasskey]}>Passkeys are a fast and secure way to sign in.</Text>
      {PASSKEY_POINTS.map((p, i) => (
        <View key={p.title} style={[styles.point, { top: 248.5 + i * 94.65 }]}>
          <View style={styles.pointIcon}>{p.icon}</View>
          <Text style={styles.pointTitle}>{p.title}</Text>
          <Text style={styles.pointBody}>{p.body}</Text>
        </View>
      ))}
      <PrimaryButton label="Create Passkey" onPress={onNext} />
    </View>
  );
}

const SPARKLE_COLS = [4.4, 46.9, 88.8, 130.9, 172.5, 218.9, 260.8, 302.8, 344.6, 384.3];
const SPARKLE_ROWS = [10.7, 52.2, 93.9, 135.5];
const SPARKLE = 21;

function SparkleBand() {
  return (
    <View style={styles.sparkleBand} pointerEvents="none" {...({ 'aria-hidden': true } as object)}>
      {SPARKLE_ROWS.map((cy) => SPARKLE_COLS.map((cx) => (
        <View key={`${cx}-${cy}`} style={[styles.sparkle, { left: cx - SPARKLE / 2, top: cy - SPARKLE / 2 }]}>
          <SparkleIcon size={SPARKLE} color="rgba(0,0,0,0.072)" />
        </View>
      )))}
      <View style={styles.sparkleFade} />
    </View>
  );
}

function CameraGlyph({ size = 14, color = colors.ink }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="M8.6 4.5h6.8l1.6 2.3h2.8A2.7 2.7 0 0 1 22.5 9.5v8.3a2.7 2.7 0 0 1-2.7 2.7H4.2a2.7 2.7 0 0 1-2.7-2.7V9.5a2.7 2.7 0 0 1 2.7-2.7H7z" />
      <Circle cx="12" cy="13.4" r="4" fill="#FFFFFF" />
      <Circle cx="12" cy="13.4" r="2.4" fill={color} />
    </Svg>
  );
}

interface ProfileSetupProps {
  name: string;
  avatar: React.ReactNode;
  onNext: () => void;
}

export function ProfileSetupScreen({ name: initialName, avatar, onNext }: ProfileSetupProps) {
  const [name, setName] = React.useState(initialName);
  const [bio, setBio] = React.useState('');
  return (
    <View style={styles.root}>
      <SparkleBand />
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Edit photo" style={styles.setupAvatar} activeOpacity={0.85}>
        <View style={styles.setupAvatarClip}>{avatar}</View>
        <View style={styles.cameraBadge}><CameraGlyph /></View>
      </TouchableOpacity>
      <Text style={styles.setupTitle} accessibilityRole="header">Your Profile</Text>
      <Text style={styles.setupSubtitle}>Introduce yourself to others in your events.</Text>
      <Text style={[styles.setupLabel, { top: 275.1 }]}>Name</Text>
      <TextInput
        style={[styles.setupField, { top: 306.4, height: 51.7, borderRadius: 25.85 }]}
        value={name}
        onChangeText={setName}
        accessibilityLabel="Name"
        autoComplete="name"
        maxLength={60}
      />
      <Text style={[styles.setupLabel, { top: 382.1 }]}>Bio</Text>
      <TextInput
        style={[styles.setupField, styles.setupBio]}
        value={bio}
        onChangeText={setBio}
        placeholder="Share a little about your background and interests."
        placeholderTextColor={ONB.hint}
        accessibilityLabel="Bio"
        multiline
        maxLength={280}
      />
      <PrimaryButton label="Save Profile" enabled={name.trim().length > 0} onPress={onNext} />
    </View>
  );
}

function BellGlyph({ size = 30, color = '#949497' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.8h-15z" />
      <Path d="M10 20.5a2.2 2.2 0 0 0 4 0" />
    </Svg>
  );
}

const NOTIFY_ROWS = [
  { top: 340.4, h: 70.2, meta: 'Luma · 2m', body: 'Robin Vale sent you a photo', thumb: null, person: true },
  { top: 412.8, h: 80.1, meta: 'Luma · 1h', body: 'Founders Happy Hour is starting at 8:00 PM', thumb: require('../../assets/covers/cover-lanterns.jpg'), person: false },
  { top: 495.0, h: 78.6, meta: 'Luma · 2h', body: 'Nico posted in Summer Rooftop Party', thumb: require('../../assets/covers/cover-clouds.jpg'), person: false },
];

export function NotifyOptInScreen({ onNext }: { onNext: () => void }) {
  return (
    <View style={[styles.root, { backgroundColor: ONB.notifyPage }]}>
      <OnbHeader onSkip={onNext} />
      <IconDisc size={56} bg={ONB.notifyDisc}><BellGlyph /></IconDisc>
      <Text style={styles.title} accessibilityRole="header">Get Notified</Text>
      <Text style={[styles.subtitle, styles.subtitleWide]}>Keep up with event invites, updates, and chats from your friends.</Text>
      <View style={styles.phoneShell} pointerEvents="none">
        <View style={styles.phoneCamera} />
      </View>
      <View style={styles.notifyStack} {...({ 'aria-hidden': true } as object)}>
        {NOTIFY_ROWS.map((r, i) => (
          <View key={r.meta} style={[styles.notifyRow, { top: r.top - 340.4, height: r.h },
            i === 0 && styles.notifyRowFirst, i === NOTIFY_ROWS.length - 1 && styles.notifyRowLast]}>
            <View style={[styles.notifyAvatar, { top: (i === 0 ? 375.5 : r.top + 39.9) - r.top - 18 }]}>
              {r.person
                ? <View style={styles.notifyPerson} />
                : <SparkleIcon size={22} color={colors.ink} />}
            </View>
            <Text style={[styles.notifyMeta, { top: 17.7 + (i === 0 ? 0 : 4.7) }]}>{r.meta}</Text>
            <Text style={[styles.notifyBody, { top: 36.2 + (i === 0 ? 0 : 4.7) }]} numberOfLines={1}>{r.body}</Text>
            {r.thumb && <Image source={r.thumb} style={[styles.notifyThumb, { top: 428.7 - 412.8 }] as object} />}
            <View style={[styles.notifyChevron, { top: (i === 0 ? 375.5 : r.top + 31.7) - r.top - 9 }]}>
              <ChevronDown size={14} color="#606161" />
            </View>
          </View>
        ))}
      </View>
      <PrimaryButton label="Turn On Notifications" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: '100%', backgroundColor: ONB.page, overflow: 'hidden' },
  header: { position: 'absolute', top: 4, left: 8, right: 16.4, height: 48, flexDirection: 'row', alignItems: 'center', zIndex: 2 },
  backBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  skipBtn: { width: 48.4, height: 48, alignItems: 'center', justifyContent: 'center' },
  skipText: { fontSize: 16, fontWeight: '500', color: colors.ink },
  disc: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  title: { position: 'absolute', top: 132.1, left: 16, right: 16, textAlign: 'center', fontSize: 22, lineHeight: 27.3, fontWeight: '600', color: colors.ink, letterSpacing: -0.35 },
  titlePasskey: { top: 152.1, fontSize: 20, lineHeight: 25.1 },
  subtitle: { position: 'absolute', top: 167.4, left: 24, right: 24, textAlign: 'center', fontSize: 15, lineHeight: 20, color: colors.inkSecondary },
  subtitleWide: { left: 24, right: 24 },
  subtitlePasskey: { top: 187.4, fontSize: 14.8, lineHeight: 18.9 },
  field: {
    position: 'absolute', left: 16, width: 361, height: 56, borderRadius: 28, backgroundColor: ONB.field,
    paddingHorizontal: 20, fontSize: 20, color: colors.ink,
    ...({ outlineStyle: 'none' } as object),
  },
  primary: { position: 'absolute', top: 711.8, left: 16, width: 361, height: 50.2, borderRadius: 25.1, alignItems: 'center', justifyContent: 'center' },
  primaryText: { fontSize: 16.3, fontWeight: '500' },
  point: { position: 'absolute', left: 0, right: 16 },
  pointIcon: { position: 'absolute', left: 20, top: 16.8, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  pointTitle: { marginLeft: 56, fontSize: 16, lineHeight: 21.1, fontWeight: '600', color: colors.ink, letterSpacing: -0.35 },
  pointBody: { marginLeft: 56, marginTop: 6.2, fontSize: 14.5, lineHeight: 19.45, color: colors.inkSecondary },
  phoneShell: {
    position: 'absolute', left: 79.3, width: 230.7, top: 261.5, height: 140,
    borderWidth: 8, borderBottomWidth: 0, borderColor: ONB.phoneShell, borderTopLeftRadius: 40, borderTopRightRadius: 40,
    alignItems: 'center',
  },
  phoneCamera: { width: 13, height: 13, borderRadius: 6.5, backgroundColor: ONB.phoneShell, marginTop: 20.7 },
  notifyStack: { position: 'absolute', left: 16, width: 361.4, top: 340.4, height: 233.2 },
  notifyRow: { position: 'absolute', left: 0, right: 0, backgroundColor: '#FFFFFF' },
  notifyRowFirst: { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  notifyRowLast: { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  notifyAvatar: { position: 'absolute', left: 12.7, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F2F2', overflow: 'hidden' },
  notifyPerson: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#C9BCF5' },
  notifyMeta: { position: 'absolute', left: 60.4, fontSize: 12.3, lineHeight: 16.4, color: colors.ink },
  notifyBody: { position: 'absolute', left: 60.4, width: 192.1, fontSize: 12.3, lineHeight: 16.4, color: colors.ink },
  notifyThumb: { position: 'absolute', left: 262.9, width: 48, height: 48, borderRadius: 6 },
  sparkleBand: {
    position: 'absolute', left: 0, right: 0, top: 0, height: 160, overflow: 'hidden',
    ...(Platform.OS === 'web' ? ({ backgroundImage: 'linear-gradient(180deg, #F0F0F0 0px, #FFFFFF 130px)' } as object) : { backgroundColor: '#F7F7F7' }),
  },
  sparkle: { position: 'absolute', width: SPARKLE, height: SPARKLE },
  sparkleFade: {
    position: 'absolute', left: 0, right: 0, top: 132, height: 28,
    ...(Platform.OS === 'web' ? ({ backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0), #FFFFFF)' } as object) : {}),
  },
  setupAvatar: { position: 'absolute', left: 16, top: 108.8, width: 80, height: 80 },
  setupAvatarClip: {
    width: 80, height: 80, borderRadius: 40, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 },
  },
  cameraBadge: {
    position: 'absolute', left: 55, top: 54.9, width: 25.5, height: 25.5, borderRadius: 12.75, backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  setupTitle: { position: 'absolute', left: 16, top: 204.9, fontSize: 22, lineHeight: 27.3, fontWeight: '600', color: colors.ink, letterSpacing: -0.35 },
  setupSubtitle: { position: 'absolute', left: 16, right: 16, top: 236.2, fontSize: 15, lineHeight: 18.9, color: colors.inkSecondary },
  setupLabel: { position: 'absolute', left: 16, fontSize: 17, lineHeight: 21.1, fontWeight: '500', color: ONB.label },
  setupField: {
    position: 'absolute', left: 16, width: 361, backgroundColor: ONB.field, paddingHorizontal: 16,
    fontSize: 16.8, color: colors.ink,
    ...({ outlineStyle: 'none' } as object),
  },
  setupBio: { top: 413.4, height: 75, borderRadius: 24, paddingTop: 14.2, paddingBottom: 14.2, lineHeight: 23.3, textAlignVertical: 'top' },
  notifyChevron: { position: 'absolute', left: 326.4, width: 18, height: 18, borderRadius: 9, backgroundColor: ONB.chevronDisc, alignItems: 'center', justifyContent: 'center' },
});
