import {
  Ecosystem,
  Hero,
  Leadership,
  MissionVision,
  Projects,
  Research,
  SimpleWords,
  Web3ToWeb4,
  WhyItMatters,
} from '../sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SimpleWords />
      <Web3ToWeb4 />
      <MissionVision />
      <Ecosystem />
      <WhyItMatters />
      <Projects />
      <Leadership />
      <Research />
    </>
  )
}
