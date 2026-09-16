import {
  BuildStatus,
  Community,
  Ecosystem,
  FinalCTA,
  Hero,
  Leadership,
  Manifesto,
  MissionVision,
  Projects,
  Research,
  SimpleWords,
  Web3ToWeb4,
  WhyItMatters,
} from '../sections'
import { useDocumentTitle } from '../hooks'

export default function HomePage() {
  useDocumentTitle()

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
      <BuildStatus />
      <Manifesto />
      <Community />
      <FinalCTA />
    </>
  )
}
