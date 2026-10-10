import React from 'react';
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
const P = ({ d, size = 24, color = '#1A1A1A', fill = 'none', strokeWidth = 2, stroke = color }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d={d}/>
  </Svg>);
const SPARKLE_PATH = "M12 2 C13.5 8.4 15.6 10.5 22 12 C15.6 13.5 13.5 15.6 12 22 C10.5 15.6 8.4 13.5 2 12 C8.4 10.5 10.5 8.4 12 2 Z";
export const SparkleIcon = ({ size = 7, color = '#151516' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d={SPARKLE_PATH} fill={color}/>
  </Svg>);
export const HomeIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    {filled
        ? (<G transform="translate(12 12) scale(1.09) translate(-12 -12)">
          <Path d="M12 2.1 C12.9 2.1 13.4 2.6 13.8 3.1 L20 8.5 L21.5 9.4 C22.4 10 22.5 10.8 21.4 10.9 L20.3 10.9 L20.3 18.6 C20.3 20.6 18.7 22 16.8 22 L7.2 22 C5.3 22 3.7 20.6 3.7 18.6 L3.7 10.9 L2.6 10.9 C1.5 10.8 1.6 10 2.5 9.4 L4 8.5 L10.2 3.1 C10.6 2.6 11.1 2.1 12 2.1 Z"/>
          <Path d="M8.7 13.8 Q11.7 16.3 14.7 13.8" stroke="#DDDDDF" strokeWidth="2.1" fill="none" strokeLinecap="round"/>
        </G>)
        : (<>
          <Path d="M3.5 11L12 3.5 20.5 11V20a1 1 0 01-1 1h-4.5v-6.2H9V21H4.5a1 1 0 01-1-1V11z"/>
          <Path d="M9 15.6c.9 1 1.8 1.5 3 1.5s2.1-.5 3-1.5"/>
        </>)}
  </Svg>);
export const DiscoverIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="9.2"/>
    <G transform="translate(12 12) scale(0.85) translate(-12 -12)">
      <Path d="M15.9 7.8 L14.8 14.3 L7.8 15.9 L8.9 9.4 Z" stroke={color} strokeWidth={2.3} strokeLinejoin="round"/>
    </G>
  </Svg>);
export const HeartIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21.2 C9 18 1.8 13.5 1.8 8.5 C1.8 4.8 4.5 2.3 7.8 2.3 C10.2 2.3 11.3 3.7 12 4.3 C12.7 3.7 13.8 2.3 16.2 2.3 C19.5 2.3 22.2 4.8 22.2 8.5 C22.2 13.5 15 18 12 21.2 Z" transform="translate(12 12) scale(0.98) translate(-12 -12)"/>
  </Svg>);
export const ChatIcon = ({ size = 26, color = '#1A1A1A', filled = false }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={filled ? 0 : 1.9} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12.1 21.4 A9.7 9.7 0 1 0 5 18.3 Q1.4 20.2 3.5 21.4 Z"/>
    {!filled && (<Path d="M7.8 14.2 Q11.5 17 15.2 14.2"/>)}
  </Svg>);
export const SettingsGear = ({ size = 28, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="3"/>
    <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.36.87 1.28 1.4 2.2 1H22a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </Svg>);
export const MapIcon = ({ size = 26, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/>
    <Path d="M9 4v14M15 6v14"/>
  </Svg>);
export const SearchIcon = ({ size = 26, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="7"/>
    <Path d="M21 21l-4.3-4.3"/>
  </Svg>);
export const ComposeIcon = ({ size = 24, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 3.2 H5.6 A2.4 2.4 0 0 0 3.2 5.6 V18.4 A2.4 2.4 0 0 0 5.6 20.8 H18.4 A2.4 2.4 0 0 0 20.8 18.4 V12"/>
    <Path d="M17.2 3.1 L20.9 6.8 L12.6 15.1 L9.2 16 L10.1 12.6 Z"/>
  </Svg>);
export const ClockIcon = ({ size = 18, color = '#C4C4C5' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10.2"/>
    <Path d="M12 11.8V5.6"/>
    <Path d="M12 12l0.9 3.6"/>
  </Svg>);
export const PinIcon = ({ size = 18, color = '#C4C4C5' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21.6C12 21.6 3.4 14.5 3.4 9.3A8.6 8.6 0 0 1 20.6 9.3C20.6 14.5 12 21.6 12 21.6Z"/>
    <Circle cx="12" cy="9.3" r="3.1" fill={color} stroke="none"/>
  </Svg>);
export const ChevronRight = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 6l6 6-6 6"/>
  </Svg>);
export const ChevronDown = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 9l6 6 6-6"/>
  </Svg>);
export const BackArrow = ({ size = 28, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 6l-6 6 6 6"/>
    <Path d="M9 12H20"/>
  </Svg>);
export const ShareIcon = ({ size = 24, color = '#1A1A1A' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>
    <Circle cx="18" cy="5" r="3" fill={color} stroke="none"/>
    <Circle cx="6" cy="12" r="3" fill={color} stroke="none"/>
    <Circle cx="18" cy="19" r="3" fill={color} stroke="none"/>
  </Svg>);
export const PlusIcon = ({ size = 24, color = '#6B6B70' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <Path d="M12 5v14M5 12h14"/>
  </Svg>);
export const CloseX = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
    <Path d="M6 6l12 12M18 6L6 18"/>
  </Svg>);
export const CalendarEmptyIcon = ({ size = 48, color = '#E9E9EC' }: any) => (<Svg width={size} height={size} viewBox="0 0 160 120">
    <G>
      
      <Rect x="22" y="18" width="60" height="84" rx="16" fill="#FFFFFF"/>
      <Rect x="78" y="18" width="60" height="84" rx="16" fill="#FFFFFF"/>
      
      <Circle cx="80" cy="40" r="9" fill={color}/>
      <Circle cx="80" cy="80" r="9" fill={color}/>
      
      <Circle cx="80" cy="18" r="7" fill={color}/>
      <Circle cx="80" cy="102" r="7" fill={color}/>
      
      <Rect x="74" y="48" width="12" height="24" rx="6" fill={color}/>
    </G>
  </Svg>);
export const ImageAddIcon = ({ size = 24, color = '#FFFFFF' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="18" height="18" rx="3"/>
    <Circle cx="8.5" cy="8.5" r="1.5"/>
    <Path d="M21 15l-5-5L5 21"/>
    <Path d="M18 3v4M16 5h4" stroke={color} strokeWidth={2.2}/>
  </Svg>);
export const LocationPinInput = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z"/>
    <Circle cx="12" cy="9" r="2.5"/>
  </Svg>);
export const DescriptionIcon = ({ size = 22, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="3" width="16" height="18" rx="2"/>
    <Path d="M8 8h8M8 12h8M8 16h5"/>
  </Svg>);
export const LockIcon = ({ size = 20, color = '#9B9BA0' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="4" y="10" width="16" height="11" rx="2.5"/>
    <Path d="M8 10V7a4 4 0 018 0v3"/>
  </Svg>);
export const GoogleIcon = ({ size = 24, color = '#151516' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M21.35 11.1H12v2.82h5.27c-.24 1.47-1.62 4.31-5.27 4.31-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.54-2.45C16.78 3.99 14.63 3 12 3 6.98 3 2.93 7.04 2.93 12s4.05 9 9.07 9c5.24 0 8.71-3.68 8.71-8.86 0-.6-.07-1.06-.15-1.54z"/>
  </Svg>);
export const PasskeyIcon = ({ size = 24, color = '#151516' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx="8.5" cy="5.9" r="5.7"/>
    <Path d="M0.7 19.3 A7.8 5.2 0 1 0 16.3 19.3 A7.8 5.2 0 1 0 0.7 19.3 Z"/>
    <Circle cx="19.9" cy="11" r="4.2"/>
    <Circle cx="19.7" cy="9.4" r="1.15" fill="#EDEDED"/>
    <Path d="M19 14.8h1.7v8a0.85 0.85 0 0 1-1.7 0z"/>
    <Path d="M19 17.5 L16.7 18.3 L19 19.1 Z M19 20.2 L16.7 21 L19 21.8 Z"/>
  </Svg>);
export const CatFamily = ({ size = 22, color = '#B967D5' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 3.2 L4 9.8 L2.4 9.8 M12 3.2 L20 9.8 L21.6 9.8" fill="none"/>
    <Path d="M5.3 9.8 V17.4 Q5.3 19.3 7 19.3 H17 Q18.7 19.3 18.7 17.4 V9.8" fill="none"/>
    <Path d="M12 17.6 C8.2 14 7.3 12.1 8.7 10.5 C9.6 9.5 11.2 9.7 12 10.9 C12.8 9.7 14.4 9.5 15.3 10.5 C16.7 12.1 15.8 14 12 17.6 Z" fill="none" stroke={color}/>
  </Svg>);
export const CatTech = ({ size = 22, color = '#4F74D6' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M8 13.8 V8 Q8 7.2 8.8 7.2 H16.4 Q17.2 7.2 17.2 8 V8.9" fill="none"/>
    <Path d="M11.3 9.8 L8.8 11.5 L11.3 13.2" fill="none"/>
    <Path d="M12.4 9.2 L13.1 13.4" fill="none"/>
    <Path d="M14.2 9.8 L16.7 11.5 L14.2 13.2" fill="none"/>
    <Path d="M17.7 13 L18.8 14.7" fill="none"/>
    <Path d="M5.6 14.7 H18.8 L20.4 18.2 H4 Z" fill="#DCE6FA"/>
  </Svg>);
export const CatFood = ({ size = 22, color = '#E28003' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4.2 12.6 H19.8" fill="none"/>
    <Path d="M4.2 12.6 A7.8 7.8 0 0 0 19.8 12.6 Z" fill="#FBF0E1"/>
    <Path d="M8.6 12.5 Q8.2 7.2 11 7.2 Q13.6 7.4 13.1 12.4" fill="none"/>
    <Path d="M12.9 12.5 Q12.8 4.2 16.1 4.5 Q19.9 5 19.6 12.5" fill="none"/>
    <Path d="M8.4 10.2 L4 5 M10.2 9.8 L5.8 4.4" fill="none"/>
  </Svg>);
export const CatBooks = ({ size = 22, color = '#DDAB00' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 9 Q8.8 5.3 4.4 8.2 V17.3 Q8.3 16.2 12 18.6" fill="none"/>
    <Path d="M12 9 Q15.2 5.3 19.6 8.2 V17.3 Q15.7 16.2 12 18.6" fill="none"/>
    <Path d="M12 9 V18.6" fill="none"/>
    <Path d="M6.8 11.6 Q9 11.3 10.9 12.1 M6.8 14.7 Q9 14.4 10.9 15.2" fill="none"/>
    <Path d="M13.1 12.1 Q15 11.3 17.2 11.6 M13.1 15.2 Q15 14.4 17.2 14.7" fill="none"/>
  </Svg>);
export const CatGames = ({ size = 22, color = '#B87721' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 4.5 L19.5 8.5 L12 12.5 L4.5 8.5 Z" fill="none"/>
    <Path d="M4.5 8.5 L12 12.5 V20 L4.5 16.2 Z" fill="none"/>
    <Path d="M19.5 8.5 L12 12.5 V20 L19.5 16.2 Z" fill="none"/>
    <Circle cx="12" cy="8.4" r="1.05" fill={color} stroke="none"/>
    <Circle cx="7.2" cy="11.5" r="1" fill={color} stroke="none"/>
    <Circle cx="8.3" cy="14" r="1" fill={color} stroke="none"/>
    <Circle cx="9.4" cy="16.5" r="1" fill={color} stroke="none"/>
    <Circle cx="15.7" cy="12.6" r="1" fill={color} stroke="none"/>
    <Circle cx="16.8" cy="15" r="1" fill={color} stroke="none"/>
  </Svg>);
export const CatAI = ({ size = 22, color = '#E9659C' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M19.39 12.00 Q19.61 12.80 19.30 13.14 Q18.98 13.48 18.89 13.85 Q18.79 14.21 18.89 14.66 Q18.99 15.11 18.92 15.53 Q18.85 15.95 18.72 16.37 Q18.60 16.80 18.33 17.13 Q18.06 17.46 17.68 17.67 Q17.29 17.87 16.82 17.93 Q16.35 17.98 16.02 18.19 Q15.70 18.40 15.46 18.81 Q15.22 19.22 14.83 19.37 Q14.44 19.52 14.02 19.50 Q13.59 19.48 13.18 19.42 Q12.77 19.35 12.39 18.99 Q12.00 18.63 11.60 19.12 Q11.20 19.61 10.80 19.55 Q10.41 19.48 9.98 19.50 Q9.56 19.52 9.22 19.25 Q8.89 18.99 8.66 18.59 Q8.43 18.18 8.04 18.08 Q7.65 17.98 7.27 17.83 Q6.88 17.69 6.50 17.49 Q6.13 17.29 5.97 16.89 Q5.81 16.50 5.48 16.22 Q5.15 15.95 5.20 15.48 Q5.24 15.01 5.35 14.57 Q5.45 14.13 5.23 13.81 Q5.02 13.48 4.83 13.13 Q4.65 12.77 4.63 12.39 Q4.60 12.00 4.63 11.61 Q4.65 11.23 4.96 10.90 Q5.27 10.57 5.36 10.22 Q5.45 9.87 5.35 9.43 Q5.24 8.99 5.31 8.58 Q5.37 8.17 5.59 7.84 Q5.81 7.50 6.06 7.19 Q6.31 6.88 6.68 6.69 Q7.05 6.50 7.43 6.36 Q7.80 6.22 8.18 6.13 Q8.56 6.04 8.77 5.64 Q8.99 5.24 9.31 4.98 Q9.64 4.72 10.05 4.75 Q10.46 4.77 10.84 4.71 Q11.23 4.65 11.61 4.88 Q12.00 5.12 12.37 5.01 Q12.75 4.90 13.14 4.83 Q13.54 4.77 13.95 4.75 Q14.36 4.72 14.74 4.87 Q15.11 5.01 15.40 5.30 Q15.70 5.60 15.95 5.91 Q16.20 6.22 16.57 6.36 Q16.95 6.50 17.41 6.61 Q17.87 6.71 18.24 6.96 Q18.60 7.20 18.72 7.63 Q18.85 8.05 18.92 8.47 Q18.99 8.89 18.89 9.34 Q18.79 9.79 18.89 10.15 Q18.98 10.52 19.17 10.87 Q19.35 11.23 19.37 11.61 Q19.39 12.00 19.50 12.40 Z" fill="none"/>
    <Path d="M12 6 V8.2" fill="none"/>
    <Path d="M12 15.8 V18" fill="none"/>
    <Path d="M8 12 H16" fill="none"/>
    <Circle cx="9.7" cy="9.1" r="0.75" fill={color} stroke="none"/>
    <Path d="M11.7 9.1 H15" fill="none"/>
    <Path d="M9 14.9 H12.3" fill="none"/>
    <Circle cx="14" cy="14.9" r="0.75" fill={color} stroke="none"/>
  </Svg>);
export const CatRunning = ({ size = 22, color = '#7EA834' }: any) => (<Svg width={size} height={size} viewBox="2 2.5 20 20" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4.8 15.6 A8 8 0 1 1 15.7 18.4" fill="none"/>
    <Circle cx="14.5" cy="9" r="2.1" fill="none"/>
    <Path d="M12.5 11.5 C 12.5 12.9 10.2 13.1 11.2 14.6 C 12.5 16.2 12.7 17.4 10.9 18.6" fill="none"/>
    <Path d="M12.4 11.5 L7.6 11.3 Q7 11.6 7.3 12.3" fill="none"/>
    <Path d="M11.3 14.5 L6.2 14.8" fill="none"/>
  </Svg>);
export const GearMark = ({ size = 24, bg = '#E7EEF5' }: any) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="11" fill={bg}/>
    <G stroke="#4A6B8A" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <Circle cx="12" cy="12" r="3.2"/>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (<Path key={i} d={`M${12 + Math.cos(a) * 4.4},${12 + Math.sin(a) * 4.4} L${12 + Math.cos(a) * 7.4},${12 + Math.sin(a) * 7.4}`}/>);
    })}
    </G>
  </Svg>);
