import { Teammate, DreamRoleStory, FeedPost } from '../types/huddle';

export const HUDDLE_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4MGCN6v3pyV3MQc4tavWdLO1IY_qaRo2yql7H5Yz9PMK41FhSv9HdDQsbhEFF_AiKja3sUIYRmFnfzP91BkmLQoNDTPbdTaRctyhGzxIMTpogHbkkgktZ68hEVsiplHIj11ylD4Bra_rJnFrUjdcJ8HYg_5gkOdzDd9DNvezV75zGVA-x7ER3U4pFkA8k8n26uJX86-vZSA_P9PqsDZYGsuGwuP57PedmvcR98UUR',
  userProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFxLIkHxNSDl8eQ_KePkA71YXAW0TEQjTEL3ZTto4bFO15VQt3gwsIRVgkVtQiY0wHcyGM-1cVu9niH3gqytHNXLjkkIVZi-47v5yZDTyG3J-SzSXzofuuKVxIELfH5g_Ufg2-geU2TxpeBATVlcTLI5abHA_yR_P7Cyu8Q5PDp5yEGB2T4u7x4rR5BgOojV90_gpL4xJfDruA3nyJbnuj07kaXSIalmZRB375n347',
  mayaReal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXZ1s-5ljHJqseHk-JeMZkvl_2iVzyo8Mqy0n_ui47Dr6wRZP1qUAZGrrkk26nDfYtmTivGEUwFaCL-laP1RM_H2zFnhEwkVtJMOeC8Fm1wT_-XqXmpiu3LrNZtH9buBd4W6Y1-nSKsh5OErmsN1fa-3JHbli6hVddX2SdYUSIpmINZMzo1Sej0wfi6qS8V22NdOWkVnjytLzhBHp8YtoVRm2ScCMGC6hjCO8uLlb9',
  mayaAlter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNQctBUldppO0VHCHF3d1qVPxElZY2Y8lqk6rOSdpRbx8emfo21tzPQOtKgEouxwkB-_gl0vYXWribALgnrxMN2pMR_riHCDIMiOySd2Nr8_RRo2xzz8YdFXOtkF7mi3YxmzTT1RWov8_57azCtQBmocBfPWAlxj9SzbHurax1VvWctHAVq7-Pv2TgUMiqTWyCdc8b4bNw2rAJINQB6fD4VQ5iBNndavo1Ra0aiXKh',
  floorplanBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZjOfLfnXr-VDqHlErTjwHF-s-Z8Srj98taB9mz-EB-cR1VWtb5qX1_PGATOdNFUcDY6qinMRvbjznAaKRciQVK-zsOz9uatNydL8FacvQ7d_0fTYFXudvxmw0fDfyU7Bq4nweTMVlLzrCPTsfKBqlnHOuNx5YEVRbiv-BICzRWWqwzEVnBgHGSgwu1p6XAbthbT9UEa_TzTWJAtb9jKwAex7zSSSrhkXzBR9jYNHm',
  alexRivera: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1E_L03-XbaVM0mCJweb6n9R2LqmoCCYA5MLIkHSpUF3YIopsz6r_HzQP5EJFR06-ELhXM5CmqAAkiq6BOtjZg5qfnU1M8mepsur5_Elp-w-iZz3jDGhmHUQSIi74i3FykGKYhadbzG5H37sHtjNPpPJ8jlZX8f1SuA4pqLR4t5NCguEM7oO2r37Lelkum1vzeG0pTh7O2S2FJZYIj60a4b4XkTlisuLCsGPNRqrZ_',
  mayaAstrobiologist: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Xlrc36pdvBQDsCnfNolxTAMPMq8G0Gre_VzTvrbLoFrkL3ElLr_XzBmdbIyTQROe3J-HI5gLyR9QWnolfNCwzm95i23sohvenRReyWX-oWvuPuPYM_QjaxLUBWaVkDViIl-bwq4hgVk8BVZPXSBO_TiTAm1LWevQDoaX9kroocCLqtcwHtqq_9fYW5GtISCAjcz5pb6xRiwrW43s7XwFDHJ3ItdaXBFjxGOlskks',
  davidBaker: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG7z8qhyfqNR3ILsD_2f-GdENPhXCUlOtP64dZOEOCgcojf_8ubVTS-XWJ39ivv1w7mkZ5pK8f36K0qi1Ymd6QejHe_lSgILGxCEj06GE2k5f6gl_ah8qoi_yz3mmwrI0j3bWROxU8KlIpjrbKPwgV2NtG3HYvfoHXK3yZ-mtmDFBYD_iRN3d7cfq3mruvuc1gIgVmUxn5wbr6FXm8AeRKuVCxNZ01PHlBlVsANq1z',
  elenaF1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJCb5mWXMVATofHSBARw6KnIi6X97kQlrQsLq7gg5XR8_vlt_ZWWKcKPKGyaFujSd3yVcIlIVE6K0P2hluT8wAoFSRGHbFVlzZ-9DUZWaFPtdDn_ujvuQ7nvaktRsUX-flyr5u09eY_hYKs44vqNUgTGUN50qez16i_tDbgHDP7n9MwwP_wsi-brdhCIQIGFdzHdbO_itRz7fliEfRlkXrVe0A6PlQcUSb4RwzpSDY',
  sarahJenkins: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4W2BtKw7idcesxO3ooWkfb_M4ujCZIw5M_UceCAhAQSvRep3Ko2kykFm6EW4e3tE6Il1oQc6MkVQphUOIXgQ1p1VmUjXdn3E8OPcZH0UNwa3XO_nZLahaY2SnRwfht_g6eEGk5y5Lwpa08iWjGDaKsVvkUH_9Nhcu8nmllEoGuUMojv1TatUcRk14NkJksPcvfGx48KTnc39S13zX_yx-E3r35zLG5z_mjK99uQxR',
  marcusBell: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADEF8VbMd4-g4OsUYMO4rA1qAieL9n9-V8G8I_j4wbFCxLLzIiZzif2QrJIGjZHUzTNdO7GssCpdKEPjlcjUV6wzqP6n_4-yztxm45Mmz0uQKLRhbp7v2bO61MUBK76fM4MwtkgSf-IAAXHG72lM6BuxoFzhGPOUv2-yuX_1HdsPyjeG05vmprr2fLergwey1OyTOmhJzG0M_tTqgMCFC1To9HMyx9JZJfom2LAU9Z',
  davidHeadshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATykQvKF6FrGmXiWfm1yEsaZTzq8-1s5dMmHN6IhvrWhcTyBnYma546zVrU_CKptb0VhvEMYnb3S_DQoobgOn9vqMj82ws-zrpVTEkwT7qT5gfLClERfs8Ub8xN-2V0bm7tRfrB0cwscnUA5utOb_GSNPF6i5TqtAWHtzcznvu6PnkztTur64duQN_ctNqAq-damD7Ptpp086cWvI3meXzO2GEPmsHMQhlySdGstJT',
  davidRealDesk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX1u_WyjcZwBV3Gn7iSrwGoDq7lblIEXTmu1lzLzm2tmc8kW-5Vtvq-9T2m8xy2941sPO8nhb3vj80mUWmpwXazY-7hMOpHrSCgrm4yqXbp8DmlfhMM_YAhCCcxtWW_keQ51IejmTYldz_zKYo2y4bFnXZdtfDjuMpmzYiUNQn9A5woQEjods_H9_JDpguzwU6P7z6j3i_Y7L9fbxpoXbXjnQHfdKUjyrRTuytawMK',
  davidChocolatier: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoSUaivXxMLFMqc8QqkdjV2M1EuvF_q_gNByc8XefcSeRr6qC3NAIbXU2m5F0QSzJPfTEdlfC8sm--ou9YNV5IHmpdxmKZ-9O0xuZa1V2WQXEgD71BWYVveQmVzT8krEhMqH-1mTmGGMR2FYVBlIPHIFEbFsL2_iFvTRFfXpIEiuuywofw5EaHpT7pHtjNIiCO5VTCUnPiX5rU_mCkm1elVkBeSqQH23wdbBBAErcI',
  boardGameEvent: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUG1w63DJjkyqo0HY8R0FLQpTOGzSc0eoGQVl62HrLGXb0RHAi84egRH-oUJCZXQwPS2BPBlDlJ2RePS0WJMjuCPhXERcSTLFNLuHGXh3Q8iiS9IhNRGEV9TIoQ99hsWRGc3oVkKYsjQzQDZGSlWjgAgDbUp1F3g6PSv-pC0FhTeksk7b_eRxKxekzxcnzT1ZrMJI4qtOc4BC4puKJB5_A3HRbyoSSjPDg-D6KLYWc',
  commanderMayaPreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO978w9U8j71hj8wu2ykD61xxJWJ4_cPpbGs99hsRgsAPT2Qc78I4R6yIDoKL5agvfMsN23RzPcYhkp90C4-9pKQIwEMoMdeyFpeX9KjQq9N2RdtFBE7RvadidHGYUXdyfPbgYUVDEgYCL2JzSTUyicBYZatP86zwPvZ6k29vC2ENxOw4LfcCrdonmar44VWd-yCPhN1p4EsnQPs4ht2CCB6p2po_w_8fvOWnXRSoS',
  mayaDeskPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR_UrEXV01T4WMEnger9JcfsEi_nRNsNZFMaj0DVs87J_7aaqjyKrsR2rDFBnFHX9tQR6dVFldQkbhr00CmV1gyJIDyK8LZEGg1JXi4OlwYDO4MVlHEjcxuTsP0ioj4TM0NJm0Ry3lKD9Vkz-WxWMf4bTO1b-93tsSmh5l8tUBgHCaLCFOtJOVgUve_EL4qt1CMqINYOcB6x_CDkvDVn0ULNOnTwRn7OCeZ3svP3Z6',
  liamHeadshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVFdgUJkdPrdF5ZTk3v7sku7voruO0kdZtVyPzfCMcRrs0BdTs4c7l3lI4ai-hJGHFuIek3A7unbb0jsPiO_72qQgF5h9nCgpEftPyxXTeq8kRoSBnDVrCDJq26aA48i4KmwcyGlt3DgE5B1l72LwTsNw1ovvguA-DyUPmfaIxYnQYiWxSPoq5BM0n2Ek_9722ekpVLkM9BhdllNoi0F5oto7LN7BQXXE4OewuxUTC',
  liamGrizzly: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVVaAHy3uisZHKGl0RuTAQvyo2LfrUW6DiJ9DnOoLL9-MJaJ5X-djVyfdIuW5BFU6Plji-O-Y09m_6fFVbqlTg_wf-0F1WwP4eCzaVdNDqJms0yX7jWnA020GaY2-YPiG8N9jt3CtML-K3hn3Bppj_cN-15APLrZSoiBoRzOoZcVLJB9UmM_bdi5qTWlxV94NWubpmyCledy6gHmQ0e8neLzCigfXYKYcammMSw9-c',
  priyaHeadshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ffsM9F4OYR3HLnrr1Y65mrjQJ-Ygr2WMQNaxN93YOnb3hre3wt5jOTjplGmMF-eagH68YVrXlHTIUyOzveXjiBz1XXed8OoyZ8fkiMJFIH4RJa9qDcDmUO9-6DWu8ipGGbqzZSnNnqGAQO_WtjOw1rpEbPF1zFOIWI1nXRtLgjxCl_DVFuHc54tYmFiekzhgGKP1GqF8WNPQT3PUIffTe6vG0Nt_YlaW6qp_gX1k',
  priyaBroadway: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh8wE58_dD7awKFUJgFu_xeHGcIFemiKMFFhHEmV9Lqx5kudtacdemNTLgbTx--Axk1AiB2RYfTEGcex4BvFtP88tJWdHrTpUTRvXPBWUBpf3uFAT7rsCBP_po6oZ0HNZDeRjf6sYuf7Bpqewtg5Vjl1Nawq5j3rJxXh6xs5Vuf7ruCu62Z5JCcy9VYExO-7j6gZpqLsc8Pvq-fsBugfMZ0jyeDrsvZfYq7HAXNa3b',
  carlosHeadshot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKPMgFmx0smPDnDeU2ohgwv0rfyfMmSj19JWlRXJ_ikobgbzxHIXvFEORPwAvkKRot5NqYpNofpipG1-9kW4hNWoAgoQrQApJ18s60QVHJPZCAPsQFjByDWOMNgCG4lSek4Qd34C29gqOWWtd8VL0M64XIScPxtC41dd63cO7k5F2uNIVMdvbFk3ak2beVNEg3MkLlI3zrH9DCguViUE0jQFC8QOueNOAx8jYaVcgh',
  carlosDeepSea: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDybx6a2T6iGlqilL-454iy-6OFeZF3GKvuHcJV5ohnPGMBqi9vBDPRexXASDSf9-ZALcv3AWuRb1p69faWHwTpTGxVchbIMNKWOoSunpU_QTlRWFIKPEjKZutIZ5jsJGLC0vCGAlnBDocLywCc4chR6RC_B89PkT2FJ-0vFkYMjrOk0kLIWEphhLB0WHFk3Oh7FACPHalncatu00FuizxEGax7Msi0QOX9l4e0jVv-',
  mayaMapPin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOr7TO4tQyLmxYJ3bKtjuWBi0qYJUjlgtpIA1AYc6j4siPlBoKMobncMZm55V7VGuou8HsoWXe-5LfqIoP8Uyn34lZjfm6wXFRfdmjfERcOP7G-dNTAUsEhYMElw1UmnlFcvlf9sRx6aBhi8anD3CUoOnQd1EaVCZj5wuke7i213tD7Sqe8riGAN2mAebwUswdc7wnYetxt-eHjQyH_n368adJ_Sq4ZymYhQ6X5Hm5',
  lucasMapPin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeg15gDf0zaJKGt5CkT9NaiI0aHMCwSpnur7gCURDn773NDQ7-oTIorX4m7YR_u-KChH3NMi7aXPZ7W9u82h_ngrGoqLkHYeQWUEfJFV5rbCj4oP8TqRJYG9PiGBuaRUN94rgxsAjuKaqOnl-zV9cz_Z_8nxbgEzXPj7xt3gXM1qfSWeaSdi_tHm5xYI4odJb5j53oVKBZpK4jFcwfF91sPZbrAfyptmTvEU4VCURh',
  priyaMapPin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfbC8MJp8OKKIJpP7DmAIoTwmVUalIMlPVGSnnwY12y9L5wCf6R17_ZHpLQ8ZL5pcJDSKf87xPXg06emH5TRFFuXb0tlCnxBh44wg1_p0qZ5t6fjhdJMHtrVA-MvC9vLsRY8g5lLkRK1ZxaM9E8gVXhhqTLST4ynty_TLykLtSHAIOYg8Vb3595LGJjRFG73SYxBxPzFk2bONJ04NHSIVcQq1c60EmLDV2ApSS4sBD',
  samiraMapPin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRXALEbXCNBaNoV9Ni9e9VG76mLCdXHQgAFJShz2hDPiBuPPlT4XXG3NgcW76_fhoyXuiJXaSPXbYZ6eSgXrqJumow5Tt3Klky-LyVZeFi-vuXTQM3wMUCnUZosmz6rGXOTWCu7bIJwXup4PydU_6aGC9LgJxbZ0HxILb82Enst5b0Ky8B40BTU-hmW8V5MaUZ7hRIiBVPhdtAyvBMHuMVJ1bn9LjanzFo8Tl45KgO',
  davidMapPin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCvFOWhA-xSJ-waPiSrWatkl1XyNIBO44TtxM73_s_4-wLtZvd6QhpaAu3yp-UfJMIvy2-laRi7n6DGQsi7kR1LixtahY4QbOskDp8_xQaAkySsSkeesFypki62XUsdWti5zoCEnUeGzouTlfPDyGPEh3qK62_Mh_14vx2gHsfNGKs6Mda7sTmHRfo-vGRHcU6P5j5irv2potaf-ZcgS-_JglOqY5CNnR-6XJibD0j',
  mayaDrawerPortrait: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCt0JUbzpIbXnnxThSq6VE7CH8tRLRnu9y52D3S_jH3zHUsJPB7YsD3g9oWDtoMPHIsnG1Vsh81wODRoQy0rvL5OWVWLIYCGH87M8WjZ75MvFfFpmnBOkQzMR7GM80bX95Pl09AWK5i3_LN5hLkCwmwGDh_9jcKbYnPJTB_H8ftVHENEJPsDc8bfdYJHzCm1dL29Pb3R3wsYmrUIKmUlezKWNMCzS-06hXEKRCeFIJy'
};

export const TEAMMATES: Teammate[] = [
  {
    id: 'maya',
    name: 'Maya Lin',
    role: 'Senior Product Designer',
    department: 'Design & UX',
    desk: 'Desk 3B-14',
    zone: 'Creative Pod · Near East Sunroom',
    status: 'active',
    statusText: 'At Desk · Deep Flow until 2:30 PM',
    avatar: HUDDLE_ASSETS.mayaDrawerPortrait,
    alterEgoAvatar: HUDDLE_ASSETS.mayaAlter,
    alterEgoTitle: 'Commander Maya',
    alterEgoRole: 'Deep Space Astrobiologist & Nebula Cartographer',
    pinCoordinates: { top: '36%', left: '33%' },
    kudosCount: 148
  },
  {
    id: 'lucas',
    name: 'Lucas Vance',
    role: 'Staff Frontend Engineer',
    department: 'Frontend Devs',
    desk: 'Desk 3B-22',
    zone: 'Pod B · Center Bay',
    status: 'active',
    statusText: 'At Desk · Shipping Design Tokens',
    avatar: HUDDLE_ASSETS.lucasMapPin,
    alterEgoTitle: 'Alaskan Grizzly Wrangler',
    alterEgoRole: 'Subzero Wildlife Whisperer',
    pinCoordinates: { top: '57%', left: '35%' },
    kudosCount: 89
  },
  {
    id: 'priya',
    name: 'Priya Patel',
    role: 'Principal Systems Architect',
    department: 'Frontend Devs',
    desk: 'Desk 3B-29',
    zone: 'Pod B · South Row',
    status: 'focus',
    statusText: 'Focus Mode · Design Review in 45m',
    avatar: HUDDLE_ASSETS.priyaMapPin,
    alterEgoTitle: 'Broadway Choreographer',
    alterEgoRole: 'Lead Stage Maestro & Rhythm Architect',
    pinCoordinates: { top: '64%', left: '52%' },
    kudosCount: 112
  },
  {
    id: 'samira',
    name: 'Samira Mansour',
    role: 'Growth Marketing Lead',
    department: 'Growth Mktg',
    desk: 'Desk 3C-04',
    zone: 'Pod C · Growth Corner',
    status: 'active',
    statusText: 'At Desk · Q4 Funnel Sync',
    avatar: HUDDLE_ASSETS.samiraMapPin,
    alterEgoTitle: 'Solar Kinetic Sculptor',
    alterEgoRole: 'Bioluminescent Installation Artist',
    pinCoordinates: { top: '86%', left: '63%' },
    kudosCount: 76
  },
  {
    id: 'david',
    name: 'David Chen',
    role: 'Staff Backend Lead',
    department: 'Frontend Devs',
    desk: 'Lounge Seat 4',
    zone: 'Zen Lounge · East Rail',
    status: 'break',
    statusText: 'In Zen Lounge · Quick Sync',
    avatar: HUDDLE_ASSETS.davidMapPin,
    alterEgoTitle: 'Master Chocolatier',
    alterEgoRole: 'Artisanal Parisian Patissier',
    pinCoordinates: { top: '25%', left: '82%' },
    kudosCount: 94
  }
];

export const SPOTLIGHT_STORIES: DreamRoleStory[] = [
  {
    id: 'story-maya',
    teammateName: 'Maya Lin',
    teammateRole: 'Senior UX Architect',
    dreamRole: 'Astrobiologist',
    desk: 'Floor 3 · Desk 14',
    likesCount: 48,
    image: HUDDLE_ASSETS.mayaAstrobiologist,
    category: 'Dream Role'
  },
  {
    id: 'story-david',
    teammateName: 'David Chen',
    teammateRole: 'Staff Backend Lead',
    dreamRole: 'Sourdough Artisan',
    desk: 'Floor 3 · Desk 28',
    likesCount: 62,
    image: HUDDLE_ASSETS.davidBaker,
    category: 'Dream Role'
  },
  {
    id: 'story-elena',
    teammateName: 'Elena Rostova',
    teammateRole: 'People Ops Partner',
    dreamRole: 'Pit Crew Chief',
    desk: 'Floor 2 · Lounge',
    likesCount: 39,
    image: HUDDLE_ASSETS.elenaF1,
    category: 'Dream Role'
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    type: 'kudos',
    author: {
      name: 'Sarah Jenkins',
      avatar: HUDDLE_ASSETS.sarahJenkins,
      role: 'Core Platform',
      desk: 'Floor 3 East',
      verified: true
    },
    recipient: {
      name: 'Marcus Bell',
      avatar: HUDDLE_ASSETS.marcusBell,
      role: 'Lead Reliability Engineer',
      desk: 'Desk 3-41'
    },
    timestamp: '24m ago',
    content: 'Huge shoutout to @Marcus for rescuing our production deployment at midnight! Not only did he trace the concurrency deadlock in record time, but he also kept team morale rock high. Coffee on me all week long! ☕🚀',
    badge: {
      name: 'Problem Solver 🏆',
      icon: 'military_tech',
      subtitle: 'Hero of the production cluster recovery'
    },
    reactions: {
      claps: 24,
      hearts: 18,
      fire: 9,
      rocket: 5
    },
    comments: [
      {
        id: 'c-1',
        author: 'Alex Rivera',
        avatar: HUDDLE_ASSETS.alexRivera,
        text: 'Total legend! Well deserved Marcus 🎉',
        time: '12m ago'
      }
    ]
  },
  {
    id: 'post-2',
    type: 'dream-unlocked',
    author: {
      name: 'David Chen',
      avatar: HUDDLE_ASSETS.davidHeadshot,
      role: 'Staff Backend Lead',
      desk: 'Desk 3-28'
    },
    timestamp: '1h ago',
    content: 'After 8 years of database indexing, I asked Huddle AI to generate my alternate career universe... Meet the Parisian Chocolatier version of me! 🍫👨‍🍳',
    dreamComparison: {
      realImage: HUDDLE_ASSETS.davidRealDesk,
      realTitle: 'Real Life: Backend Lead',
      realSubtitle: '99.9% Uptime Dev',
      dreamImage: HUDDLE_ASSETS.davidChocolatier,
      dreamTitle: 'Dream Persona',
      dreamSubtitle: 'Master Chocolatier 🍫',
      pollVotes: {
        option1: { label: '🥐 100% Him on Weekends', percent: 74, count: 50 },
        option2: { label: '🧁 Needs more flour', percent: 18, count: 12 },
        option3: { label: '😂 Total plot twist!', percent: 8, count: 6 }
      }
    },
    reactions: {
      claps: 12,
      hearts: 34,
      fire: 15,
      rocket: 8
    },
    comments: []
  },
  {
    id: 'post-3',
    type: 'event',
    author: {
      name: 'Culture Committee',
      avatar: HUDDLE_ASSETS.userProfile,
      role: 'Social & Hangouts',
      desk: 'Floor 4'
    },
    timestamp: '3h ago',
    title: 'Happening Today',
    content: 'Unwind with board games, pizza, and fresh local IPA on the 4th floor terrace. Bringing Catan, Wingspan, and Mario Kart on the big projection wall.',
    eventDetails: {
      image: HUDDLE_ASSETS.boardGameEvent,
      title: 'Board Game & Craft Beer Thursday',
      timeLocation: 'Today @ 5:30 PM · 4th Floor Lounge',
      attendeesCount: 32,
      userAttending: false
    },
    reactions: {
      claps: 18,
      hearts: 42,
      fire: 28,
      rocket: 14
    },
    comments: []
  }
];
