export const characters = [
  {
    id: "1",
    name: "Tiganul Vesel",
    description: "Un personaj plin de energie si umor",
    avatar: "https://images.pexels.com/photos/1222235/pexels-photo-1222235.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: "2",
    name: "Politisul Strict",
    description: "Un ofiter sever dar drept",
    avatar: "https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: "3",
    name: "Baba Prosatoare",
    description: "O batrana inteleapta cu sfaturi surprinzatoare",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: "4",
    name: "Agentul Imobiliar",
    description: "Totul despre apartamente imaginare",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: "5",
    name: "Taximetristul Voraret",
    description: "Povesti fara sfarsit despre calatorii",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: "6",
    name: "Doctorul Panicar",
    description: "Diagnostic surprinzator garantat",
    avatar: "https://images.pexels.com/photos/545229/pexels-photo-545229.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
]

export const mockUser = {
  id: "1",
  name: "Ion Popescu",
  email: "ion@example.com",
  credits: 5,
  memberSince: "2024-01-15",
  avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
}

export const mockPranks = [
  {
    id: "1",
    characterId: "1",
    characterName: "Tiganul Vesel",
    victimNumber: "+4072***1234",
    victimName: "Prietenul",
    status: "reusit" as const,
    duration: "3:24",
    date: "2024-01-20 14:30",
    creditsUsed: 1
  },
  {
    id: "2",
    characterId: "2",
    characterName: "Politisul Strict",
    victimNumber: "+4074***5678",
    victimName: "Colegul",
    status: "reusit" as const,
    duration: "2:45",
    date: "2024-01-19 16:15",
    creditsUsed: 1
  },
  {
    id: "3",
    characterId: "3",
    characterName: "Baba Prosatoare",
    victimNumber: "+4076***9012",
    victimName: "",
    status: "esuat" as const,
    duration: "0:08",
    date: "2024-01-18 10:00",
    creditsUsed: 1
  },
  {
    id: "4",
    characterId: "1",
    characterName: "Tiganul Vesel",
    victimNumber: "+4073***3456",
    victimName: "Varul",
    status: "in_asteptare" as const,
    duration: "-",
    date: "2024-01-21 12:00",
    creditsUsed: 1
  }
]

export const pricingTiers = [
  {
    id: "incepator",
    name: "Incepator",
    price: 15,
    credits: 3,
    pricePerCredit: 5,
    features: [
      "3 farse epice",
      "Acces la toate personajele",
      "Inregistrari audio",
      "Garantia Fara Teapa"
    ],
    popular: false
  },
  {
    id: "popular",
    name: "Popular",
    price: 35,
    credits: 8,
    pricePerCredit: 4.38,
    features: [
      "8 farse epice",
      "Acces la toate personajele",
      "Inregistrari audio HD",
      "Garantia Fara Teapa",
      "Prioritate in coada"
    ],
    popular: true
  },
  {
    id: "maestru",
    name: "Maestru",
    price: 60,
    credits: 15,
    pricePerCredit: 4,
    features: [
      "15 farse epice",
      "Acces la toate personajele",
      "Inregistrari audio HD",
      "Garantia Fara Teapa",
      "Prioritate maxima",
      "Personaje exclusive"
    ],
    popular: false
  }
]

export const faqItems = [
  {
    question: "Ce este Mistocaru?",
    answer: "Mistocaru este o platforma de divertisment care iti permite sa trimiti farse telefonice prietenilor tai. Alegi un personaj amuzant, introduci numarul victimei si noi ne ocupam de restul!"
  },
  {
    question: "Cum functioneaza sistemul de credite?",
    answer: "Fiecare farsa costa 1 credit. Poti cumpara credite in pachete de 3, 8 sau 15, cu preturi care scad per credit pe masura ce iei mai multe. Creditele nu expira."
  },
  {
    question: "Ce este 'Garantia Fara Teapa'?",
    answer: "Daca apelul dureaza mai putin de 10 secunde din motive tehnice, iti returnam automat creditul folosit. Nu vei pierde niciodata bani pe farse nereusite din vina noastra."
  },
  {
    question: "Este legal sa folosesc Mistocaru?",
    answer: "Da! Mistocaru este un serviciu de divertisment destinat uzului personal cu prietenii. Nu folosim numerele telefonice in alt scop si respectam intimitatea utilizatorilor."
  },
  {
    question: "Cum primesc inregistrarea?",
    answer: "Dupa fiecare apel reusit, vei primi inregistrarea audio direct in contul tau. O poti asculta, descarca sau partaji cu prietenii tai."
  }
]
