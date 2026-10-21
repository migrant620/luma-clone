import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image, StyleSheet,
  Platform, TextInput,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Path, Circle } from 'react-native-svg';
import { colors } from './tokens';
import {
  HomeIcon, DiscoverIcon, HeartIcon, ChatIcon, SettingsGear,
  MapIcon, SearchIcon, ComposeIcon, ClockIcon, PinIcon, ChevronRight, ChevronDown,
  BackArrow, ShareIcon, PlusIcon, CalendarEmptyIcon,
  ImageAddIcon, LocationPinInput, DescriptionIcon, LockIcon,
  GoogleIcon, PasskeyIcon,
  CatFamily, CatTech, CatFood, CatBooks, CatGames, CatAI, CatRunning, CatMusic,
  GearMark, SparkleIcon,
} from './icons';
import { feedEvents, popularEvents, popularEventsNext, categories, detailEvent, detailEvents, accountProfile } from './data';
const loadOnboarding = () => import('./screens/Onboarding');
const loadProfile = () => import('./screens/Profile');
const EmailSignInScreen = React.lazy(() => loadOnboarding().then((m) => ({ default: m.EmailSignInScreen })));
const LinkPhoneScreen = React.lazy(() => loadOnboarding().then((m) => ({ default: m.LinkPhoneScreen })));
const PasskeyPromptScreen = React.lazy(() => loadOnboarding().then((m) => ({ default: m.PasskeyPromptScreen })));
const ProfileSetupScreen = React.lazy(() => loadOnboarding().then((m) => ({ default: m.ProfileSetupScreen })));
const NotifyOptInScreen = React.lazy(() => loadOnboarding().then((m) => ({ default: m.NotifyOptInScreen })));
const ProfileScreen = React.lazy(() => loadProfile().then((m) => ({ default: m.ProfileScreen })));
const PREFETCH_DELAY_MS = 2500;
function prefetchScreens(): void {
  loadOnboarding().catch(() => undefined);
  loadProfile().catch(() => undefined);
}
import { ChatIllustration } from './components/ChatIllustration';
import { extractCoverBackground } from './palette';
import { registerAppFont } from './webfont';
import { VisibleTarget, occluder } from './visibleBox';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const fid = 'luma-font-face';
  if (!document.getElementById(fid)) {
    const style = document.createElement('style');
    style.id = fid;
    style.textContent = `
      html, body, #root {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background: #ffffff;
      }
      html, body, #root, #root * {
        font-family: 'PlusJakartaSans', 'Segoe UI', system-ui, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }
    `;
    document.head.appendChild(style);
  }
  registerAppFont();
}

function StatusBar(_props: { dark?: boolean }) {
  return null;
}

function HomeIndicator(_props: { theme?: 'light' | 'dark' }) {
  return null;
}

type PromoCard = { x: number; y: number; w: number; h: number; cover?: any };
const promoCards: PromoCard[] = [
  { x: 309, y: 84,  w: 134, h: 112 },
  { x: 215, y: 109, w: 131, h: 142 },
  { x: 24,  y: 173, w: 122, h: 133 },
  { x: -30, y: 251, w: 105, h: 161 },
  { x: 161, y: 300, w: 158, h: 172 },
  { x: 284, y: 353, w: 132, h: 129 },
  { x: -30, y: 412, w: 105, h: 123 },
];

const meshBlobs = [
  { cx: 0, cy: 10, w: 275, h: 295, c: 'rgba(255,186,206,0.63)', bl: 106 },
  { cx: 230, cy: 90, w: 230, h: 440, c: 'rgba(255,218,176,0.58)', bl: 111 },
  { cx: 393, cy: 80, w: 140, h: 255, c: 'rgba(138,220,240,0.76)', bl: 67 },
  { cx: 438, cy: 310, w: 245, h: 510, c: 'rgba(158,186,194,0.66)', bl: 113 },
  { cx: -15, cy: 340, w: 285, h: 225, c: 'rgba(200,188,196,0.62)', bl: 111 },
];

function PromoBackground({ revealed = false }: { revealed?: boolean }) {
  const glowCss =
    'radial-gradient(ellipse 105% 58% at 8% 0%, rgba(255,192,210,0.62), transparent 66%),' +
    'radial-gradient(ellipse 120% 62% at 50% 4%, rgba(254,226,192,0.58), transparent 72%),' +
    'radial-gradient(ellipse 88% 48% at 93% 1%, rgba(150,222,240,0.62), transparent 66%),' +
    'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 44%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.95) 74%, #FFFFFF 80%)';
  return (
    <View style={StyleSheet.absoluteFill as any}>
      {Platform.OS === 'web' ? (
        <View style={[StyleSheet.absoluteFill as any, { backgroundColor: '#FFFFFF', overflow: 'hidden' } as any]}>
          {meshBlobs.map((b, i) => (
            <View key={i} style={{
              position: 'absolute',
              left: b.cx - b.w / 2, top: b.cy - b.h / 2,
              width: b.w, height: b.h, borderRadius: 9999,
              backgroundColor: b.c,
              filter: `blur(${b.bl}px)`,
            } as any} />
          ))}
          <View style={[StyleSheet.absoluteFill as any, {
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 54%, rgba(255,255,255,0.55) 62%, #FFFFFF 67%)',
          } as any]} />
        </View>
      ) : (
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill as any}>
          <Defs><SvgGradient id="pgv" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.promoYellow} />
            <Stop offset="0.5" stopColor={colors.promoEnd} />
            <Stop offset="1" stopColor="#FFFFFF" />
          </SvgGradient></Defs>
          <Rect width="100%" height="100%" fill="url(#pgv)" />
        </Svg>
      )}
      {promoCards.map((card, i) => (
        <View key={i} style={{
          position: 'absolute',
          left: card.x, top: card.y,
          width: card.w, height: card.h,
          borderRadius: 10,
          borderWidth: 1.6,
          borderColor: 'rgba(255,255,255,1)',
          backgroundColor: 'rgba(170,170,175,0.03)',
          overflow: 'hidden',
          ...(Platform.OS === 'web' ? {
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          } as any : {}),
        }}>
          <View style={{
            position: 'absolute',
            left: 17, top: 17, right: 17, bottom: 17,
            borderRadius: 6,
            backgroundColor: 'rgba(160,160,165,0.06)',
            ...(Platform.OS === 'web' ? {
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            } as any : {}),
          }}>
            {revealed && card.cover && (
              <Image source={card.cover} style={{ position: 'absolute', width: '100%', height: '100%' } as any}
                resizeMode="cover" />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

function DownArrow({ size = 28, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 5v14M5 12l7 7 7-7" />
    </Svg>
  );
}

function PromoScreen({ onNext, onEmail, initialPanelOpen = false }: { onNext: () => void; onEmail: () => void; initialPanelOpen?: boolean }) {
  const [panelOpen, setPanelOpen] = React.useState(initialPanelOpen);
  const startGradient =
    Platform.OS === 'web'
      ? ({
          backgroundImage:
            'linear-gradient(90deg,#E15EB9 0%,#F65A92 28%,#F8737B 50%,#F9945D 72%,#EFBE59 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        } as any)
      : {};
  const textBlock = (login?: boolean) => (
    <>
      <Text accessibilityLabel="luma" style={[styles.lumaWordmark, login && { color: '#C4C4C5' }]}>luma<Text style={{ color: login ? '#C4C4C5' : colors.inkLight }}>✦</Text></Text>
      <Text style={[styles.delightful, login && { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>Delightful</Text>
      <Text style={[styles.delightful, login && { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>events</Text>
      <Text style={[styles.startHereText, startGradient]}>start here</Text>
    </>
  );
  return (
    <View style={styles.promoRoot}>
      <StatusBar />
      {panelOpen ? (
        <View style={StyleSheet.absoluteFill as any}>
          <Image source={require('../assets/images/login-collage.jpg')} style={styles.loginCovers as any} />
        </View>
      ) : (
        <PromoBackground />
      )}
      {!panelOpen ? (
        <View style={styles.promoContent}>
          <View style={{ flex: 1 }} />
          {textBlock(false)}
          <View style={{ height: 32 }} />
          <View style={styles.downArrowWrap}>
            <TouchableOpacity
              onPress={() => setPanelOpen(true)}
              accessibilityLabel="start here"
              style={styles.downArrow}
            >
              {Platform.OS === 'web' ? (
                <View style={[styles.downArrowInner, {
                  background: `linear-gradient(135deg,${colors.btnStart},${colors.btnEnd})`,
                } as any]}>
                  <DownArrow size={22} />
                </View>
              ) : (
                <View style={[styles.downArrowInner, { backgroundColor: colors.btnStart }]}>
                  <DownArrow size={22} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.loginTextBlock}>
            <Text accessibilityLabel="luma" style={[styles.lumaWordmark, { position: 'absolute', top: -43, left: 0, right: 0, textAlign: 'center', marginBottom: 0, color: '#C4C4C5' }]}>luma<Text style={{ color: '#C4C4C5' }}>✦</Text></Text>
            <Text style={[styles.delightful, { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>Delightful</Text>
            <Text style={[styles.delightful, { color: '#151516' }]} {...({ 'aria-hidden': true } as any)}>events</Text>
            <Text style={[styles.startHereText, startGradient]}>start here</Text>
          </View>
          <Text style={styles.loginHint}>Pssst… the fun starts below</Text>
          <View style={styles.loginSheet}>
            <View style={styles.grabber} accessibilityRole="button" accessibilityLabel="Drag handle" />
            <Text style={styles.loginSub}>
              Discover events, follow calendars and manage events you are going to.
            </Text>
            <TouchableOpacity style={styles.phoneBtn} accessibilityLabel="Continue with Phone" onPress={onNext}>
              <Text style={styles.phoneBtnText}>Continue with Phone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emailBtn} onPress={onEmail}>
              <Text style={styles.emailBtnText}>Continue with Email</Text>
            </TouchableOpacity>
            <View style={styles.oauthRow}>
              <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with Google">
                <GoogleIcon size={31} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.oauthBtn} accessibilityLabel="Sign in with a passkey">
                <PasskeyIcon size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.terms} numberOfLines={1}>
              By continuing, you agree to Luma’s Terms of Use<Text style={styles.termsLink} aria-hidden>Terms of Use</Text>
            </Text>
          </View>
        </>
      )}
      {!panelOpen && (
        <Text style={styles.promoHint} {...({ 'aria-hidden': true } as any)}>Pssst… the fun starts below</Text>
      )}
      <HomeIndicator />
    </View>
  );
}


function HostMark({ kind, size = 14 }: { kind: string; size?: number }) {
  if (kind === 'studio') return <Image source={require('../assets/hosts/mark-studio.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  if (kind === 'ai') return <Image source={require('../assets/hosts/mark-builders.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  if (kind === 'gear') return <View style={{ marginRight: 8 }}><GearMark size={16} bg="#E7EEF5" /></View>;
  if (kind === 'avatars') {
    return <Image source={require('../assets/hosts/host-avatars.png')} style={{ width: 32.4, height: 11.6, marginLeft: 2.5, marginRight: 7, resizeMode: 'contain' } as any} />;
  }
  if (kind === 'white') {
    return <Image source={require('../assets/hosts/host-avatars-gray.png')} style={{ width: 32.4, height: 11.6, marginLeft: 2.5, marginRight: 7, resizeMode: 'contain' } as any} />;
  }
  if (kind === 'book') {
    return <Image source={require('../assets/hosts/mark-readpark.png')} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
  }
  return null;
}

function PopularHostMark({ kind }: { kind: string }) {
  const markSrc = kind === 'coffee' ? require('../assets/hosts/mark-codecoffee.png')
    : kind === 'commons' ? require('../assets/hosts/mark-commons.png')
    : kind === 'builders' ? require('../assets/hosts/mark-builders.png')
    : kind === 'studio' ? require('../assets/hosts/mark-studio.png')
    : require('../assets/hosts/mark-lantern.png');
  return <Image source={markSrc} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
}


const WEEKDAY_TRACK: Record<string, number> = { Tuesday: 0.02, Saturday: 0.02, Monday: -0.063, Friday: 0.1, Sunday: -0.047 };

function ViewAllChevron() {
  return (
    <View style={styles.viewAllChevron}>
      <ChevronRight size={20} color={colors.inkMuted} />
    </View>
  );
}

const DATE_TRACK: Record<string, number> = { 'October 11': -0.07 };

const STICKY_PLATE = 14.2;
const STICKY_PLATE_FIRST = 10;
function stickyPlate(first: boolean) {
  const plate = first ? STICKY_PLATE_FIRST : STICKY_PLATE;
  return { top: STICKY_PLATE - plate, paddingTop: plate, marginTop: (first ? 11.3 : 10.2) - plate };
}

function HomeScreen({ onOpenDetail, onScroll, onProfile }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void; onProfile: () => void }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar onPress={onProfile} />
        <View accessibilityRole="button" accessibilityLabel="luma" style={{ position: 'relative', width: 54, height: 28, marginLeft: -2.25, marginTop: -2.6 }}>
          <Text style={[styles.headerTitle, { position: 'absolute', left: 0, top: 0, transform: [{ scaleX: 0.92 }] }]}>luma</Text>
          <View style={{ position: 'absolute', left: 50, top: 5.8 }}>
            <SparkleIcon size={8.5} color={colors.ink} />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View accessibilityRole="button" accessibilityLabel="Settings" style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/hosts/settings-gear.png')} style={{ width: 19, height: 20.5, resizeMode: 'contain' } as any} />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}
        scrollEventThrottle={16} onScroll={(e: any) => onScroll?.(e.nativeEvent.contentOffset.y)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.viewAll}>View All</Text>
          <ViewAllChevron />
        </View>
        <View style={styles.emptyCard}>
          <Image source={require('../assets/hosts/empty-tile.png')} style={{ width: 64, height: 64, borderRadius: 15 } as any} />
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text style={styles.emptyTitle}>No Upcoming Events</Text>
            <Text style={styles.emptyDesc}>Events you are hosting or going to will show up here.</Text>
          </View>
        </View>

        <Text style={styles.pickedTitle}>Picked for You</Text>
        <TouchableOpacity style={styles.nearbyRow}>
          <Text style={styles.nearbyText}>Nearby</Text>
          <ChevronDown size={22} color={colors.inkMuted} />
        </TouchableOpacity>

        {feedEvents.map((ev, i) => {
          const showDate = i === 0 || feedEvents[i - 1].dateLabel !== ev.dateLabel;
          return (
          <View key={ev.id}>
            {showDate && (
              <View style={[styles.dateDivider, styles.dateSticky, stickyPlate(i === 0)]} {...occluder}>
                <Text style={[styles.dateBold, DATE_TRACK[ev.dateLabel] !== undefined && { letterSpacing: DATE_TRACK[ev.dateLabel] }]}>{ev.dateLabel}</Text>
                <Text style={styles.dateSlash}> / </Text>
                <Text style={[styles.dateDay, { letterSpacing: WEEKDAY_TRACK[ev.dayLabel] ?? 0 }]}>{ev.dayLabel}</Text>
              </View>
            )}
            {!showDate && (
              <View style={{ height: 1, backgroundColor: '#F0F0F1', marginLeft: 108, marginBottom: 0, marginTop: 0 }} />
            )}
            <TouchableOpacity
              style={[styles.feedRow, showDate ? { paddingTop: 8 } : { marginTop: 0, paddingTop: 16, paddingBottom: 16 }]}
              onPress={() => onOpenDetail(ev.id)}
            >
              <Image source={ev.cover} style={styles.feedCover as any} />
              <View
                style={styles.feedBody}
                accessibilityRole="button"
                accessibilityLabel={[ev.title, ev.time, ev.location, ev.price, `By ${ev.host}`].filter(Boolean).join(', ')}
              >
                {ev.hostKind !== 'none' && (
                  <View style={[styles.hostRow, ev.price ? styles.hostRowPriced : null]}>
                    <HostMark kind={ev.hostKind} size={26} />
                    <Text style={[styles.hostName, { flexShrink: 1 }, ev.price ? { marginRight: 50 } : null]} numberOfLines={1}>{ev.host}</Text>
                    {ev.hostKind === 'book' && <Image source={require('../assets/hosts/books.png')} style={{ width: 15, height: 15, marginLeft: 4, resizeMode: 'contain' } as any} />}
                    {ev.price ? (
                      <View style={styles.pricePill}><Text style={styles.priceTag}>{ev.price}</Text></View>
                    ) : null}
                    <View style={{ flex: 1 }} />
                  </View>
                )}
                <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
                {ev.inlineMeta && ev.location ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10.3, flexWrap: 'wrap' }}>
                    <ClockIcon size={14} />
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    <View style={{ width: 16.5 }} />
                    <PinIcon size={14} />
                    <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.metaRow}>
                      <ClockIcon size={14} />
                      <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.time}</Text>
                    </View>
                    {ev.location ? (
                      <View style={[styles.metaRow, { marginTop: 7.8 }]}>
                        <PinIcon size={14} />
                        <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                      </View>
                    ) : null}
                  </>
                )}
                <VisibleTarget accessibilityRole="button" aria-hidden style={styles.feedBodyTarget} />
              </View>
            </TouchableOpacity>
          </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function AccountAvatar({ size, style }: { size: number; style?: any }) {
  return (
    <Image
      source={require('../assets/hosts/avatar-circle.png')}
      style={[{ width: size, height: size, borderRadius: size / 2 }, style] as any}
    />
  );
}
function HeaderAvatar({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity accessibilityRole="button" style={styles.avatarBtn} onPress={onPress} activeOpacity={0.7}>
      <View accessibilityRole="button" accessibilityLabel="Profile" style={[styles.avatar as any, { alignItems: 'center', justifyContent: 'center' }]}>
        <AccountAvatar size={32} />
      </View>
    </TouchableOpacity>
  );
}

const goingAttendees = [
  { initials: 'A', from: '#FFB347', to: '#FF6FA5' },
  { initials: 'B', from: '#7BC4FF', to: '#9B6BFF' },
  { initials: 'C', from: '#FF8FB1', to: '#FFC36B' },
  { initials: 'D', from: '#5FE3C0', to: '#56A8FF' },
];

function GoingAvatars({ names }: { names: string }) {
  const uid = React.useId();
  const initials = names.split(', ').slice(0, goingAttendees.length).map((n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase());
  return (
    <View style={styles.detailGoingRow} {...({ 'aria-hidden': true } as object)}>
      {goingAttendees.map((a, i) => (
        <View key={a.initials} style={[styles.goingAvatar, i > 0 && styles.goingAvatarOverlap]}>
          <Svg width={28} height={28} viewBox="0 0 28 28" style={{ position: 'absolute' } as any}>
            <Defs>
              <SvgGradient id={`${uid}-${i}`} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={a.from} />
                <Stop offset="1" stopColor={a.to} />
              </SvgGradient>
            </Defs>
            <Circle cx="14" cy="14" r="14" fill={`url(#${uid}-${i})`} />
          </Svg>
          <Text style={styles.goingAvatarInitial} {...({ 'aria-hidden': true } as object)}>{initials[i] ?? a.initials}</Text>
        </View>
      ))}
    </View>
  );
}

function TicketPlusIcon({ size = 24, color = '#000000' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M5.5 4.5h13a2.5 2.5 0 0 1 2.5 2.5v2.6a2.4 2.4 0 0 0 0 4.8V17a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17v-2.6a2.4 2.4 0 0 0 0-4.8V7a2.5 2.5 0 0 1 2.5-2.5z"
      />
      <Path d="M12 8.6v6.8M8.6 12h6.8" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}
function EnvelopeIcon({ size = 24, color = '#FFFFFF' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="5" width="18" height="14" rx="3" />
      <Path d="M3.5 6.8 L12 12.6 L20.5 6.8" />
    </Svg>
  );
}
function MoreDotsIcon({ size = 24, color = '#FFFFFF' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Circle cx="6" cy="12" r="2" />
      <Circle cx="12" cy="12" r="2" />
      <Circle cx="18" cy="12" r="2" />
    </Svg>
  );
}

function PopularCard({ ev, cover, onPress, isLast, isFirst }: { ev: any; cover: any; onPress: () => void; isLast?: boolean; isFirst?: boolean }) {
  const coverPad = isFirst ? 18 : 9;
  const bodyPad = isFirst ? 21.4 : 8.7;
  return (
    <View style={styles.popCardWrap}>
      <View style={styles.popCard}>
        <Image source={cover} style={[styles.popCover as any, { marginTop: coverPad }]} resizeMode="cover" />
        {ev && (
          <View
            style={[styles.popCardBody, { marginTop: bodyPad }]}
            pointerEvents="none"
            accessibilityRole="button"
            accessibilityLabel={[ev.title, ev.time, ev.badge?.label, `By ${ev.host}`].filter(Boolean).join(', ')}
          >
            <View style={styles.popHostRow}>
              <PopularHostMark kind={ev.hostMark} />
              <Text style={[styles.popHost, { flex: 1 }]} numberOfLines={1}>{ev.host}</Text>
              {ev.badge && (
                <View style={[styles.badge, { backgroundColor: ev.badge.bg }]}>
                  <Text style={[styles.badgeText, { color: ev.badge.color }]}>{ev.badge.label}</Text>
                </View>
              )}
            </View>
            <Text style={styles.popTitle} numberOfLines={2}>{ev.title}</Text>
            <View style={styles.popTimeRow}>
              <ClockIcon size={14} color={colors.inkMuted} />
              <Text style={styles.popTime}>{ev.time}</Text>
            </View>
          </View>
        )}
        <VisibleTarget accessibilityRole="button" onPress={onPress} style={styles.popCardTarget} />
      </View>
      {!isLast && <View style={styles.popHairline} />}
    </View>
  );
}

const DISCOVER_TRACK = { popular: 0.065, browse: -0.22 };

const DISCOVER_RULES = [590.6, 629.9, 639.0, 678.3];

function DiscoverScreen({ onOpenDetail, onScroll, onProfile }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void; onProfile: () => void }) {
  const catIcons: Record<string, any> = {
    family: <CatFamily />, tech: <CatTech />, food: <CatFood />,
    books: <CatBooks />, games: <CatGames />, ai: <CatAI />, running: <CatRunning />, music: <CatMusic />,
  };
  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar onPress={onProfile} />
        <Text style={styles.screenTitle}>Discover</Text>
        <View style={{ flex: 1 }} />
        <View accessibilityRole="button" accessibilityLabel="Map" style={[styles.headerIconBtn, { marginRight: -4 }]}>
          <MapIcon size={25} color={colors.ink} />
        </View>
        <View accessibilityRole="button" accessibilityLabel="Search" style={styles.headerIconBtn}>
          <SearchIcon size={25} color={colors.ink} />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}
        scrollEventThrottle={16} onScroll={(e: any) => onScroll?.(e.nativeEvent.contentOffset.y)}>
        <View style={styles.discCityRow}>
          <View style={{ paddingTop: 0.55 }}>
            <Text style={styles.discCity}>San Francisco</Text>
            <Text style={[styles.discPopular, { letterSpacing: DISCOVER_TRACK.popular }]}>Popular Events</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.viewAll}>View All</Text>
          <ViewAllChevron />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularGrid}
          contentContainerStyle={{ paddingLeft: 0 }}>
          <View style={styles.popularColumn}>
            {popularEvents.map((ev, i) => (
              <PopularCard key={ev.id} ev={ev} cover={ev.cover} isFirst={i === 0} isLast={i === popularEvents.length - 1} onPress={() => onOpenDetail(ev.id)} />
            ))}
          </View>
          <View style={styles.popularColumn}>
            {popularEventsNext.map((ev, i) => (
              <PopularCard key={ev.id} ev={ev} cover={ev.cover} isFirst={i === 0} isLast={i === popularEventsNext.length - 1} onPress={() => onOpenDetail(ev.id)} />
            ))}
          </View>
        </ScrollView>

        <Text style={[styles.browseTitle, { letterSpacing: DISCOVER_TRACK.browse }]}>Browse by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row1.map((cat) => (
            <View key={cat.id} style={styles.catChip}>
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
              <VisibleTarget accessibilityRole="button" style={styles.catChipTarget} />
            </View>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow2}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row2.map((cat) => (
            <View key={cat.id} style={styles.catChip}>
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
              <VisibleTarget accessibilityRole="button" style={styles.catChipTarget} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.citiesRow}>
          <Text style={styles.discCities}>Cities</Text>
          <View style={{ flex: 1 }} />
          <View style={styles.citiesMore} accessibilityRole="button">
            <ChevronRight size={17} color={colors.inkMuted} />
          </View>
        </View>
      </ScrollView>
      {DISCOVER_RULES.map((top) => (
        <View key={top} style={[styles.hairline, { top, left: 23.7 }]} pointerEvents="none" />
      ))}
    </View>
  );
}

const ACTION_LABEL_TRACK = { register: -0.07, contact: -0.3, more: -0.15 };

const DETAIL_TITLE_PIN_Y = 472.8;

function DetailScreen({ eventId, onBack }: { eventId: string | null; onBack: () => void }) {
  const ev = (eventId && detailEvents[eventId]) || detailEvent;
  const [pinned, setPinned] = React.useState(false);
  const [sheet, setSheet] = React.useState<DetailSheetKind | null>(null);
  const [bgCss, setBgCss] = React.useState<string | null>(null);
  React.useEffect(() => {
    let alive = true;
    extractCoverBackground(ev.cover).then((css) => {
      if (alive && css) setBgCss(css);
    });
    return () => {
      alive = false;
    };
  }, [ev.cover]);
  return (
    <View style={[styles.detailRoot, bgCss ? ({ background: bgCss } as any) : null]}>
      <View style={styles.detailStatusWrap}><StatusBar dark /></View>
      <View style={styles.detailNav}>
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Back" onPress={onBack}>
          <BackArrow size={26} color="#fff" />
        </TouchableOpacity>
        {pinned && (
          <Text numberOfLines={1} style={styles.detailPinnedTitle}>{ev.title}</Text>
        )}
        <TouchableOpacity style={styles.detailNavBtn} accessibilityLabel="Share">
          <ShareIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.detailScroll} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}
        onScroll={(e: any) => setPinned(e.nativeEvent.contentOffset.y > DETAIL_TITLE_PIN_Y)} scrollEventThrottle={16}>
        <View style={styles.detailCoverWrap}>
          <Image source={ev.cover} style={styles.detailCover as any} resizeMode="cover" />
          <View style={styles.detailFeatured}>
            <Text style={styles.detailFeaturedText}>Featured in San Francisco</Text>
          </View>
        </View>
        <View style={styles.detailBody}>
          <Text style={[styles.detailTitle, pinned && styles.detailTitleGone]}>{ev.title}</Text>
          <View style={styles.detailHostRow}>
            <Image source={ev.hostMark} style={{ width: 16, height: 16, borderRadius: 4, resizeMode: 'cover' } as any} />
            <Text style={styles.detailHost}>{ev.host}</Text>
            <ChevronRight size={18} color={colors.detailMuted} />
          </View>
          <Text style={styles.detailTime}>{ev.time}</Text>
          {ev.spotsLeft !== undefined && (
            <View style={styles.detailSpotsRow}>
              <HourglassIcon />
              <Text style={styles.detailSpots}>{`${ev.spotsLeft} Spots Left`}</Text>
            </View>
          )}

          <View style={styles.detailActions}>
            <TouchableOpacity style={[styles.detailAction, styles.detailActionPrimary]} accessibilityLabel="Register" activeOpacity={0.8} onPress={() => setSheet('register')}>
              <TicketPlusIcon size={24} color="#000000" />
              <Text style={[styles.detailActionLabel, styles.detailActionLabelPrimary, { letterSpacing: ACTION_LABEL_TRACK.register }]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="Contact" activeOpacity={0.8}>
              <EnvelopeIcon size={24} color={colors.detailSoft} />
              <Text style={[styles.detailActionLabel, { letterSpacing: ACTION_LABEL_TRACK.contact }]}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="More" activeOpacity={0.8} onPress={() => setSheet('more')}>
              <MoreDotsIcon size={24} color={colors.detailSoft} />
              <Text style={[styles.detailActionLabel, { letterSpacing: ACTION_LABEL_TRACK.more }]}>More</Text>
            </TouchableOpacity>
          </View>
          {ev.accessCode && (
            <TouchableOpacity style={styles.detailAccessRow} accessibilityRole="button" activeOpacity={0.7} onPress={() => setSheet('register')}>
              <LockOpenIcon />
              <Text style={styles.detailAccessText}>Have an access code?</Text>
            </TouchableOpacity>
          )}

          <Text style={[styles.detailSection, ev.accessCode ? styles.detailSectionAfterAccess : styles.detailSectionFirst]}>Location</Text>
          <View style={styles.detailDivider} />
          {ev.gated ? (
            <>
              <View style={styles.detailGatedRow}>
                <Text style={[styles.detailLocation, { flex: 1 }]}>Register to See Location</Text>
                <View accessibilityLabel={ev.gated.weather} accessibilityRole="image" style={styles.detailWeatherIcon}><CloudIcon /></View>
              </View>
              <View style={styles.detailGatedRow}>
                <Text style={[styles.detailAddress, { flex: 1 }]}>{ev.gated.area}</Text>
                <Text style={[styles.detailAddress, styles.detailTemp]}>{ev.gated.temp}</Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.detailLocation}>{ev.location}</Text>
              <Text style={styles.detailAddress}>{ev.address}</Text>
            </>
          )}
          <View style={styles.detailMap} accessibilityRole="button" accessibilityLabel="Map">
            <View style={[styles.mapBlock, { left: '4%', top: '4%', width: '20%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '32%', top: '4%', width: '22%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '4%', width: '32%', height: '28%' }]} />
            <View style={[styles.mapBlock, { left: '4%', top: '44%', width: '20%', height: '22%' }]} />
            <View style={[styles.mapPark, { left: '32%', top: '44%', width: '22%', height: '22%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '44%', width: '32%', height: '22%' }]} />
            <View style={[styles.mapBlock, { left: '4%', top: '76%', width: '20%', height: '20%' }]} />
            <View style={[styles.mapBlock, { left: '32%', top: '76%', width: '22%', height: '20%' }]} />
            <View style={[styles.mapBlock, { left: '64%', top: '76%', width: '32%', height: '20%' }]} />
            <View style={[styles.mapRoad, { top: '12%', height: 6 }]} />
            <View style={[styles.mapRoad, { top: '38%', height: 9 }]} />
            <View style={[styles.mapRoad, { top: '70%', height: 5, opacity: 0.7 }]} />
            <View style={[styles.mapRoad, { left: '28%', width: 6, height: '100%' }]} />
            <View style={[styles.mapRoad, { left: '58%', width: 8, height: '100%' }]} />
            <View style={[styles.mapRoad, { left: '82%', width: 6, height: '100%' }]} />
            <View style={styles.mapPin}>
              <View style={styles.mapPinHead} />
              <View style={styles.mapPinTip} />
            </View>
            <Text style={styles.mapLabel} {...({ 'aria-hidden': true } as any)}>{ev.gated ? ev.gated.area : ev.location}</Text>
          </View>

          <View style={styles.detailHostHead}>
            <Text style={styles.detailSectionInline}>Host</Text>
            <TouchableOpacity accessibilityRole="button" style={styles.detailHostContactBtn} activeOpacity={0.8}>
              <Text style={styles.detailHostContact}>Contact</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailDividerTight} />
          <View style={styles.detailSpeakerRow}>
            <Image source={require('../assets/hosts/avatar.png')} style={styles.detailSpeakerAvatar as any} />
            <View style={{ flex: 1 }}>
              <Text style={styles.detailSpeakerName}>{ev.speaker}</Text>
              <Text style={styles.detailSpeakerRole}>{ev.speakerRole}</Text>
            </View>
          </View>

          <Text style={[styles.detailSection, styles.detailSectionGoing]}>{`${ev.going} Going`}</Text>
          <View style={styles.detailDivider} />
          <GoingAvatars names={ev.goingNames} />
          <Text style={styles.detailGoingNames}>{ev.goingNames}</Text>

          <Text style={[styles.detailSection, styles.detailSectionAbout]}>About Event</Text>
          <View style={styles.detailDivider} />
          {ev.aboutImage !== false && (
            <View style={styles.detailAboutMedia} accessibilityRole="button">
              <View style={styles.detailAboutImage} accessibilityRole="button" accessibilityLabel="Image">
                <Image source={ev.cover} style={styles.detailAboutImageFill as any} resizeMode="cover" />
              </View>
            </View>
          )}
          <Text style={styles.detailAbout}>{ev.about}</Text>
          {ev.agenda && (
            <>
              <Text style={styles.detailAgendaHeading} accessibilityRole="header">Event Details</Text>
              {ev.agenda.map((line) => (
                <View key={line} style={styles.detailAgendaRow}>
                  <Text style={styles.detailAgendaDot} {...({ 'aria-hidden': true } as object)}>•</Text>
                  <Text style={styles.detailAgendaText}>{line}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
      <HomeIndicator theme="dark" />
      {sheet && <DetailSheet kind={sheet} onClose={() => setSheet(null)} />}
    </View>
  );
}

function HourglassIcon({ color = '#F6DC8C' }: { color?: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3.6 1.4h8.8M3.6 14.6h8.8M4.6 1.4c0 3.4 3.4 4.6 3.4 6.6s-3.4 3.2-3.4 6.6M11.4 1.4c0 3.4-3.4 4.6-3.4 6.6s3.4 3.2 3.4 6.6" />
    </Svg>
  );
}

function LockOpenIcon({ color = 'rgba(255,255,255,0.6)' }: { color?: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3.2 8.2h9.6a1.2 1.2 0 0 1 1.2 1.2v4.2a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 13.6V9.4a1.2 1.2 0 0 1 1.2-1.2z" />
      <Path d="M4.6 8.2V5.3a3.3 3.3 0 0 1 6.4-1.2" />
    </Svg>
  );
}

function CloudIcon({ color = '#FFFFFF' }: { color?: string }) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round">
      <Path d="M6 16.8h9.6a3.8 3.8 0 0 0 .5-7.6A5.2 5.2 0 0 0 6.3 8.1 4.4 4.4 0 0 0 6 16.8z" />
    </Svg>
  );
}

type DetailSheetKind = 'register' | 'more';

function DetailSheet({ kind, onClose }: { kind: DetailSheetKind; onClose: () => void }) {
  return (
    <View style={styles.sheetLayer} accessibilityViewIsModal={true}>
      <TouchableOpacity style={styles.sheetScrim} accessibilityLabel="Close" activeOpacity={1} onPress={onClose} />
      <View style={styles.sheetPanel} accessibilityRole={'dialog' as any}>
        <View style={styles.sheetGrabber} />
        {kind === 'register' ? (
          <>
            <Text style={styles.sheetHeading}>Registration</Text>
            <View style={styles.sheetNotice}>
              <View style={styles.sheetNoticeIcon}><LockIcon size={20} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sheetNoticeTitle}>Approval Required</Text>
                <Text style={styles.sheetNoticeBody}>Your registration is subject to host approval.</Text>
              </View>
            </View>
            <Text style={styles.sheetBody}>Welcome! To join the event, please register below.</Text>
            <TouchableOpacity style={styles.sheetPrimaryBtn} accessibilityRole="button" activeOpacity={0.85} onPress={onClose}>
              <Text style={styles.sheetPrimaryText}>Request to Join</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.sheetRow} accessibilityRole="button" activeOpacity={0.7} onPress={onClose}>
              <Text style={styles.sheetRowText}>Contact the Host</Text>
            </TouchableOpacity>
            <View style={styles.sheetRule} />
            <TouchableOpacity style={styles.sheetRow} accessibilityRole="button" activeOpacity={0.7} onPress={onClose}>
              <Text style={styles.sheetRowText}>Report Event</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

function HistoryIcon({ size = 18, color = '#A1A1A2' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
      />
    </Svg>
  );
}

function DollarIcon({ size = 18, color = '#C4C4C4' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <Path d="M12 2.5v19M16.8 7.2c0-1.9-2.1-3.1-4.8-3.1s-4.8 1.3-4.8 3.4c0 4.8 9.6 2.7 9.6 7.6 0 2.1-2.1 3.6-4.8 3.6s-4.8-1.4-4.8-3.3" />
    </Svg>
  );
}

function ClearCircleIcon({ size = 15, color = '#B7B8B9' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="12" fill={color} />
      <Path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="#FFFFFF" strokeWidth={2.6} strokeLinecap="round" />
    </Svg>
  );
}

const galleryCats = [
  { id: 'suggested', label: 'Suggested', track: 0.09, icon: <SparkleIcon size={17} color="#151516" /> },
  { id: 'school', label: 'School', track: 0.2, icon: <CatTech size={17} color="#8E8E93" /> },
  { id: 'halloween', label: 'Halloween', track: 0.26, icon: <CatGames size={17} color="#8E8E93" /> },
  { id: 'thanksgiving', label: 'Thanksgiving', track: 0.52, icon: <CatFood size={17} color="#8E8E93" /> },
];

const galleryTiles = [
  { label: 'Halloween', cover: require('../assets/covers/card-halloween.jpg'), cats: ['suggested', 'halloween'] },
  { label: 'Thanksgiving', cover: require('../assets/covers/card-thanks.jpg'), cats: ['suggested', 'thanksgiving'] },
  { label: 'Invitation', cover: require('../assets/covers/card-invite.jpg'), cats: ['suggested', 'school'] },
  { label: 'Birthday', cover: require('../assets/covers/card-birthday.jpg'), cats: ['suggested', 'school'] },
];

const GALLERY_LOAD_MS = 650;

function GallerySkeleton() {
  return (
    <View {...({ 'aria-busy': true } as object)} accessibilityLabel="Loading covers">
      <View style={[styles.galleryHero, styles.skelHero]}>
        <View style={[styles.skelBar, { left: 16.4, top: 18.8, width: 102.2, height: 15 }]} />
        <View style={[styles.skelBar, { left: 16.4, top: 41.2, width: 15.3, height: 11 }]} />
      </View>
      <View style={styles.galleryGrid}>
        {[0, 1, 2, 3].map((k) => (
          <View key={k} style={[styles.galleryTile, styles.skelTile]}>
            <View style={styles.skelTileImg} />
            <View style={styles.galleryTileLabelWrap}>
              <View style={[styles.skelBar, { position: 'relative', width: 70.9, height: 13 }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function pickImageFromLibrary(onPicked: (uri: string) => void) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files && input.files[0];
    if (file) onPicked(URL.createObjectURL(file));
  };
  input.click();
}

function CoverGallery({ onBack, onPick }: { onBack: () => void; onPick: (cover: any) => void }) {
  const [active, setActive] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!loading) return undefined;
    const t = setTimeout(() => setLoading(false), GALLERY_LOAD_MS);
    return () => clearTimeout(t);
  }, [loading, active]);
  const cat = galleryCats[active];
  const tiles = galleryTiles.filter((t) => t.cats.includes(cat.id));
  const selectCat = (i: number) => {
    if (i === active) return;
    setActive(i);
    setLoading(true);
  };
  const heroTitle = active === 0 ? 'School' : cat.label;
  const heroCount = active === 0 ? '21 Images' : `${tiles.length} ${tiles.length === 1 ? 'Image' : 'Images'}`;
  return (
    <View style={styles.galleryRoot} accessibilityRole={'dialog' as any} accessibilityViewIsModal={true}>
      <StatusBar />
      <View style={styles.gallerySearchRow}>
        <TouchableOpacity accessibilityLabel="Back" onPress={onBack} style={styles.galleryBack} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
        <View style={styles.gallerySearchBox}>
          <Text style={styles.gallerySearchPlaceholder}>Search cover images…</Text>
        </View>
      </View>
      <View style={styles.galleryCats}>
        {galleryCats.map((c, i) => (
          <TouchableOpacity
            key={c.id}
            style={styles.galleryCat}
            onPress={() => selectCat(i)}
            activeOpacity={0.7}
            accessibilityRole={'tab' as any}
            accessibilityState={{ selected: i === active }}
          >
            {React.cloneElement(c.icon, { color: i === active ? '#151516' : '#8E8E93' })}
            <Text style={[styles.galleryCatLabel, { letterSpacing: (c as any).track }, i === active && styles.galleryCatActive]}>{c.label}</Text>
            {i === active && <View style={styles.galleryCatUnderline} />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.galleryScrollbar} {...({ tabIndex: 0 } as any)} />
      <ScrollView style={styles.galleryScroll} contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        {loading ? <GallerySkeleton /> : (
        <>
        <View style={styles.galleryHero}>
          <Text style={styles.galleryHeroTitle}>{heroTitle}</Text>
          <Text style={styles.galleryHeroCount}>{heroCount}</Text>
          <Image source={require('../assets/covers/card-halloween.jpg')} style={styles.galleryHeroCardA as any} />
          <Image source={require('../assets/covers/card-birthday.jpg')} style={styles.galleryHeroCardB as any} />
        </View>
        <View style={styles.galleryGrid}>
          {tiles.map((t) => (
            <View key={t.label} style={styles.galleryTile}>
              <Image source={t.cover} style={styles.galleryTileImg as any} resizeMode="cover" />
              <View style={styles.galleryTileLabelWrap} {...({ 'aria-hidden': true } as any)}>
                <Text style={styles.galleryTileLabel}>{t.label}</Text>
              </View>
              <VisibleTarget accessibilityRole="button" accessibilityLabel={`${t.label} cover`} onPress={() => onPick(t.cover)} />
            </View>
          ))}
        </View>
        </>
        )}
      </ScrollView>
      <View style={[styles.hairline, { top: 698.7 }]} pointerEvents="none" />
      <View style={styles.galleryFooter}>
        <TouchableOpacity style={styles.galleryChooseBtn} accessibilityLabel="Choose From Library" onPress={() => pickImageFromLibrary((uri) => onPick({ uri }))}>
          <Text style={styles.galleryChooseText}>Choose From Library</Text>
        </TouchableOpacity>
      </View>
      <HomeIndicator />
    </View>
  );
}

function CreateScreen({ onBack }: { onBack: () => void }) {
  const [approval, setApproval] = React.useState(false);
  const [draftPrompt, setDraftPrompt] = React.useState(true);
  const [eventName, setEventName] = React.useState('');
  const [gallery, setGallery] = React.useState(false);
  const [cover, setCover] = React.useState<any>(null);
  if (gallery) return <CoverGallery onBack={() => setGallery(false)} onPick={(c) => { setCover(c); setGallery(false); }} />;
  return (
    <View style={styles.createRoot}>
      <StatusBar />
      <View style={styles.createHeader}>
        <TouchableOpacity accessibilityLabel="Back" onPress={onBack} style={styles.iconBtn48} activeOpacity={0.7}>
          <BackArrow size={26} color={colors.ink} />
        </TouchableOpacity>
        <Text style={styles.createTitle}>Create Event</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.createAvatarGroup} accessibilityRole="button">
          <AccountAvatar size={28} style={{ pointerEvents: 'none' }} />
          <View style={styles.createAvatarTarget} accessibilityRole="button" accessibilityLabel={accountProfile.name} />
          <View style={styles.createAvatarChevron}><ChevronDown size={19.2} color="#BEBEBF" /></View>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        {draftPrompt && (
        <View style={styles.restorePill}>
          <View style={styles.restorePillFill} pointerEvents="none" />
          <View style={styles.restoreClock}><HistoryIcon size={18} color={colors.inkMuted} /></View>
          <Text style={styles.restoreText} numberOfLines={1}>Restore draft?</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.restoreClose} activeOpacity={0.7} onPress={() => setDraftPrompt(false)}>
            <View style={styles.restoreCloseGlyph}><ClearCircleIcon size={15} /></View>
          </TouchableOpacity>
        </View>
        )}
        <TouchableOpacity
          style={styles.coverUpload}
          accessibilityRole="button"
          accessibilityLabel="Change cover"
          onPress={() => setGallery(true)}
          activeOpacity={0.9}
        >
          {cover && <Image source={cover} style={styles.coverChosen as any} resizeMode="cover" />}
          <TouchableOpacity style={styles.coverUploadBtn} accessibilityRole="button" onPress={() => setGallery(true)} activeOpacity={0.85}>
            <ImageAddIcon size={22} color="#222324" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.inputField}>
          {eventName === '' && (
            <Text style={styles.eventNameHint} pointerEvents="none">Event Name</Text>
          )}
          <TextInput
            value={eventName}
            onChangeText={setEventName}
            accessibilityLabel="Event Name"
            style={styles.eventNameInput}
            maxLength={140}
            returnKeyType="done"
          />
        </View>
        <View style={styles.timeCard}>
          <View style={styles.timeCardRule} pointerEvents="none" />
          <View style={styles.timeLineRow}>
            <View style={styles.timelineCol}>
              <View style={styles.timeDotFilled} />
              <View style={styles.timelineDashed} />
              <View style={styles.timeDotHollow} />
            </View>
            <Text style={styles.timeLabelStart}>Start</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity accessibilityRole="button" style={styles.datePill} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>Sun, Sep 20</Text></View></TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.timePillA} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>12:00 AM</Text></View></TouchableOpacity>
          </View>
          <View style={styles.timeLineRow}>
            <View style={styles.timelineCol}>
              <View style={styles.timeDotHollow} />
            </View>
            <Text style={styles.timeLabelEnd}>End</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity accessibilityRole="button" style={styles.datePillEnd} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>Sun, Sep 20</Text></View></TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.timePillB} activeOpacity={0.8}><View style={styles.pillBox}><Text style={styles.pillText}>1:00 AM</Text></View></TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowCard}>
          <LocationPinInput size={22} />
          <Text style={styles.rowLabelLocation}>Choose Location</Text>
        </View>
        <View style={styles.rowCardTall}>
          <DescriptionIcon size={22} />
          <Text style={styles.rowLabelDesc}>Add Description</Text>
        </View>

        <View style={styles.ticketingDivider} />
        <Text style={styles.ticketingTitle}>Ticketing</Text>
        <View style={styles.ticketCard}>
          <View style={styles.approvalRow}>
            <View style={styles.ticketIcon}><LockIcon size={20} color="#C4C4C4" /></View>
            <Text style={styles.rowLabelApproval}>Require Approval</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={() => setApproval(!approval)}
              activeOpacity={0.8}
              style={[styles.toggle, approval && styles.toggleOn]}
              accessibilityRole="switch"
              accessibilityLabel="Require Approval"
              aria-checked={approval}
            >
              <View style={[styles.toggleThumb, approval && styles.toggleThumbOn]} />
            </TouchableOpacity>
          </View>
          <View style={styles.ticketRule} />
          <View style={styles.priceRow}>
            <View style={styles.ticketIcon}><DollarIcon size={18} color="#C4C4C4" /></View>
            <Text style={styles.rowLabelPrice}>Price</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.priceValue}>Free</Text>
            <View style={styles.priceChevron}><ChevronRight size={18} color="#C4C4C4" /></View>
          </View>
        </View>
      </ScrollView>
      <HomeIndicator />
    </View>
  );
}

function EmptyScreen({ title, desc, notif = false, chat = false, onProfile }: { title: string; desc: string; notif?: boolean; chat?: boolean; onProfile: () => void }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar onPress={onProfile} />
        <Text style={[styles.screenTitle, notif && { letterSpacing: -0.145 }]}>{title}</Text>
        <View style={{ flex: 1 }} />
        {chat && (
          <View accessibilityRole="button" accessibilityLabel="New Chat" style={[styles.headerIconBtn, { marginRight: 4 }]}>
            <ComposeIcon size={25} color={colors.ink} />
          </View>
        )}
      </View>
      <View style={styles.emptyStateWrap}>
        {notif ? (
          <Image source={require('../assets/covers/notif-invites.png')} style={styles.notifIllustration as any} resizeMode="contain" />
        ) : (
          <ChatIllustration />
        )}
        <Text style={styles.bigEmptyTitle}>{notif ? 'No Notifications' : 'It’s Quiet Here'}</Text>
        <Text style={styles.bigEmptyDesc}>{desc}</Text>
        {chat && (
          <TouchableOpacity style={styles.startChatBtn} accessibilityRole="button" accessibilityLabel="Start Chat" activeOpacity={0.85}>
            <Text style={styles.startChatText}>Start Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const TAB_LABEL_WEIGHT = '600' as const;
const TAB_LABEL_TRACK = { home: -0.39, discover: -0.115, notif: -0.19, chat: -0.19 };
const TAB_FRAME_W = 393;
const tabs = [
  { id: 'home', label: 'Home', icon: HomeIcon, x: 0, w: 92.1, track: TAB_LABEL_TRACK.home },
  { id: 'discover', label: 'Discover', icon: DiscoverIcon, x: 100.1, w: 92.1, track: TAB_LABEL_TRACK.discover },
  { id: 'notif', label: 'Notifications', icon: HeartIcon, x: 200.1, w: 92.4, track: TAB_LABEL_TRACK.notif },
  { id: 'chat', label: 'Chat', icon: ChatIcon, x: 300.6, w: 92.4, track: TAB_LABEL_TRACK.chat },
];
const pct = (v: number) => `${(v / TAB_FRAME_W) * 100}%` as `${number}%`;

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarFill} {...occluder} />
      {tabs.map((t) => {
        const I = t.icon;
        const isActive = active === t.id;
        return (
          <TouchableOpacity key={t.id} style={[styles.tabItem, { left: pct(t.x), width: pct(t.w) }]} onPress={() => onChange(t.id)} activeOpacity={0.7} accessibilityLabel={t.label}>
            <View style={[styles.tabIconWrap, isActive && styles.tabPillActive]}>
              <I size={24} color={isActive ? colors.ink : colors.inkSecondary} filled={isActive} />
            </View>
            <Text style={[styles.tabLabel, { color: isActive ? colors.ink : colors.inkSecondary, letterSpacing: t.track }]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

type Screen = 'promo' | 'login' | 'email' | 'linkPhone' | 'passkey' | 'profileSetup' | 'notifyOptIn' | 'main' | 'detail' | 'create' | 'profile';

export default function App() {
  const [screen, setScreen] = React.useState<Screen>('promo');
  const [tab, setTab] = React.useState('home');
  const [detailId, setDetailId] = React.useState<string | null>(null);
  const openDetail = React.useCallback((id: string) => {
    setDetailId(id);
    setScreen('detail');
  }, []);
  const [fabCollapsed, setFabCollapsed] = React.useState(false);
  const lastY = React.useRef(0);
  const onScroll = (y: number) => {
    const delta = y - lastY.current;
    if (y > 260 && delta > 6) setFabCollapsed(true);
    else if (delta < -6 || y < 120) setFabCollapsed(false);
    lastY.current = y;
  };

  React.useEffect(() => {
    const t = setTimeout(prefetchScreens, PREFETCH_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  if (screen === 'promo' || screen === 'login') {
    return <PromoScreen key={screen} initialPanelOpen={screen === 'login'} onNext={() => setScreen('main')} onEmail={() => setScreen('email')} />;
  }
  const deferred = (node: React.ReactNode) => <React.Suspense fallback={<View style={styles.screenRoot} />}>{node}</React.Suspense>;
  if (screen === 'email') return deferred(<EmailSignInScreen onBack={() => setScreen('login')} onNext={() => setScreen('linkPhone')} />);
  if (screen === 'linkPhone') return deferred(<LinkPhoneScreen onNext={() => setScreen('passkey')} />);
  if (screen === 'passkey') return deferred(<PasskeyPromptScreen onNext={() => setScreen('profileSetup')} />);
  if (screen === 'profileSetup') {
    return deferred(<ProfileSetupScreen name={accountProfile.name} avatar={<AccountAvatar size={80} />} onNext={() => setScreen('notifyOptIn')} />);
  }
  if (screen === 'notifyOptIn') return deferred(<NotifyOptInScreen onNext={() => setScreen('main')} />);
  if (screen === 'detail') return <DetailScreen eventId={detailId} onBack={() => setScreen('main')} />;
  if (screen === 'create') return <CreateScreen onBack={() => setScreen('main')} />;
  if (screen === 'profile') return deferred(<ProfileScreen onBack={() => setScreen('main')} avatar={<AccountAvatar size={80} />} />);
  const openProfile = () => setScreen('profile');

  return (
    <View style={styles.appRoot}>
      {tab === 'home' && <HomeScreen onOpenDetail={openDetail} onScroll={onScroll} onProfile={openProfile} />}
      {tab === 'discover' && <DiscoverScreen onOpenDetail={openDetail} onScroll={onScroll} onProfile={openProfile} />}
      {tab === 'notif' && <EmptyScreen title="Notifications" desc="Notifications about your events and friends will show up here." notif onProfile={openProfile} />}
      {tab === 'chat' && <EmptyScreen title="Chat" desc="Start a chat with your friends or others in your event." chat onProfile={openProfile} />}
      <TabBar active={tab} onChange={(t) => { setTab(t); setFabCollapsed(false); lastY.current = 0; }} />
      {tab === 'home' && (
        <TouchableOpacity
          style={fabCollapsed ? styles.createFabSmall : styles.createFab}
          accessibilityLabel="Create Event" onPress={() => setScreen('create')} activeOpacity={0.85}>
          <PlusIcon size={24} color="#6B6B6C" />
          {!fabCollapsed && <Text style={styles.createFabText}>Create Event</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appRoot: { flex: 1, backgroundColor: colors.white, maxWidth: 480, alignSelf: 'center', width: '100%', height: '100%', overflow: 'hidden' },
  hairline: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: colors.divider },
  screenRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
  scroll: { flex: 1 },

  promoRoot: { flex: 1, height: '100%', backgroundColor: '#FFFFFF', overflow: 'hidden' },
  promoContent: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-end',
    paddingBottom: 74.5, zIndex: 2, paddingHorizontal: 24,
  },
  lumaWordmark: { fontSize: 32, color: colors.inkLight, fontWeight: '400', letterSpacing: 0.5, marginBottom: 20 },
  delightful: { fontSize: 36, color: '#4C4B4C', fontWeight: '600', lineHeight: 42, textAlign: 'center' },
  startHereText: { fontSize: 36, fontWeight: '700', lineHeight: 42, textAlign: 'center' },
  downArrowWrap: { position: 'absolute', left: 0, right: 0, bottom: 23.1, alignItems: 'center' },
  downArrow: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  downArrowInner: {
    width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#F65991', shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 6 },
  },
  promoHint: { position: 'absolute', left: 0, right: 0, bottom: 96, zIndex: 3, textAlign: 'center', fontSize: 13.2, lineHeight: 16.4, color: '#F7F7F7' },
  loginHint: { position: 'absolute', left: 0, right: 0, top: 201.6, zIndex: 3, textAlign: 'center', fontSize: 13.2, lineHeight: 16.4, color: '#F7F7F7' },

  loginCovers: { position: 'absolute', top: -49.5, left: 0, width: 393, height: 242 },
  loginTextBlock: { position: 'absolute', top: 298, left: 0, right: 0, alignItems: 'center', zIndex: 2 },
  loginSheet: {
    position: 'absolute', top: 470, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28,
  },
  grabber: { position: 'absolute', top: -13, width: 40, height: 4, backgroundColor: '#DCDCE0', borderRadius: 2, alignSelf: 'center' },
  loginSub: { position: 'absolute', top: 23.4, left: 32, right: 32, fontSize: 15, color: '#737373', textAlign: 'center', lineHeight: 19.45, fontWeight: '400', letterSpacing: -0.18 },
  phoneBtn: { position: 'absolute', top: 82.4, left: 16, right: 16, height: 50.2, paddingHorizontal: 12, backgroundColor: colors.btnBlack, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  phoneBtnText: { width: '100%', textAlign: 'center', color: '#fff', fontSize: 16.3, fontWeight: '500', lineHeight: 23.3 },
  emailBtn: { position: 'absolute', top: 140.6, left: 16, right: 16, height: 50.2, paddingHorizontal: 12, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emailBtnText: { width: '100%', textAlign: 'center', color: colors.ink, fontSize: 16.3, fontWeight: '500', lineHeight: 23.3 },
  oauthRow: { position: 'absolute', top: 198.8, left: 16, right: 16, height: 50.2, flexDirection: 'row', gap: 12 },
  oauthBtn: { flex: 1, height: 50.2, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  terms: { position: 'absolute', top: 269.1, left: 0, right: 0, fontSize: 11.8, color: colors.inkMuted, textAlign: 'center', fontWeight: '400' },
  termsLink: { position: 'absolute' as const, right: 63.7, top: 0, color: '#151516' },

  homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 4, paddingBottom: 0, gap: 8, backgroundColor: colors.white },
  avatarBtn: { width: 48, height: 48, marginLeft: -4, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.ink },
  screenTitle: { fontSize: 21, fontWeight: '700', color: colors.ink, letterSpacing: -0.23 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25.1, letterSpacing: 0.07 },
  viewAll: { fontSize: 16, color: colors.inkMuted, fontWeight: '400', flexDirection: 'row', lineHeight: 21.1, letterSpacing: 0.21, alignSelf: 'flex-start', marginTop: 3 },
  pickedTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 24.5 },

  viewAllChevron: { alignSelf: 'flex-start', marginTop: 3.5, marginLeft: 2.05, marginRight: -1.95 },

  emptyCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 16.9, gap: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: colors.inkMuted, letterSpacing: -0.105 },
  emptyDesc: { fontSize: 14, color: colors.inkMuted, marginTop: 6.2, lineHeight: 19.45 },

  nearbyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 3.3 },
  nearbyText: { fontSize: 19, color: colors.inkMuted, fontWeight: '500' },

  dateDivider: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginTop: 11.3 },
  dateSticky: { position: 'sticky', zIndex: 5, backgroundColor: colors.white } as any,
  dateBold: { fontSize: 16, fontWeight: '600', color: colors.ink, letterSpacing: -0.16 },
  dateSlash: { fontSize: 16, color: colors.inkMuted, marginRight: 5.5 },
  dateDay: { fontSize: 16, color: colors.inkMuted },

  feedRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 10.3, paddingBottom: 16 },
  feedCover: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#E8E8EC', alignSelf: 'flex-start' },
  feedBody: { flex: 1, marginLeft: 12.1, justifyContent: 'flex-start' },
  feedBodyTarget: { zIndex: 1 },
  hostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 3, marginBottom: 2.9 },
  hostRowPriced: { minHeight: 18.2, marginTop: 0, marginBottom: 8.4 },
  hostName: { fontSize: 12, color: colors.inkSecondary, fontWeight: '400' },
  pricePill: { position: 'absolute', right: 0, top: 0, height: 18.2, paddingHorizontal: 5.6, borderRadius: 6, backgroundColor: '#F5FCF4', justifyContent: 'center' },
  priceTag: { fontSize: 10.5, lineHeight: 13, fontWeight: '600', color: '#3CBD2C' },
  feedTitle: { fontSize: 16, fontWeight: '600', color: colors.ink, lineHeight: 23.3, marginBottom: 0 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9.6 },
  metaText: { fontSize: 14, color: colors.inkSecondary, marginLeft: 6 },

  headerIconBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  discCityRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 8 },
  discCity: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25 },
  discPopular: { fontSize: 19, fontWeight: '500', color: colors.inkMuted, lineHeight: 25, marginTop: 2.35 },

  popularGrid: { marginTop: 15.65 },
  popularColumn: { width: 343.5 },
  popCardWrap: { width: 343.5, height: 132.8 },
  popCard: { height: 116.1, width: 343.5, flexDirection: 'row', paddingLeft: 16 },
  popCardTarget: { zIndex: 1 },
  popHairline: { position: 'absolute', left: 92, right: 4, top: 124, height: 1, backgroundColor: '#F0F0F1' },
  popCover: { width: 80, height: 80, borderRadius: 12, marginLeft: 0, marginTop: 9, backgroundColor: '#E8E8EC' },
  popCardBody: { marginLeft: 12.1, marginTop: 9, width: 231.4, alignSelf: 'flex-start' },
  popHostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16 },
  popHost: { fontSize: 13, color: colors.inkSecondary, fontWeight: '400' },
  popTitle: { fontSize: 16, fontWeight: '500', color: colors.ink, lineHeight: 23.7, marginTop: 6.1 },
  popTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6.7 },
  popTime: { fontSize: 15, color: colors.inkMuted, marginLeft: 8, lineHeight: 21 },
  badge: { paddingHorizontal: 5.85, height: 18.2, borderRadius: 6, marginLeft: 7, marginBottom: -0.8, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 11, fontWeight: '500', lineHeight: 14 },

  browseTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 22.4 },
  catRow: { marginTop: 13 },
  catRow2: { marginTop: 0.4 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingLeft: 11.2, paddingRight: 12.1, height: 48, borderWidth: 1, borderColor: '#F0F0F1', borderRadius: 15, gap: 8, backgroundColor: colors.white },
  catChipTarget: { zIndex: 1 },
  catLabel: { fontSize: 15, fontWeight: '500', color: colors.ink },
  citiesRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 17.65 },
  discCities: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25, width: 53.1 },
  citiesMore: { width: 79, height: 13.5, marginTop: 0.55, alignItems: 'center', justifyContent: 'center' },

  detailRoot: { flex: 1, height: '100%', backgroundColor: colors.detailBg },
  sheetLayer: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, justifyContent: 'flex-end' },
  sheetScrim: { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheetPanel: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 16, paddingTop: 28, paddingBottom: 34 },
  sheetGrabber: { position: 'absolute' as const, top: 12, alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#DCDCE0' },
  sheetHeading: { fontSize: 16, fontWeight: '600', color: colors.ink, marginBottom: 12 },
  sheetNotice: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: colors.bgGray, borderRadius: 12, padding: 12 },
  sheetNoticeIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#EDEDED', alignItems: 'center', justifyContent: 'center' },
  sheetNoticeTitle: { fontSize: 16, fontWeight: '600', color: colors.ink, lineHeight: 21 },
  sheetNoticeBody: { fontSize: 14, color: '#737373', lineHeight: 19, marginTop: 2 },
  sheetBody: { fontSize: 15, color: '#737373', lineHeight: 20, marginTop: 16 },
  sheetPrimaryBtn: { height: 50, borderRadius: 12, backgroundColor: colors.btnBlack, alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  sheetPrimaryText: { color: '#FFFFFF', fontSize: 16.3, fontWeight: '500' },
  sheetRow: { height: 50, justifyContent: 'center' },
  sheetRowText: { fontSize: 16.3, fontWeight: '500', color: colors.ink },
  sheetRule: { height: 1, backgroundColor: colors.divider },
  detailStatusWrap: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 11 },
  detailNav: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 12, paddingTop: 4, paddingBottom: 8 },
  detailNavBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  detailScroll: { position: 'absolute' as const, top: 64, left: 0, right: 0, bottom: 0, overflow: 'hidden' as const },
  detailCoverWrap: { marginHorizontal: 16, marginTop: 1, borderRadius: 22, overflow: 'hidden' as const },
  detailCover: { width: '100%', height: 393, backgroundColor: '#1a1a2e' },
  detailBody: { paddingHorizontal: 16, marginTop: 14.95 },
  detailTitle: { fontSize: 27, fontWeight: '600', color: colors.detailText, lineHeight: 32 },
  detailTitleGone: { visibility: 'hidden' } as object,
  detailHostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 13.3 },
  detailHost: { fontSize: 16, color: colors.detailMuted, marginLeft: 6.2 },
  detailTime: { fontSize: 16, color: colors.detailMuted, marginTop: 11 },
  detailActions: { flexDirection: 'row', gap: 6, height: 55.3, marginTop: 17.15 },
  detailAction: {
    flex: 1, height: 55.3, backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 16,
    flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 7.5, gap: 0.85,
  },
  detailActionPrimary: { backgroundColor: '#FFFFFF' },
  detailActionLabel: { color: colors.detailSoft, fontSize: 12, fontWeight: '500', textAlign: 'center' },
  detailActionLabelPrimary: { color: '#000000' },
  detailSection: { fontSize: 16, fontWeight: '500', color: colors.detailMuted, marginTop: 0, lineHeight: 18.9 },
  detailSectionFirst: { marginTop: 24.15 },
  detailSectionAfterAccess: { marginTop: 9.5 },
  detailSpotsRow: { flexDirection: 'row', alignItems: 'center', height: 18.9, marginTop: 8.1 },
  detailSpots: { marginLeft: 5.1, fontSize: 15, fontWeight: '500', color: '#F6DC8C', lineHeight: 18.9 },
  detailAccessRow: { flexDirection: 'row', alignItems: 'center', height: 48, marginTop: 3.3 },
  detailAccessText: { marginLeft: 8, fontSize: 15, color: colors.detailMuted, lineHeight: 18.9 },
  detailGatedRow: { flexDirection: 'row', alignItems: 'center' },
  detailWeatherIcon: { width: 21, height: 21, marginTop: 4.8, alignItems: 'center', justifyContent: 'center' },
  detailTemp: { textAlign: 'right' },
  detailAgendaHeading: { fontSize: 16, fontWeight: '600', color: colors.detailText, lineHeight: 22.2, marginTop: 12.8 },
  detailAgendaRow: { flexDirection: 'row', marginTop: 3.3 },
  detailAgendaDot: { width: 20.8, paddingLeft: 6.9, fontSize: 15, color: colors.detailText, lineHeight: 24.7 },
  detailAgendaText: { flex: 1, fontSize: 15, color: colors.detailText, lineHeight: 24.7 },
  detailSectionInline: { fontSize: 16, fontWeight: '500', color: colors.detailMuted, lineHeight: 18.9, flex: 1, marginRight: 8 },
  detailSectionGoing: { marginTop: 24.4 },
  detailSectionAbout: { marginTop: 22.7 },
  detailDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 14, marginBottom: 0 },
  detailLocation: { fontSize: 20, fontWeight: '500', color: colors.detailText, lineHeight: 24, marginTop: 4.8 },
  detailAddress: { fontSize: 16, color: colors.detailMuted, marginTop: 1.8, lineHeight: 19.45 },
  detailFeatured: { position: 'absolute' as const, left: 0, right: 0, bottom: 0, height: 34, backgroundColor: 'rgba(6,10,24,0.72)', alignItems: 'center', justifyContent: 'center' },
  detailFeaturedText: { color: colors.detailSoft, fontSize: 12, fontWeight: '500' },
  detailPinnedTitle: { flex: 1, alignSelf: 'center', color: colors.detailText, fontSize: 18, fontWeight: '600', marginHorizontal: 8 },
  detailMap: { marginTop: 12.25, height: 120.1, borderRadius: 14, backgroundColor: '#EAE6DC', overflow: 'hidden' as const },
  mapBlock: { position: 'absolute' as const, backgroundColor: '#F4F0E6', borderRadius: 3 },
  mapPark: { position: 'absolute' as const, backgroundColor: '#DCEBD8', borderRadius: 3 },
  mapRoad: { position: 'absolute' as const, left: 0, right: 0, backgroundColor: '#FFFFFF' },
  mapPin: { position: 'absolute' as const, left: '58%', top: '30%', alignItems: 'center' },
  mapPinHead: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#EA4335' },
  mapPinTip: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 9, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#EA4335', marginTop: -2 },
  mapLabel: { position: 'absolute' as const, left: 10, top: 12, color: '#5C6068', fontSize: 12, fontWeight: '500', lineHeight: 15 },
  detailHostHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 11.65 },
  detailHostContact: { fontSize: 13.5, color: colors.detailMuted, fontWeight: '500' },
  detailHostContactBtn: { width: 54.2, height: 48, alignItems: 'center', justifyContent: 'center' },
  detailDividerTight: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 5 },
  detailSpeakerRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 2.75 },
  detailSpeakerAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10.2, marginTop: 4.5 },
  detailSpeakerName: { fontSize: 16, fontWeight: '600', color: colors.detailText, lineHeight: 20 },
  detailSpeakerRole: { fontSize: 13, color: colors.detailMuted, marginTop: 4, lineHeight: 16.4 },
  detailGoingRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center' },
  detailGoingNames: { fontSize: 15, color: colors.detailMuted, marginTop: 7.7, lineHeight: 20 },
  goingAvatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.detailBg, alignItems: 'center', justifyContent: 'center' },
  goingAvatarOverlap: { marginLeft: -10 },
  goingAvatarInitial: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.2 },
  detailAboutMedia: { marginHorizontal: -16, marginTop: 5.75, height: 75.3 },
  detailAboutImage: { marginLeft: 16, marginTop: 17.1, width: 361.3, height: 58.2, backgroundColor: '#131C2E', borderRadius: 12, overflow: 'hidden' },
  detailAboutImageFill: { width: '100%', height: 240 },
  detailAbout: { fontSize: 15, color: colors.detailText, marginTop: 12, lineHeight: 21 },

  galleryRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
  gallerySearchRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, height: 56, gap: 8 },
  galleryBack: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  gallerySearchBox: { flex: 1, height: 56, justifyContent: 'center' },
  gallerySearchPlaceholder: { fontSize: 19, fontWeight: '500', color: '#C4C4C5' },
  galleryCats: { flexDirection: 'row', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#ECECEF' },
  galleryCat: { alignItems: 'center', paddingHorizontal: 12, paddingBottom: 9.6 },
  galleryCatLabel: { fontSize: 14, color: '#C4C4C5', marginTop: 21.6, fontWeight: '500' },
  galleryCatActive: { color: colors.ink, fontWeight: '600' },
  galleryCatUnderline: { position: 'absolute' as const, bottom: -1, left: 12, right: 12, height: 2.5, backgroundColor: colors.ink },
  galleryScrollbar: { position: 'absolute' as const, right: 0, top: 56, width: 2.2, height: 67.3, backgroundColor: 'transparent' },
  galleryScroll: { flex: 1, marginBottom: 77.2 },
  galleryHero: { marginTop: 12.1, height: 204.5, borderRadius: 20, backgroundColor: '#FF9500', overflow: 'hidden' as const },
  galleryHeroTitle: { position: 'absolute' as const, left: 16, top: 16, fontSize: 16, fontWeight: '500', color: '#FFFFFF', letterSpacing: -0.38 },
  galleryHeroCount: { position: 'absolute' as const, left: 16, top: 41, fontSize: 12.2, color: 'rgba(255,255,255,0.8)' },
  galleryHeroCardA: { position: 'absolute' as const, right: 78, top: 42, width: 140, height: 162, borderRadius: 12, transform: [{ rotate: '-8deg' }] },
  galleryHeroCardB: { position: 'absolute' as const, right: 10, top: 30, width: 124, height: 140, borderRadius: 12, transform: [{ rotate: '6deg' }] },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, columnGap: 16, rowGap: 26.2 },
  galleryTile: { width: 172.5, height: 172.5, borderRadius: 12, overflow: 'hidden' as const, backgroundColor: '#F4F4F6' },
  galleryTileImg: { width: '100%', height: 124.6 },
  galleryTileLabelWrap: { backgroundColor: '#FFFFFF', height: 47.9, alignItems: 'center', justifyContent: 'center' },
  galleryTileLabel: { fontSize: 15, color: colors.ink },
  galleryFooter: { position: 'absolute' as const, left: 16, right: 16, bottom: 15, height: 50.2, justifyContent: 'center' },
  galleryChooseBtn: { flex: 1, paddingHorizontal: 12, backgroundColor: colors.btnBlack, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  galleryChooseText: { width: '100%', textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  skelHero: { backgroundColor: '#F6F6F6' },
  skelBar: { position: 'absolute' as const, backgroundColor: '#EDEDED', borderRadius: 3 },
  skelTile: { backgroundColor: '#F6F6F6', height: 172.5 },
  skelTileImg: { height: 124.9, backgroundColor: '#D6D6D6' },
  coverChosen: { position: 'absolute' as const, left: 0, top: 0, width: '100%', height: '100%', borderRadius: 12 },

  createRoot: { flex: 1, height: '100%', backgroundColor: '#F6F7F8' },
  iconBtn48: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  createHeader: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, paddingTop: 4, paddingBottom: 4, height: 56, gap: 8 },
  createTitle: { fontSize: 19, fontWeight: '500', color: colors.ink, width: 116.1, letterSpacing: -0.13 },
  createAvatarGroup: { width: 54.2, height: 48, flexDirection: 'row', alignItems: 'center' },
  createAvatarChevron: { marginLeft: 4.6 },
  createAvatarTarget: { position: 'absolute' as const, left: 0, top: 9.8, width: 28, height: 28 },
  restorePill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start', width: 168.8, height: 41.5, paddingLeft: 12 },
  restorePillFill: { position: 'absolute', left: 0, right: 0, top: 0, height: 35, borderRadius: 17.5, backgroundColor: '#EDEEEF' },
  restoreClock: { marginTop: 8.35, marginLeft: -0.7 },
  restoreText: { fontSize: 14.5, fontWeight: '500', letterSpacing: 0.05, color: '#969798', marginLeft: 4.7, marginTop: 8, lineHeight: 18.9, flexShrink: 0 },
  restoreClose: { position: 'absolute', left: 126.6, top: 0, width: 48, height: 41.5, alignItems: 'center', justifyContent: 'center' },
  restoreCloseGlyph: { marginTop: -6.5, marginLeft: 0.6 },
  coverUpload: { width: 240.5, height: 240.5, alignSelf: 'center', backgroundColor: '#EDEEEF', borderRadius: 12, marginTop: 5.5 },
  coverUploadBtn: {
    position: 'absolute', right: 4, bottom: 4, width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',
  },
  inputField: { width: 361, height: 58.6, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, justifyContent: 'center', paddingLeft: 16, marginTop: 30.2 },
  eventNameHint: { fontSize: 21, fontWeight: '500', color: '#C4C4C5', width: 119.7, letterSpacing: -0.07 },
  eventNameInput: {
    position: 'absolute', left: 16, right: 16, top: 0, bottom: 0, fontSize: 21, fontWeight: '500', color: colors.ink,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  timeCard: { width: 361, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 24, marginTop: 12.0, height: 104.8, justifyContent: 'center' },
  timeCardRule: { position: 'absolute', top: 52.0, left: 44, right: 0, height: 1, backgroundColor: colors.divider },
  timeLineRow: { flexDirection: 'row', alignItems: 'center', height: 52.8, paddingLeft: 16, paddingRight: 16 },
  timelineCol: { width: 28, alignItems: 'center', justifyContent: 'center' },
  timeDotFilled: { width: 11, height: 11, borderRadius: 5.5, backgroundColor: '#A1A1A2' },
  timeDotHollow: { width: 11, height: 11, borderRadius: 5.5, borderWidth: 2, borderColor: '#C4C4C9', backgroundColor: 'transparent' },
  timelineDashed: { width: 0, height: 22, borderLeftWidth: 2, borderLeftColor: '#C4C4C9', borderStyle: 'dashed' },
  timeLabelStart: { fontSize: 15.5, color: '#A1A1A2', width: 71.3, fontWeight: '500' },
  timeLabelEnd: { fontSize: 15.5, color: '#A1A1A2', width: 80.4, fontWeight: '500' },
  datePill: { width: 116.1, height: 48, alignItems: 'center', justifyContent: 'center' },
  datePillEnd: { width: 116.1, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  timePillA: { width: 95.3, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  timePillB: { width: 86.2, height: 48, alignItems: 'center', justifyContent: 'center', marginLeft: 6.1 },
  pillBox: { width: '100%', height: 36, borderRadius: 10, backgroundColor: '#F4F4F6', alignItems: 'center', justifyContent: 'center' },
  pillText: { fontSize: 16, fontWeight: '500', color: '#151516', width: '100%', textAlign: 'center' },
  rowCard: { width: 361, height: 48, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 10.6 },
  rowCardTall: { width: 361, height: 52, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 10.5 },
  rowLabelLocation: { fontSize: 15.5, color: '#A1A1A2', width: 128.8, marginLeft: 6, fontWeight: '500' },
  rowLabelDesc: { fontSize: 15.5, color: '#A1A1A2', width: 122.3, marginLeft: 6, fontWeight: '500' },
  rowLabelApproval: { fontSize: 15.5, color: '#A1A1A2', width: 130.3, marginLeft: 9.5, fontWeight: '500' },
  ticketingDivider: { height: 1, backgroundColor: '#E5E6E7', marginTop: 24.8, marginHorizontal: 16 },
  ticketingTitle: { fontSize: 14, fontWeight: '600', color: '#9C9C9E', width: 64.4, marginTop: 19, marginLeft: 16, lineHeight: 18.9 },
  ticketCard: { width: 361, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 22, marginTop: 11.2, overflow: 'hidden' },
  approvalRow: { height: 52, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16 },
  ticketRule: { height: 0.73, marginLeft: 44, backgroundColor: colors.divider },
  priceRow: { height: 50.2, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 14.5 },
  ticketIcon: { width: 20, marginLeft: -1.5, alignItems: 'center' },
  rowLabelPrice: { fontSize: 15.5, color: '#A1A1A2', marginLeft: 9.5, fontWeight: '500' },
  priceValue: { fontSize: 15.5, color: '#151516', fontWeight: '500' },
  priceChevron: { marginLeft: 6.9 },
  toggle: { width: 52, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#B6B7B8', backgroundColor: '#ECEDEE', justifyContent: 'center', paddingHorizontal: 6 },
  toggleOn: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A', paddingHorizontal: 2 },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#969698' },
  toggleThumbOn: { alignSelf: 'flex-end', width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' },

  emptyStateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 34 },
  notifIllustration: { width: 250, height: 196 },
  bigEmptyTitle: { fontSize: 19.3, fontWeight: '600', color: '#737373', lineHeight: 25.1, marginTop: 18 },
  bigEmptyDesc: { fontSize: 15, color: '#737373', textAlign: 'center', marginTop: 6.9, lineHeight: 19.45, alignSelf: 'stretch', marginHorizontal: 2 },
  startChatBtn: { marginTop: 25.5, height: 43.7, width: 106.3, borderRadius: 21.85, backgroundColor: colors.btnBlack, alignItems: 'center', justifyContent: 'center' },
  startChatText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: 'transparent', gap: 8,
    paddingTop: 0, paddingBottom: 0, height: 88, justifyContent: 'flex-start',
  },
  tabBarFill: {
    position: 'absolute', top: 25, left: 0, right: 0, bottom: 0, backgroundColor: colors.tabBar,
  },
  tabItem: { position: 'absolute', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 0 },
  tabIconWrap: { width: 56, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginTop: 29.7 },
  tabPillActive: { backgroundColor: colors.tabPill },
  tabLabel: { fontSize: 12, marginTop: 4.0, fontWeight: TAB_LABEL_WEIGHT },
  createFab: {
    position: 'absolute', right: 16, bottom: 79, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.fab, borderRadius: 28, paddingHorizontal: 16, paddingVertical: 16,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 5 },
    elevation: 5, zIndex: 30,
  },
  createFabText: { fontSize: 16, fontWeight: '500', color: '#6B6B6C', marginLeft: 8 },
  createFabSmall: {
    position: 'absolute', right: 16, bottom: 79, width: 56, height: 56, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', backgroundColor: colors.fab,
    shadowColor: '#000', shadowOpacity: 0.22, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 5, zIndex: 30,
  },
});
