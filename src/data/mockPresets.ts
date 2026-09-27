import { ProjectFormData } from '../types';

export const presetProjects: Record<'kiosk' | 'baker' | 'tech' | 'craft', ProjectFormData> = {
  kiosk: {
    name: 'Kiosque Frais & Épicerie Moderne',
    sector: 'Commerce & Artisanat de proximité',
    stage: 'seed',
    description: 'Distribution de jus naturels locaux, fruits découpés et produits de consommation courante en quartier urbain.',
    amount: 200000,
    currency: 'FCFA',
    revenue: 'Moins de 5 000 000 FCFA',
    location: 'Abidjan (Treichville, Côte d’Ivoire)',
    fundingPurpose: 'Production, Matériel & Équipements',
    mainHurdle: 'Activité récente ou premières ventes encore limitées',
    language: 'fr'
  },
  baker: {
    name: 'Le Fournil d’Ivoire & Céréales Locales',
    sector: 'Agro-alimentaire & Agriculture',
    stage: 'seed',
    description: 'Boulangerie-pâtisserie artisanale valorisant les farines locales (manioc, maïs, mil) avec un fournil semi-industriel et 3 points de vente partenaires.',
    amount: 20000000,
    currency: 'FCFA',
    revenue: 'Entre 15 000 000 FCFA et 60 000 000 FCFA',
    location: 'Abidjan (Cocody / Marcory, Côte d’Ivoire)',
    fundingPurpose: 'Production, Matériel & Équipements',
    mainHurdle: 'Pas de bilans comptables certifiés sur 3 ans',
    language: 'fr'
  },
  tech: {
    name: 'AgriLogistics AI Africa',
    sector: 'Tech & Numérique',
    stage: 'seed',
    description: 'Plateforme mobile et USSD reliant les coopératives maraîchères aux grossistes urbains, réduisant le gaspillage post-récolte.',
    amount: 45000000,
    currency: 'FCFA',
    revenue: 'Moins de 15 000 000 FCFA',
    location: 'Dakar (Sénégal) & Abidjan (Côte d’Ivoire)',
    fundingPurpose: 'R&D, Logiciel & Propriété Intellectuelle',
    mainHurdle: 'Besoin d’identifier les bons financeurs sans intermédiaires coûteux',
    language: 'fr'
  },
  craft: {
    name: 'Atelier WoodCraft Éco-Design',
    sector: 'Transition Écologique & Recyclage',
    stage: 'idea',
    description: 'Conception de meubles modulaires durables en bois certifié et matériaux revalorisés pour hôtels, bureaux et particuliers.',
    amount: 12000000,
    currency: 'FCFA',
    revenue: 'Moins de 15 000 000 FCFA',
    location: 'Douala (Cameroun) / Lomé (Togo)',
    fundingPurpose: 'Production, Matériel & Équipements',
    mainHurdle: 'Absence de garantie matérielle ou caution hypothécaire',
    language: 'fr'
  }
};
