import React, { useMemo } from 'react'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme
} from 'styled-components'
import { useIsDarkMode } from '../state/user/hooks'
import { Text, TextProps } from 'rebass'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg1: darkMode ? '#212429' : '#FFFFFF',
    bg2: darkMode ? '#2C2F36' : '#F7F8FA',
    bg3: darkMode ? '#40444F' : '#EDEEF2',
    bg4: darkMode ? '#565A69' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#ff007a',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5'

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },

    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
  main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps) {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

export const FixedGlobalStyle = createGlobalStyle`
html, input, textarea, button {
  font-family: 'Inter', sans-serif;
  font-display: fallback;
}
@supports (font-variation-settings: normal) {
  html, input, textarea, button {
    font-family: 'Inter var', sans-serif;
  }
}

html,
body {
  margin: 0;
  padding: 0;
}

 a {
   color: ${colors(false).blue1}; 
 }

* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

html {
  font-size: 16px;
  font-variant: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  
}
`

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg2};
}

body {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-image: radial-gradient(50% 50% at 50% 50%,#120f39 0%,#130519 100%);
}
.fltkUW{
  background:#2A0946 !important
}
.mhgfk {
  border-radius: 20px;
  border: 1px solid #2C2F36;
  background-color: #260940 !important;
}
.deMLGG {
  background-color: #260940 !important;
}
.iNRcfz{
  background-color: #1A0D26 !important;
}
.glzcFl{
  background-color: #260940 !important;
}
.lghrhB{
  background-color: #DE47BB !important;
}
.kxmjqp:disabled{

  background:linear-gradient(to right,#784fe7,#ac55e0);
  color:#fff !important
}
.gfxNFT{
  background:linear-gradient(to right,#784fe7,#ac55e0)
}
.kxmjqp{
  border:none !important
}
.mhgfk{
  border: 1px solid #371E53 !important;
}
.css-1qqnh8x{
  color:#AB90F7 !important
}
.deMLGG{
  color:#E0A9F8 !important
}
input::-webkit-input-placeholder{
  color:#4B328F !important;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#4B328F !important;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#4B328F !important;
}
.gfSFvl{
  color:#BEA7FF !important;
  background:#200C35 !important 
  border: 1px solid #4C2171 !important;
     
}
.gfSFvl:hover{
  border: 1px solid #BEA7FF !important;
}
html {
  color: #CEBFF7 !important;
  background-color: #2C2F36;
}
.dVcZMA{
  background-color: #4B328F !important;
}
.cYcHDX {
  position: relative;
  max-width: 420px;
  width: 100%;
  background: #2a0946 !important;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.01), 0px 4px 8px rgba(0,0,0,0.04), 0px 16px 24px rgba(0,0,0,0.04), 0px 24px 32px rgba(0,0,0,0.01);
  border-radius: 30px;
  padding: 1rem;
}
.ekRBpp { 
  background-image: linear-gradient(to right, #9020d4, #f1149a) !important;
  border:none !important;
  color:#fff !important
}
.fIiskF {
  border-radius: 20px;
  border: 1px solid #371e53 !important;
  background-color: #260940 !important;
}
.djzHQv{
  background-color: #260940 !important;
}
.cypDFq{
  color: #e0a9f8;
  background-color: #260940 !important;
}
.qBTyU{
  background-color: #de47bb !important;
}
a:active {
  color: #fff ;
}
.gWdljZ{
  color:#ab90f7 !important
}
.gWdljZ.ACTIVE {
  border-radius: 12px;
  font-weight: 600;
  color: #fff !important;
}
.gWdljZ:hover {
  border-radius: 12px;
  font-weight: 600;
  color: #fff !important;
}
.dhzTqc { 
  border-bottom: 1px solid #371e53 !important;
}
.fkqoIs{
  background:#200c35 !important
}
button#connect-wallet {
  background: #200c35 !important;
  color: #bea7ff !important;
  border: 1px solid #4c2171;
}
.hHdByj {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: #48328f !important;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
}
.iHFbio{
  background-color: #48328f !important;
}
.gQzhAX{
  background-image: linear-gradient(to right, #9020d4, #f1149a) !important;
}
.iSdGPe:disabled {
  background-color: #4c2171 !important;
  color: #8771c6 !important;
  cursor: auto;
  box-shadow: none;
  border: 1px solid transparent;
  outline: none;
  opacity: 1;
}
.egenDt{
  color: #ab90f7 !important;
}
.ggMCCS {
  height: 28px;
  background-color: #200c35 !important;
  border: 1px solid #4c2171 !important;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: #bea7ff !important;
}
.cPuHoJ{
  background-color: #200c35 !important;
}
.kLnwNG{
  background-image: linear-gradient(to right, #9020d4, #f1149a) !important;
}
.dNwTdp{
  border: 1px solid #8771c6 !important;
  color:#e0a9f8 !important
}
.gRAHKQ{
  border: 1px solid #8771c6 !important;
  color:#e0a9f8 !important
}
.kvzjUd[data-reach-dialog-content]{
  background-color: #1A0D26 !important;
}
.ejZAHb{
  color:#CEBFF7 !important
}
.hPcmtA{
  background-color:#2a0946 !important
}
.cCafyC {
  color: #CEBFF7 !important;
}
.ggJnuv {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: #301746 !important;
  color: #C3C5CB;
}
.hUQVOk{
  background-color: #301746 !important;
}
.jlAAVc{
  border: 1px solid #8771c6 !important;
}
.lgLXhl {
  width: 100%;
  height: 1px;
  background-color: 1px solid #8771c6 !important;
}

`
