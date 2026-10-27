import { dataDeletion, privacy, terms } from '../data/legal'
import { LegalPage } from './LegalPage'

export const TermsPage = () => <LegalPage doc={terms} />
export const PrivacyPage = () => <LegalPage doc={privacy} />
export const DataDeletionPage = () => <LegalPage doc={dataDeletion} />
