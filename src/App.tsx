import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image, StyleSheet,
  Platform, Switch, TextInput,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Rect, Stop, Path as SvgPath, Path, Circle } from 'react-native-svg';
import { colors, fonts, spacing, radius, typeScale } from './tokens';
import {
  HomeIcon, DiscoverIcon, HeartIcon, ChatIcon, SettingsGear,
  MapIcon, SearchIcon, ComposeIcon, ClockIcon, PinIcon, ChevronRight, ChevronDown,
  BackArrow, ShareIcon, PlusIcon, CloseX, CalendarEmptyIcon,
  ImageAddIcon, LocationPinInput, DescriptionIcon, LockIcon,
  GoogleIcon, PasskeyIcon,
  CatFamily, CatTech, CatFood, CatBooks, CatGames, CatAI, CatRunning,
  GearMark, SparkleIcon,
} from './icons';
import { feedEvents, popularEvents, categories, detailEvent, detailEvents } from './data';
import { extractCoverBackground } from './palette';
import { useAppFonts } from './webfont';

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
  const fixWeight = () => {
    try {
      let src = '';
      for (const ss of Array.from(document.styleSheets)) {
        let rules: any[] = [];
        try { rules = Array.from(ss.cssRules); } catch (e) { continue; }
        for (const r of rules) {
          if (r && r.constructor && r.constructor.name === 'CSSFontFaceRule'
              && (r as any).style && (r as any).style.fontFamily === 'PlusJakartaSans') {
            src = (r as any).style.src;
          }
        }
      }
      if (src) {
        const s = document.createElement('style');
        s.id = 'luma-vf-weight';
        s.textContent = `@font-face{font-family:'PlusJakartaSans';src:${src};font-weight:200 800;font-display:swap;}`;
        document.head.appendChild(s);
        if (document.fonts && (document.fonts as any).ready) { (document.fonts as any).ready.then(() => { (document as any).body && document.body.setAttribute('data-fonts','ready'); }); }
        return true;
      }
    } catch (e) {  }
    return false;
  };
  if (!fixWeight()) {
    let tries = 0;
    const t = setInterval(() => { if (fixWeight() || ++tries > 40) clearInterval(t); }, 150);
  }
}

const webBg = (css: string) => (Platform.OS === 'web' ? ({ background: css } as any) : {});
const webTextGradient = (id: string) => Platform.OS === 'web'
  ? ({ backgroundImage: `linear-gradient(90deg,${colors.brandStart},${colors.brandEnd})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as any)
  : {};

function StatusBar(_props: { dark?: boolean }) {
  return null;
}

function HomeIndicator({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  return <View style={theme === 'dark' ? styles.homeIndicatorDark : styles.homeIndicator} />;
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

function PromoScreen({ onNext }: { onNext: () => void }) {
  const [panelOpen, setPanelOpen] = React.useState(false);
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
            <TouchableOpacity style={styles.emailBtn}>
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
    : require('../assets/hosts/mark-lantern.png');
  return <Image source={markSrc} style={{ width: 16, height: 16, borderRadius: 4, marginRight: 8, resizeMode: 'cover' } as any} />;
}


function HomeScreen({ onOpenDetail, onScroll }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <View accessibilityRole="button" style={styles.avatarBtn}>
          <View accessibilityRole="button" accessibilityLabel="Profile" style={[styles.avatar as any, { overflow: 'hidden' }]}>
            <AccountAvatar size={40} />
          </View>
        </View>
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
          <View style={{ marginLeft: 2.1 }}><ChevronRight size={18} color={colors.inkMuted} /></View>
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
              <View style={[styles.dateDivider, styles.dateSticky, i > 0 && { marginTop: 10 }]}>
                <Text style={styles.dateBold}>{ev.dateLabel}</Text>
                <Text style={styles.dateSlash}> / </Text>
                <Text style={styles.dateDay}>{ev.dayLabel}</Text>
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
                  <View style={styles.hostRow}>
                    <HostMark kind={ev.hostKind} size={26} />
                    <Text style={[styles.hostName, { flexShrink: 1 }]} numberOfLines={1}>{ev.host}</Text>
                    {ev.hostKind === 'book' && <Image source={require('../assets/hosts/books.png')} style={{ width: 15, height: 15, marginLeft: 4, resizeMode: 'contain' } as any} />}
                    {ev.price ? <Text style={styles.priceTag}>{ev.price}</Text> : null}
                    <View style={{ flex: 1 }} />
                  </View>
                )}
                <Text style={styles.feedTitle} numberOfLines={2}>{ev.title}</Text>
                {ev.inlineMeta && ev.location ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 11.2, flexWrap: 'wrap' }}>
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
                      <View style={[styles.metaRow, { marginTop: 7 }]}>
                        <PinIcon size={14} />
                        <Text style={[styles.metaText, { marginLeft: 6 }]}>{ev.location}</Text>
                      </View>
                    ) : null}
                  </>
                )}
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
function HeaderAvatar() {
  return (
    <View accessibilityRole="button" style={styles.avatarBtn}>
      <View accessibilityRole="button" accessibilityLabel="Profile" style={[styles.avatar as any, { overflow: 'hidden' }]}>
        <AccountAvatar size={40} />
      </View>
    </View>
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
    <View style={styles.detailGoingRow}>
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
          <Text style={styles.goingAvatarInitial}>{initials[i] ?? a.initials}</Text>
        </View>
      ))}
    </View>
  );
}

function CalendarPlusIcon({ size = 24, color = '#000000' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3.5" y="5" width="17" height="16" rx="3" />
      <Path d="M3.5 9.5 H20.5" />
      <Path d="M8 3 v3 M16 3 v3" />
      <Path d="M12 12.5 v4 M10 14.5 h4" />
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

const previewCovers = [
  require('../assets/covers/cover-founders.jpg'),
  require('../assets/covers/cover-summit.jpg'),
  require('../assets/covers/cover-clouds.jpg'),
];

function PopularCard({ ev, cover, preview, onPress, isLast, isFirst }: { ev?: any; cover?: any; preview?: boolean; onPress?: () => void; isLast?: boolean; isFirst?: boolean }) {
  const coverPad = isFirst ? 18 : 9;
  const bodyPad = isFirst ? 21 : 9;
  return (
    <View style={styles.popCardWrap}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.popCard}
        disabled={preview}
      >
        <Image source={cover} style={[styles.popCover as any, { marginTop: coverPad }]} resizeMode="cover" />
        {!preview && ev && (
          <View
            style={[styles.popCardBody, { marginTop: bodyPad }]}
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
      </TouchableOpacity>
      {!isLast && <View style={styles.popHairline} />}
    </View>
  );
}

const DISCOVER_RULES = [590.6, 629.9, 639.0, 678.3];

function DiscoverScreen({ onOpenDetail, onScroll }: { onOpenDetail: (id: string) => void; onScroll?: (y: number) => void }) {
  const catIcons: Record<string, any> = {
    family: <CatFamily />, tech: <CatTech />, food: <CatFood />,
    books: <CatBooks />, games: <CatGames />, ai: <CatAI />, running: <CatRunning />,
  };
  const row1 = categories.slice(0, 4);
  const row2 = categories.slice(4, 8);
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar />
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
          <View>
            <Text style={styles.discCity}>San Francisco</Text>
            <Text style={styles.discPopular}>Popular Events</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.discViewAll}>View All</Text>
          <View style={{ marginLeft: 2.1 }}><ChevronRight size={17} color={colors.inkMuted} /></View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularGrid}
          contentContainerStyle={{ paddingLeft: 0 }}>
          <View style={styles.popularColumn}>
            {popularEvents.map((ev, i) => (
              <PopularCard key={ev.id} ev={ev} cover={ev.cover} isFirst={i === 0} isLast={i === popularEvents.length - 1} onPress={() => onOpenDetail(ev.id)} />
            ))}
          </View>
          <View style={styles.popularColumn}>
            {previewCovers.map((c, i) => (
              <PopularCard key={i} preview cover={c} isFirst={i === 0} isLast={i === previewCovers.length - 1} />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.browseTitle}>Browse by Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row1.map((cat) => (
            <View key={cat.id} style={styles.catChip} accessibilityRole="button">
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catRow2}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
          {row2.map((cat) => (
            <View key={cat.id} style={styles.catChip} accessibilityRole="button">
              {catIcons[cat.icon]}
              <Text style={[styles.catLabel, { letterSpacing: (cat as any).track }]}>{cat.label}</Text>
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

function TicketGlyph({ size = 20, color = '#151516' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M4 5a2 2 0 0 0-2 2v3.2a1.8 1.8 0 0 1 0 3.6V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.2a1.8 1.8 0 0 1 0-3.6V7a2 2 0 0 0-2-2H4zm9 2h2v2h-2V7zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
    </Svg>
  );
}

function MailGlyph({ size = 20, color = '#E8EAEE' }: any) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8}>
      <Rect x="3" y="5.5" width="18" height="13" rx="2.4" />
      <Path d="M4 7.5l8 5.6 8-5.6" />
    </Svg>
  );
}

function DetailScreen({ eventId, onBack }: { eventId: string | null; onBack: () => void }) {
  const ev = (eventId && detailEvents[eventId]) || detailEvent;
  const [pinned, setPinned] = React.useState(false);
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
      <View style={[styles.detailNav, pinned ? styles.detailNavPinned : null]}>
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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}
        onScroll={(e: any) => setPinned(e.nativeEvent.contentOffset.y > 210)} scrollEventThrottle={64}>
        <View style={styles.detailCoverWrap}>
          <Image source={ev.cover} style={styles.detailCover as any} resizeMode="cover" />
          <View style={styles.detailFeatured}>
            <Text style={styles.detailFeaturedText}>Featured in San Francisco</Text>
          </View>
        </View>
        <View style={styles.detailBody}>
          <Text style={styles.detailTitle}>{ev.title}</Text>
          <View style={styles.detailHostRow}>
            <Image source={ev.hostMark} style={{ width: 16, height: 16, borderRadius: 4, resizeMode: 'cover' } as any} />
            <Text style={styles.detailHost}>{ev.host}</Text>
            <ChevronRight size={18} color={colors.detailMuted} />
          </View>
          <Text style={styles.detailTime}>{ev.time}</Text>

          <View style={styles.detailActions}>
            <TouchableOpacity style={[styles.detailAction, styles.detailActionPrimary]} accessibilityLabel="Register" activeOpacity={0.8}>
              <CalendarPlusIcon size={24} color="#000000" />
              <Text style={[styles.detailActionLabel, styles.detailActionLabelPrimary]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="Contact" activeOpacity={0.8}>
              <EnvelopeIcon size={24} color="#FFFFFF" />
              <Text style={styles.detailActionLabel}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailAction} accessibilityLabel="More" activeOpacity={0.8}>
              <MoreDotsIcon size={24} color="#FFFFFF" />
              <Text style={styles.detailActionLabel}>More</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.detailSection, styles.detailSectionFirst]}>Location</Text>
          <View style={styles.detailDivider} />
          <Text style={styles.detailLocation}>{ev.location}</Text>
          <Text style={styles.detailAddress}>{ev.address}</Text>
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
            <Text style={styles.mapLabel} {...({ 'aria-hidden': true } as any)}>{ev.location}</Text>
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
          <View style={styles.detailAboutMedia} accessibilityRole="button">
            <View style={styles.detailAboutImage} accessibilityRole="button" accessibilityLabel="Image" />
          </View>
          <Text style={styles.detailAbout}>{ev.about}</Text>
        </View>
      </ScrollView>
      <HomeIndicator theme="dark" />
    </View>
  );
}

const galleryCats = [
  { id: 'suggested', label: 'Suggested', track: 0.0, icon: <SparkleIcon size={17} color="#151516" /> },
  { id: 'school', label: 'School', track: 0.05, icon: <CatTech size={17} color="#8E8E93" /> },
  { id: 'halloween', label: 'Halloween', track: 0.15, icon: <CatGames size={17} color="#8E8E93" /> },
  { id: 'thanksgiving', label: 'Thanksgiving', track: 0.42, icon: <CatFood size={17} color="#8E8E93" /> },
];

const galleryTiles = [
  { label: 'Halloween', cover: require('../assets/covers/card-halloween.jpg') },
  { label: 'Thanksgiving', cover: require('../assets/covers/card-thanks.jpg') },
  { label: 'Invitation', cover: require('../assets/covers/card-invite.jpg') },
  { label: 'Birthday', cover: require('../assets/covers/card-birthday.jpg') },
];

function CoverGallery({ onBack }: { onBack: () => void }) {
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
          <View key={c.id} style={styles.galleryCat}>
            {c.icon}
            <Text style={[styles.galleryCatLabel, { letterSpacing: (c as any).track }, i === 0 && styles.galleryCatActive]}>{c.label}</Text>
            {i === 0 && <View style={styles.galleryCatUnderline} />}
          </View>
        ))}
      </View>
      <View style={styles.galleryScrollbar} {...({ tabIndex: 0 } as any)} />
      <ScrollView style={styles.galleryScroll} contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={styles.galleryHero}>
          <Text style={styles.galleryHeroTitle}>School</Text>
          <Text style={styles.galleryHeroCount}>21 Images</Text>
          <Image source={require('../assets/covers/card-halloween.jpg')} style={styles.galleryHeroCardA as any} />
          <Image source={require('../assets/covers/card-birthday.jpg')} style={styles.galleryHeroCardB as any} />
        </View>
        <View style={styles.galleryGrid}>
          {galleryTiles.map((t) => (
            <TouchableOpacity key={t.label} style={styles.galleryTile} activeOpacity={0.85} accessibilityRole="button">
              <Image source={t.cover} style={styles.galleryTileImg as any} resizeMode="cover" />
              <View style={styles.galleryTileLabelWrap} {...({ 'aria-hidden': true } as any)}>
                <Text style={styles.galleryTileLabel}>{t.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.hairline, { top: 698.7 }]} pointerEvents="none" />
      <View style={styles.galleryFooter}>
        <TouchableOpacity style={styles.galleryChooseBtn} accessibilityLabel="Choose From Library">
          <Text style={styles.galleryChooseText}>Choose From Library</Text>
        </TouchableOpacity>
      </View>
      <HomeIndicator />
    </View>
  );
}

function CreateScreen({ onBack }: { onBack: () => void }) {
  const [approval, setApproval] = React.useState(false);
  const [gallery, setGallery] = React.useState(false);
  if (gallery) return <CoverGallery onBack={() => setGallery(false)} />;
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
          <View style={styles.createAvatarTarget} accessibilityRole="button" accessibilityLabel="Sam Rivera" />
          <ChevronDown size={18} color="#A8A8AC" />
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 130 }} showsVerticalScrollIndicator={false}>
        <View style={styles.restorePill}>
          <View style={styles.restoreClock}><ClockIcon size={18} color={colors.inkMuted} /></View>
          <Text style={styles.restoreText} numberOfLines={1}>Restore draft?</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.restoreClose} activeOpacity={0.7}>
            <CloseX size={18} color={colors.inkMuted} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.coverUpload}
          accessibilityRole="button"
          accessibilityLabel="Change cover"
          onPress={() => setGallery(true)}
          activeOpacity={0.9}
        >
          <TouchableOpacity style={styles.coverUploadBtn} accessibilityRole="button" onPress={() => setGallery(true)} activeOpacity={0.85}>
            <ImageAddIcon size={22} color="#222324" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.inputField}>
          <Text style={styles.eventNameHint}>Event Name</Text>
        </View>
        <View style={styles.timeCard}>
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
        <View style={styles.approvalRow}>
          <LockIcon size={20} />
          <Text style={styles.rowLabelApproval}>Require Approval</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setApproval(!approval)} activeOpacity={0.8} style={[styles.toggle, approval && styles.toggleOn]}>
            <View style={[styles.toggleThumb, approval && styles.toggleThumbOn]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={[styles.hairline, { top: 496.3 }]} pointerEvents="none" />
      <HomeIndicator />
    </View>
  );
}

function EmptyScreen({ title, desc, notif = false, chat = false }: { title: string; desc: string; notif?: boolean; chat?: boolean }) {
  return (
    <View style={styles.screenRoot}>
      <StatusBar />
      <View style={styles.homeHeader}>
        <HeaderAvatar />
        <Text style={styles.screenTitle}>{title}</Text>
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
          <View style={styles.chatPlaceholder}>
            <ChatIcon size={64} color="#D0D0D5" />
          </View>
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

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'discover', label: 'Discover', icon: DiscoverIcon },
    { id: 'notif', label: 'Notifications', icon: HeartIcon },
    { id: 'chat', label: 'Chat', icon: ChatIcon },
  ];
  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarFill} pointerEvents="none" />
      {tabs.map((t) => {
        const I = t.icon;
        const isActive = active === t.id;
        return (
          <TouchableOpacity key={t.id} style={styles.tabItem} onPress={() => onChange(t.id)} activeOpacity={0.7} accessibilityLabel={t.label}>
            <View style={[styles.tabIconWrap, isActive && styles.tabPillActive]}>
              <I size={24} color={isActive ? colors.ink : colors.inkSecondary} filled={isActive} />
            </View>
            <Text style={[styles.tabLabel, { color: isActive ? colors.ink : colors.inkSecondary, fontWeight: isActive ? '700' : '600' }]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

type Screen = 'promo' | 'main' | 'detail' | 'create';

export default function App() {
  const [loaded] = useAppFonts();
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

  if (screen === 'promo') return <PromoScreen onNext={() => setScreen('main')} />;
  if (screen === 'detail') return <DetailScreen eventId={detailId} onBack={() => setScreen('main')} />;
  if (screen === 'create') return <CreateScreen onBack={() => setScreen('main')} />;

  return (
    <View style={styles.appRoot}>
      {tab === 'home' && <HomeScreen onOpenDetail={openDetail} onScroll={onScroll} />}
      {tab === 'discover' && <DiscoverScreen onOpenDetail={openDetail} onScroll={onScroll} />}
      {tab === 'notif' && <EmptyScreen title="Notifications" desc="Notifications about your events and friends will show up here." notif />}
      {tab === 'chat' && <EmptyScreen title="Chat" desc="Start a chat with your friends or others in your event." chat />}
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

  statusBar: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: 'none', flexDirection: 'row', alignItems: 'center', paddingLeft: 58, paddingRight: 28, paddingTop: 12, height: 40 },
  statusTime: { fontSize: 14, fontWeight: '400', letterSpacing: 2.2, marginRight: 8 },
  statusIcons: { flexDirection: 'row', alignItems: 'center' },
  homeIndicator: { width: 134, height: 5, backgroundColor: '#4A4A4D', borderRadius: 3, position: 'absolute', bottom: 14, alignSelf: 'center' },
  homeIndicatorDark: { width: 107, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.85)', position: 'absolute', bottom: 10, alignSelf: 'center' },

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
  loginHint: { position: 'absolute', left: 0, right: 0, top: 200.9, zIndex: 3, textAlign: 'center', fontSize: 13.2, lineHeight: 16.4, color: '#F7F7F7' },

  loginCovers: { position: 'absolute', top: -49.5, left: 0, width: 393, height: 242 },
  loginTextBlock: { position: 'absolute', top: 298, left: 0, right: 0, alignItems: 'center', zIndex: 2 },
  loginSheet: {
    position: 'absolute', top: 470, left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28,
  },
  grabber: { position: 'absolute', top: -13, width: 40, height: 4, backgroundColor: '#DCDCE0', borderRadius: 2, alignSelf: 'center' },
  loginSub: { position: 'absolute', top: 24, left: 32, right: 32, fontSize: 15, color: '#737373', textAlign: 'center', lineHeight: 20, fontWeight: '400', letterSpacing: -0.18 },
  phoneBtn: { position: 'absolute', top: 83, left: 16, right: 16, height: 50, paddingHorizontal: 12, backgroundColor: colors.btnBlack, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  phoneBtnText: { width: '100%', textAlign: 'center', color: '#fff', fontSize: 16.3, fontWeight: '500' },
  emailBtn: { position: 'absolute', top: 142, left: 16, right: 16, height: 50, paddingHorizontal: 12, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emailBtnText: { width: '100%', textAlign: 'center', color: colors.ink, fontSize: 16.3, fontWeight: '500' },
  oauthRow: { position: 'absolute', top: 200, left: 16, right: 16, height: 50, flexDirection: 'row', gap: 12 },
  oauthBtn: { flex: 1, height: 50, backgroundColor: '#EDEDED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  terms: { position: 'absolute', top: 270, left: 0, right: 0, fontSize: 11.8, color: colors.inkMuted, textAlign: 'center', fontWeight: '400' },
  termsLink: { position: 'absolute' as const, right: 63.7, top: 0, color: '#151516' },

  homeHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 4, paddingBottom: 0, gap: 8 },
  avatarBtn: { width: 48, height: 48, marginLeft: -4, alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: colors.ink },
  screenTitle: { fontSize: 21, fontWeight: '700', color: colors.ink, letterSpacing: -0.23 },
  sparkle: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: 0, marginLeft: 1, lineHeight: 20 },

  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: colors.ink },
  viewAll: { fontSize: 16, color: colors.inkMuted, fontWeight: '400', flexDirection: 'row' },
  pickedTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 26.6 },
  popularTitle: { fontSize: 19, fontWeight: '600', color: colors.inkMuted, paddingHorizontal: 16, marginTop: 2 },

  emptyCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 18, gap: 16 },
  emptyIcon: { width: 64, height: 64, borderRadius: 15, backgroundColor: colors.emptyTile, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '500', color: colors.inkMuted },
  emptyDesc: { fontSize: 14, color: colors.inkMuted, marginTop: 6.2, lineHeight: 18 },

  nearbyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 3.3 },
  nearbyText: { fontSize: 19, color: colors.inkMuted, fontWeight: '500' },

  dateDivider: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginTop: 11.3 },
  dateSticky: { position: 'sticky', top: 14.2, zIndex: 5, backgroundColor: colors.white } as any,
  dateBold: { fontSize: 16, fontWeight: '600', color: colors.ink, letterSpacing: -0.16 },
  dateSlash: { fontSize: 16, color: colors.inkMuted, marginRight: 6 },
  dateDay: { fontSize: 16, color: colors.inkMuted, letterSpacing: -0.68, paddingRight: 4.8 },

  feedRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 10, paddingBottom: 16 },
  feedCover: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#E8E8EC', alignSelf: 'flex-start' },
  feedBody: { flex: 1, marginLeft: 12, justifyContent: 'flex-start' },
  hostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 3, marginBottom: 2.9 },
  hostDot: { width: 16, height: 16, borderRadius: 8, marginRight: 7 },
  hostName: { fontSize: 12, color: colors.inkSecondary, fontWeight: '400' },
  priceTag: { fontSize: 13, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, overflow: 'hidden' },
  feedTitle: { fontSize: 16, fontWeight: '600', color: colors.ink, lineHeight: 23.3, marginBottom: 0 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 9.6 },
  metaText: { fontSize: 14, color: colors.inkSecondary, marginLeft: 6 },

  headerIconBtn: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  discCityRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 8 },
  discCity: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25 },
  discPopular: { fontSize: 19, fontWeight: '500', color: colors.inkMuted, lineHeight: 25, marginTop: 2.35 },
  discViewAll: { fontSize: 16, color: colors.inkMuted, marginTop: 3 },

  popularGrid: { marginTop: 16 },
  popularColumn: { width: 343.5 },
  popCardWrap: { width: 343.5, height: 133 },
  popCard: { height: 116, width: 343.5, flexDirection: 'row', paddingLeft: 16 },
  popHairline: { position: 'absolute', left: 92, right: 4, top: 124, height: 1, backgroundColor: '#F0F0F1' },
  popCover: { width: 80, height: 80, borderRadius: 12, marginLeft: 0, marginTop: 9, backgroundColor: '#E8E8EC' },
  popCardBody: { marginLeft: 12, marginTop: 9, width: 231.4 },
  popHostRow: { flexDirection: 'row', alignItems: 'center', height: 22 },
  popHost: { fontSize: 13, color: colors.inkSecondary, fontWeight: '400' },
  popTitle: { fontSize: 15, fontWeight: '500', color: colors.ink, lineHeight: 21, marginTop: 9 },
  popTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  popTime: { fontSize: 15, color: colors.inkMuted, marginLeft: 8 },
  badge: { paddingHorizontal: 9, paddingVertical: 0, height: 11, borderRadius: 8, marginLeft: 7, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 11, fontWeight: '600', lineHeight: 12.5, marginTop: 0 },

  browseTitle: { fontSize: 19, fontWeight: '700', color: colors.ink, paddingHorizontal: 16, marginTop: 22 },
  catRow: { marginTop: 13 },
  catRow2: { marginTop: 0 },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingRight: 9, height: 48, borderWidth: 1, borderColor: '#F0F0F1', borderRadius: 15, gap: 8, backgroundColor: colors.white },
  catLabel: { fontSize: 15, fontWeight: '500', color: colors.ink },
  citiesRow: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 16, marginTop: 17.65 },
  discCities: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25, width: 53.1 },
  citiesMore: { width: 79, height: 13.5, marginTop: 0.55, alignItems: 'center', justifyContent: 'center' },

  detailRoot: { flex: 1, height: '100%', backgroundColor: colors.detailBg },
  detailStatusWrap: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 11 },
  detailNav: { position: 'absolute' as const, top: 0, left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 12, paddingTop: 4, paddingBottom: 8 },
  detailNavPinned: { backgroundColor: 'rgba(16,14,30,0.72)', ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' } as any) : {}) },
  detailNavBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  detailCoverWrap: { marginHorizontal: 16, marginTop: 65, borderRadius: 22, overflow: 'hidden' as const },
  detailCover: { width: '100%', height: 393, backgroundColor: '#1a1a2e' },
  featuredBar: { backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 10, alignItems: 'center' },
  featuredText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  detailBody: { paddingHorizontal: 16, marginTop: 14.95 },
  detailTitle: { fontSize: 27, fontWeight: '600', color: colors.detailText, lineHeight: 32 },
  detailHostRow: { flexDirection: 'row', alignItems: 'center', minHeight: 16, marginTop: 13.3 },
  detailHost: { fontSize: 16, color: colors.detailMuted, marginLeft: 6.2 },
  detailTime: { fontSize: 16, color: colors.detailMuted, marginTop: 11 },
  detailActions: { flexDirection: 'row', gap: 6, height: 55.3, marginTop: 15.45 },
  detailAction: {
    flex: 1, height: 55.3, backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 16,
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  detailActionPrimary: { backgroundColor: '#FFFFFF' },
  detailActionLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  detailActionLabelPrimary: { color: '#000000' },
  detailSection: { fontSize: 16, fontWeight: '600', color: colors.detailMuted, marginTop: 0 },
  detailSectionFirst: { marginTop: 24.75 },
  detailSectionInline: { fontSize: 16, fontWeight: '600', color: colors.detailMuted },
  detailSectionGoing: { marginTop: 2.15 },
  detailSectionAbout: { marginTop: 22.9 },
  detailDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 13, marginBottom: 0 },
  detailLocation: { fontSize: 20, fontWeight: '500', color: colors.detailText, lineHeight: 24, marginTop: 3.7 },
  detailAddress: { fontSize: 16, color: colors.detailMuted, marginTop: 1.8, lineHeight: 19 },
  detailFeatured: { position: 'absolute' as const, left: 0, right: 0, bottom: 0, height: 34, backgroundColor: 'rgba(6,10,24,0.72)', alignItems: 'center', justifyContent: 'center' },
  detailFeaturedText: { color: '#E8EAEE', fontSize: 13, fontWeight: '500' },
  detailPinnedTitle: { flex: 1, color: colors.detailText, fontSize: 18, fontWeight: '600', marginHorizontal: 8 },
  detailMap: { marginTop: 13.25, height: 120.1, borderRadius: 14, backgroundColor: '#EAE6DC', overflow: 'hidden' as const },
  mapBlock: { position: 'absolute' as const, backgroundColor: '#F4F0E6', borderRadius: 3 },
  mapPark: { position: 'absolute' as const, backgroundColor: '#DCEBD8', borderRadius: 3 },
  mapRoad: { position: 'absolute' as const, left: 0, right: 0, backgroundColor: '#FFFFFF' },
  mapPin: { position: 'absolute' as const, left: '58%', top: '30%', alignItems: 'center' },
  mapPinHead: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#EA4335' },
  mapPinTip: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 9, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#EA4335', marginTop: -2 },
  mapLabel: { position: 'absolute' as const, left: 10, top: 12, color: '#5C6068', fontSize: 12, fontWeight: '500', lineHeight: 15 },
  detailHostHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 11.65 },
  detailHostContact: { fontSize: 16, color: colors.detailText, fontWeight: '500' },
  detailHostContactBtn: { width: 54.2, height: 48, alignItems: 'center', justifyContent: 'center' },
  detailDividerTight: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: 5 },
  detailSpeakerRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 1.75 },
  detailSpeakerAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 14 },
  detailSpeakerName: { fontSize: 17, fontWeight: '600', color: colors.detailText },
  detailSpeakerRole: { fontSize: 14, color: colors.detailMuted, marginTop: 22.2 },
  detailGoingRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center' },
  detailGoingNames: { fontSize: 15, color: colors.detailMuted, marginTop: 7.7, lineHeight: 20 },
  goingAvatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.detailBg, alignItems: 'center', justifyContent: 'center' },
  goingAvatarOverlap: { marginLeft: -10 },
  goingAvatarInitial: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 0.2 },
  detailAboutMedia: { marginHorizontal: -16, marginTop: 6.8, height: 75.3, backgroundColor: '#0B1220' },
  detailAboutImage: { marginLeft: 16, marginTop: 17.1, width: 361.3, height: 58.2, backgroundColor: '#131C2E', borderRadius: 12 },
  detailAbout: { fontSize: 15, color: colors.detailText, marginTop: 12, lineHeight: 21 },

  galleryRoot: { flex: 1, height: '100%', backgroundColor: colors.white },
  gallerySearchRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, height: 56, gap: 8 },
  galleryBack: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  gallerySearchBox: { flex: 1, height: 56, justifyContent: 'center' },
  gallerySearchPlaceholder: { fontSize: 19, fontWeight: '500', color: '#C4C4C5' },
  galleryCats: { flexDirection: 'row', paddingLeft: 4, borderBottomWidth: 1, borderBottomColor: '#ECECEF' },
  galleryCat: { alignItems: 'center', paddingHorizontal: 12, paddingBottom: 10 },
  galleryCatLabel: { fontSize: 14, color: '#C4C4C5', marginTop: 21.2, fontWeight: '500' },
  galleryCatActive: { color: colors.ink, fontWeight: '600' },
  galleryCatUnderline: { position: 'absolute' as const, bottom: -1, left: 12, right: 12, height: 2.5, backgroundColor: colors.ink },
  galleryScrollbar: { position: 'absolute' as const, right: 0, top: 56, width: 2.2, height: 67.3, backgroundColor: '#FFFFFF' },
  galleryScroll: { flex: 1, marginBottom: 77 },
  galleryHero: { marginTop: 11, height: 204.5, borderRadius: 20, backgroundColor: '#FF9500', overflow: 'hidden' as const },
  galleryHeroTitle: { position: 'absolute' as const, left: 16, top: 16, fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  galleryHeroCount: { position: 'absolute' as const, left: 16, top: 41, fontSize: 12.2, color: 'rgba(255,255,255,0.92)' },
  galleryHeroCardA: { position: 'absolute' as const, right: 78, top: 42, width: 140, height: 162, borderRadius: 12, transform: [{ rotate: '-8deg' }] },
  galleryHeroCardB: { position: 'absolute' as const, right: 10, top: 30, width: 124, height: 140, borderRadius: 12, transform: [{ rotate: '6deg' }] },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, columnGap: 16, rowGap: 26.2 },
  galleryTile: { width: 172.5, height: 145.2, borderRadius: 12, overflow: 'hidden' as const, backgroundColor: '#F4F4F6' },
  galleryTileImg: { width: '100%', height: 97.7 },
  galleryTileLabelWrap: { backgroundColor: '#FFFFFF', height: 47.5, alignItems: 'center', justifyContent: 'center' },
  galleryTileLabel: { fontSize: 15, color: colors.ink },
  galleryFooter: { position: 'absolute' as const, left: 16, right: 16, bottom: 15, height: 50.2, justifyContent: 'center' },
  galleryChooseBtn: { flex: 1, paddingHorizontal: 12, backgroundColor: '#2E2E30', borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  galleryChooseText: { width: '100%', textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  coverChangeText: { fontSize: 13, color: colors.inkMuted, marginTop: 6, alignSelf: 'center' },

  createRoot: { flex: 1, height: '100%', backgroundColor: '#F6F7F8' },
  iconBtn48: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  createHeader: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, paddingRight: 16, paddingTop: 4, paddingBottom: 4, height: 56, gap: 8 },
  createTitle: { fontSize: 19, fontWeight: '500', color: colors.ink, width: 116.1 },
  createAvatarGroup: { width: 54.2, height: 48, flexDirection: 'row', alignItems: 'center' },
  createAvatarTarget: { position: 'absolute' as const, left: 0, top: 10, width: 28, height: 28 },
  restorePill: { alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#EDEEEF', borderRadius: 20.75, width: 168.8, height: 41.5, paddingLeft: 12 },
  restoreClock: { marginTop: 11.75 },
  restoreText: { fontSize: 14, color: '#969798', marginLeft: 4, marginTop: 8, lineHeight: 18.9, flexShrink: 0 },
  restoreClose: { width: 48, height: 41.5, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  coverUpload: { width: 240.5, height: 240.5, alignSelf: 'center', backgroundColor: '#EDEEEF', borderRadius: 12, marginTop: 5.5 },
  coverUploadBtn: {
    position: 'absolute', right: 4, bottom: 4, width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center',
  },
  inputField: { width: 361, height: 58.6, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, justifyContent: 'center', paddingLeft: 16, marginTop: 30.2 },
  eventNameHint: { fontSize: 21, fontWeight: '500', color: '#C4C4C5', width: 119.7 },
  timeCard: { width: 361, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 24, marginTop: 12.7, height: 105.6, justifyContent: 'center' },
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
  rowCard: { width: 361, height: 48, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 9.1 },
  rowCardTall: { width: 361, height: 52, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 26, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, marginTop: 10.5 },
  rowLabelLocation: { fontSize: 15.5, color: '#A1A1A2', width: 128.8, marginLeft: 6, fontWeight: '500' },
  rowLabelDesc: { fontSize: 15.5, color: '#A1A1A2', width: 122.3, marginLeft: 6, fontWeight: '500' },
  rowLabelApproval: { fontSize: 15.5, color: '#A1A1A2', width: 130.3, marginLeft: 8, fontWeight: '500' },
  ticketingDivider: { height: 1, backgroundColor: '#E5E6E7', marginTop: 24.8, marginHorizontal: 16 },
  ticketingTitle: { fontSize: 14, fontWeight: '600', color: '#9C9C9E', width: 64.4, marginTop: 19, marginLeft: 16 },
  approvalRow: { width: 361, height: 52, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 22, flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, marginTop: 12.1 },
  toggle: { width: 54, height: 32, borderRadius: 16, backgroundColor: '#D6D6DB', justifyContent: 'center', paddingHorizontal: 3 },
  toggleOn: { backgroundColor: '#1A1A1A' },
  toggleThumb: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#fff' },
  toggleThumbOn: { alignSelf: 'flex-end' },

  emptyStateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 34 },
  notifIllustration: { width: 250, height: 196 },
  chatPlaceholder: { marginBottom: 18 },
  bigEmptyTitle: { fontSize: 19.3, fontWeight: '600', color: '#737373', lineHeight: 25.1, marginTop: 18 },
  bigEmptyDesc: { fontSize: 15, color: '#737373', textAlign: 'center', marginTop: 6.9, lineHeight: 19.5 },
  startChatBtn: { marginTop: 21, height: 44, paddingHorizontal: 20, borderRadius: 22, backgroundColor: colors.btnBlack, alignItems: 'center', justifyContent: 'center' },
  startChatText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: 'transparent', gap: 8,
    paddingTop: 0, paddingBottom: 0, height: 88, justifyContent: 'flex-start',
  },
  tabBarFill: {
    position: 'absolute', top: 25, left: 0, right: 0, bottom: 0, backgroundColor: colors.tabBar,
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 0 },
  tabIconWrap: { width: 56, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 16, marginTop: 20 },
  tabPillActive: { backgroundColor: colors.tabPill },
  tabLabel: { fontSize: 12, marginTop: 13.7, letterSpacing: -0.19 },
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
