import { useState, useEffect } from 'react'
import './App.css'

const ALL_QUESTIONS = [
  { q: "কুরআনে মোট কতটি সূরা আছে?", opts: ["১১০", "১১৪", "১২০", "১০৫"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনের সবচেয়ে বড় সূরা কোনটি?", opts: ["আল-ফাতিহা", "আল-বাকারা", "আল-ইখলাস", "ইয়াসিন"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনের সবচেয়ে ছোট সূরা কোনটি?", opts: ["আল-কাউসার", "আল-ইখলাস", "আন-নাস", "আল-ফালাক"], ans: 0, cat: "কুরআন" },
  { q: "কুরআনে কতটি পারা আছে?", opts: ["২৫", "২৮", "৩০", "৩৫"], ans: 2, cat: "কুরআন" },
  { q: "কুরআনের প্রথম সূরার নাম কী?", opts: ["আল-বাকারা", "আল-ফাতিহা", "আন-নাস", "ইয়াসিন"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনে কতটি আয়াত আছে?", opts: ["৬২৩৬", "৬২৩৮", "৬২৪০", "৬২৪২"], ans: 0, cat: "কুরআন" },
  { q: "কোন সূরাকে 'কুরআনের হৃদয়' বলা হয়?", opts: ["আল-ফাতিহা", "ইয়াসিন", "আর-রহমান", "আল-মুলক"], ans: 1, cat: "কুরআন" },
  { q: "কোন সূরায় বিসমিল্লাহ নেই?", opts: ["আত-তাওবা", "আল-ফাতিহা", "আল-ইখলাস", "আন-নাস"], ans: 0, cat: "কুরআন" },
  { q: "কুরআন নাজিল হয় কত বছরে?", opts: ["২০", "২৩", "২৫", "৩০"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনের প্রথম ওহি কোন সূরার?", opts: ["আল-ফাতিহা", "আলাক", "আল-বাকারা", "আল-মুদাসসির"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনের ৩০তম পারার নাম?", opts: ["আম্মা", "তাবারাকা", "কাদ সামিয়া", "ইকতারাবা"], ans: 0, cat: "কুরআন" },
  { q: "আল-ফাতিহা সূরায় কতটি আয়াত?", opts: ["৫", "৬", "৭", "৮"], ans: 2, cat: "কুরআন" },
  { q: "কুরআনের কোন সূরায় কুরআনের সারমর্ম?", opts: ["আল-বাকারা", "আল-ফাতিহা", "ইয়াসিন", "আল-মুলক"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনে সর্বাধিক বার কোন নাম এসেছে?", opts: ["মুহাম্মদ", "মূসা", "আল্লাহ", "ইব্রাহিম"], ans: 1, cat: "কুরআন" },
  { q: "কুরআনের ১৯তম পারার নাম?", opts: ["আম্মা", "ওয়াকালা", "কাদ আফলাহা", "আল-আহকাফ"], ans: 1, cat: "কুরআন" },

  { q: "হাদিস শব্দের অর্থ কী?", opts: ["কথা", "কাজ", "সম্মতি", "সবগুলো"], ans: 3, cat: "হাদিস" },
  { q: "সর্বাধিক হাদিস বর্ণনা করেছেন কে?", opts: ["আবু হুরায়রা (রা.)", "আনাস (রা.)", "আয়েশা (রা.)", "ইবনে উমর (রা.)"], ans: 0, cat: "হাদিস" },
  { q: "কুতুব সিত্তাহ মানে কী?", opts: ["ছয়টি বই", "পাঁচটি বই", "সাতটি বই", "চারটি বই"], ans: 0, cat: "হাদিস" },
  { q: "সহিহ বুখারির সংকলক কে?", opts: ["ইমাম মুসলিম", "ইমাম বুখারি", "ইমাম তিরমিজি", "ইমাম আবু দাউদ"], ans: 1, cat: "হাদিস" },
  { q: "সহিহ মুসলিমের সংকলক কে?", opts: ["ইমাম বুখারি", "ইমাম মুসলিম", "ইমাম নাসাই", "ইমাম ইবনে মাজাহ"], ans: 1, cat: "হাদিস" },
  { q: "মুত্তাফাকুন আলাইহি মানে কী?", opts: ["বুখারি ও মুসলিম", "বুখারি ও তিরমিজি", "মুসলিম ও আবু দাউদ", "তিরমিজি ও নাসাই"], ans: 0, cat: "হাদিস" },
  { q: "হাদিসে কুদসি কী?", opts: ["আল্লাহর বাণী", "নবীর বাণী", "সাহাবীর বাণী", "তাবেয়ির বাণী"], ans: 0, cat: "হাদিস" },
  { q: "সুনানু আবি দাউদের সংকলক কে?", opts: ["ইমাম আবু দাউদ", "ইমাম নাসাই", "ইমাম তিরমিজি", "ইমাম ইবনে মাজাহ"], ans: 0, cat: "হাদিস" },
  { q: "সহিহ হাদিসের শর্ত কতটি?", opts: ["৩", "৪", "৫", "৬"], ans: 2, cat: "হাদিস" },
  { q: "হাদিসের প্রকারভেদ কতটি?", opts: ["২", "৩", "৪", "৫"], ans: 1, cat: "হাদিস" },

  { q: "দৈনিক কত ওয়াক্ত নামাজ ফরজ?", opts: ["৩", "৪", "৫", "৬"], ans: 2, cat: "নামাজ" },
  { q: "ফজরের ফরজ রাকাত কত?", opts: ["২", "৩", "৪", "৫"], ans: 0, cat: "নামাজ" },
  { q: "জোহরের ফরজ রাকাত কত?", opts: ["২", "৩", "৪", "৫"], ans: 2, cat: "নামাজ" },
  { q: "আসরের ফরজ রাকাত কত?", opts: ["২", "৩", "৪", "৫"], ans: 2, cat: "নামাজ" },
  { q: "মাগরিবের ফরজ রাকাত কত?", opts: ["২", "৩", "৪", "৫"], ans: 1, cat: "নামাজ" },
  { q: "এশার ফরজ রাকাত কত?", opts: ["২", "৩", "৪", "৫"], ans: 2, cat: "নামাজ" },
  { q: "নামাজের প্রথম শর্ত কী?", opts: ["অজু", "তাকবির", "কিবলা", "নিয়ত"], ans: 0, cat: "নামাজ" },
  { q: "কিবলা কোন দিকে?", opts: ["পূর্ব", "পশ্চিম", "কাবা", "উত্তর"], ans: 2, cat: "নামাজ" },
  { q: "জুমার নামাজ কত রাকাত?", opts: ["২", "৩", "৪", "৫"], ans: 0, cat: "নামাজ" },
  { q: "নামাজে কতটি ফরজ আছে?", opts: ["৫", "৬", "৭", "৮"], ans: 2, cat: "নামাজ" },
  { q: "সিজদা কতবার প্রতি রাকাতে?", opts: ["১", "২", "৩", "৪"], ans: 1, cat: "নামাজ" },
  { q: "রুকু কতবার প্রতি রাকাতে?", opts: ["২", "৪", "৬", "৮"], ans: 0, cat: "নামাজ" },
  { q: "বিতর নামাজের হুকুম কী?", opts: ["ফরজ", "সুন্নত", "ওয়াজিব", "নফল"], ans: 2, cat: "নামাজ" },
  { q: "তাহাজ্জুদের নামাজ কখন?", opts: ["রাত", "ভোর", "দুপুর", "বিকাল"], ans: 0, cat: "নামাজ" },
  { q: "নামাজের মধ্যে কথা বলা কী?", opts: ["জায়েজ", "নামাজ ভেঙে যায়", "মাকরুহ", "সুন্নত"], ans: 1, cat: "নামাজ" },

  { q: "রোজা কোন মাসে ফরজ?", opts: ["শাওয়াল", "রমজান", "রজব", "শাবান"], ans: 1, cat: "রোজা" },
  { q: "রোজা ভাঙার সময়কে কী বলে?", opts: ["সাহরি", "ইফতার", "তারাবি", "কিয়াম"], ans: 1, cat: "রোজা" },
  { q: "রোজা রাখার আগের খাবার?", opts: ["ইফতার", "সাহরি", "তারাবি", "নফল"], ans: 1, cat: "রোজা" },
  { q: "রমজানে রাতে বিশেষ নামাজ?", opts: ["তাহাজ্জুদ", "তারাবি", "বিতর", "চাশত"], ans: 1, cat: "রোজা" },
  { q: "কাফফারা কী?", opts: ["৬০ রোজা", "৩০ রোজা", "১০ রোজা", "২ রোজা"], ans: 0, cat: "রোজা" },
  { q: "লাইলাতুল কদর কোন রাতে?", opts: ["২১", "২৩", "২৭", "বেজোড় রাতে"], ans: 3, cat: "রোজা" },
  { q: "রোজার প্রতিদান কে দেবেন?", opts: ["ফেরেশতা", "নবী", "আল্লাহ নিজে", "সাহাবী"], ans: 2, cat: "রোজা" },
  { q: "ইতিকাফ কী?", opts: ["মসজিদে অবস্থান", "রোজা", "নামাজ", "দান"], ans: 0, cat: "রোজা" },
  { q: "রমজানের পরের মাস?", opts: ["শাবান", "শাওয়াল", "রজব", "জিলকদ"], ans: 1, cat: "রোজা" },
  { q: "ঈদুল ফিতর কোন মাসে?", opts: ["রমজান", "শাওয়াল", "জিলহজ", "রজব"], ans: 1, cat: "রোজা" },
  { q: "ফিদিয়া কী?", opts: ["রোজার কাফফারা", "একজনের খাবার", "নামাজ", "দান"], ans: 1, cat: "রোজা" },
  { q: "সেহরি খাওয়ার সময়?", opts: ["রাত ২টা", "ভোর পর্যন্ত", "সন্ধ্যা", "দুপুর"], ans: 1, cat: "রোজা" },

  { q: "হজ কতবার ফরজ?", opts: ["১ বার", "২ বার", "৩ বার", "৫ বার"], ans: 0, cat: "হজ" },
  { q: "হজ কোন মাসে?", opts: ["রমজান", "জিলহজ", "শাওয়াল", "রজব"], ans: 1, cat: "হজ" },
  { q: "হজের মূল স্থান কোথায়?", opts: ["মদিনা", "মক্কা", "জেদ্দা", "তায়েফ"], ans: 1, cat: "হজ" },
  { q: "কাবা কোন শহরে?", opts: ["মদিনা", "মক্কা", "জেদ্দা", "তায়েফ"], ans: 1, cat: "হজ" },
  { q: "তাওয়াফ কতবার?", opts: ["৫", "৬", "৭", "৮"], ans: 2, cat: "হজ" },
  { q: "সাঈ কতবার?", opts: ["৫", "৬", "৭", "৮"], ans: 2, cat: "হজ" },
  { q: "আরাফাত কোন দিন?", opts: ["৮ জিলহজ", "৯ জিলহজ", "১০ জিলহজ", "১১ জিলহজ"], ans: 1, cat: "হজ" },
  { q: "উমরার সময়?", opts: ["নির্দিষ্ট", "যেকোনো", "শুধু রমজান", "শুধু জিলহজ"], ans: 1, cat: "হজ" },
  { q: "হজের ফরজ কতটি?", opts: ["২", "৩", "৪", "৫"], ans: 2, cat: "হজ" },
  { q: "কুরবানি কোন মাসে?", opts: ["রমজান", "জিলহজ", "শাওয়াল", "রজব"], ans: 1, cat: "হজ" },
  { q: "হাজরে আসওয়াদ কী?", opts: ["পাথর", "কাপড়", "দরজা", "স্তম্ভ"], ans: 0, cat: "হজ" },
  { q: "হজ কোন রুকন?", opts: ["১ম", "২য়", "৩য়", "৫ম"], ans: 3, cat: "হজ" },

  { q: "প্রথম নবী কে?", opts: ["আদম (আ.)", "নূহ (আ.)", "ইব্রাহিম (আ.)", "মুহাম্মদ (সা.)"], ans: 0, cat: "নবীগণ" },
  { q: "শেষ নবী কে?", opts: ["ঈসা (আ.)", "মুহাম্মদ (সা.)", "মূসা (আ.)", "ইব্রাহিম (আ.)"], ans: 1, cat: "নবীগণ" },
  { q: "মোট কতজন নবী?", opts: ["১ লক্ষ", "১ লক্ষ ২৪ হাজার", "২ লক্ষ", "৫০ হাজার"], ans: 1, cat: "নবীগণ" },
  { q: "কতজন রাসূল?", opts: ["৩১০", "৩১৩", "৩১৫", "৩২০"], ans: 1, cat: "নবীগণ" },
  { q: "নৌকা বানিয়েছিলেন কে?", opts: ["নূহ (আ.)", "ইব্রাহিম (আ.)", "মূসা (আ.)", "ঈসা (আ.)"], ans: 0, cat: "নবীগণ" },
  { q: "আগুনে পুড়েননি কে?", opts: ["নূহ (আ.)", "ইব্রাহিম (আ.)", "মূসা (আ.)", "ঈসা (আ.)"], ans: 1, cat: "নবীগণ" },
  { q: "লাঠি সাপ হয়েছিল কার?", opts: ["ঈসা (আ.)", "মূসা (আ.)", "ইব্রাহিম (আ.)", "নূহ (আ.)"], ans: 1, cat: "নবীগণ" },
  { q: "নবী মুহাম্মদ (সা.)-এর জন্ম কোথায়?", opts: ["মদিনা", "মক্কা", "তায়েফ", "জেদ্দা"], ans: 1, cat: "নবীগণ" },
  { q: "নবী (সা.)-এর পিতার নাম?", opts: ["আবু তালিব", "আবদুল্লাহ", "আব্দুল মুত্তালিব", "আবু লাহাব"], ans: 1, cat: "নবীগণ" },
  { q: "নবী (সা.)-এর মায়ের নাম?", opts: ["খাদিজা", "আমিনা", "ফাতিমা", "হালিমা"], ans: 1, cat: "নবীগণ" },
  { q: "প্রথম স্ত্রীর নাম?", opts: ["আয়েশা", "খাদিজা", "হাফসা", "উম্মে সালামা"], ans: 1, cat: "নবীগণ" },
  { q: "হিজরতের বছর?", opts: ["৬১০", "৬২২", "৬৩০", "৬৩২"], ans: 1, cat: "নবীগণ" },
  { q: "নবী (সা.) মৃত্যু কত সালে?", opts: ["৬২০", "৬৩০", "৬৩২", "৬৪০"], ans: 2, cat: "নবীগণ" },
  { q: "নবী (সা.)-এর সমাধি কোথায়?", opts: ["মক্কা", "মদিনা", "তায়েফ", "জেদ্দা"], ans: 1, cat: "নবীগণ" },
  { q: "ইউসুফ (আ.)-এর পিতা কে?", opts: ["ইয়াকুব (আ.)", "ইসহাক (আ.)", "ইব্রাহিম (আ.)", "নূহ (আ.)"], ans: 0, cat: "নবীগণ" },
  { q: "কোন নবীকে 'আবুল আম্বিয়া' বলা হয়?", opts: ["নূহ (আ.)", "ইব্রাহিম (আ.)", "মূসা (আ.)", "ঈসা (আ.)"], ans: 1, cat: "নবীগণ" },
  { q: "কোন নবীকে 'কালিমুল্লাহ' বলা হয়?", opts: ["নূহ (আ.)", "মূসা (আ.)", "ইব্রাহিম (আ.)", "ঈসা (আ.)"], ans: 1, cat: "নবীগণ" },
  { q: "কোন নবীকে 'রুহুল্লাহ' বলা হয়?", opts: ["ঈসা (আ.)", "মূসা (আ.)", "নূহ (আ.)", "ইব্রাহিম (আ.)"], ans: 0, cat: "নবীগণ" },
  { q: "সুলাইমান (আ.) কিসের উপর ক্ষমতা পেয়েছিলেন?", opts: ["পশু", "পাখি ও জ্বিন", "শুধু মানুষ", "শুধু জ্বিন"], ans: 1, cat: "নবীগণ" },
  { q: "ইউনুস (আ.) কোথায় ছিলেন?", opts: ["নৌকা", "মাছের পেটে", "পাহাড়ে", "মরুভূমিতে"], ans: 1, cat: "নবীগণ" },
  { q: "আইয়ুব (আ.) কী জন্য পরিচিত?", opts: ["ধৈর্য", "দান", "জ্ঞান", "যুদ্ধ"], ans: 0, cat: "নবীগণ" },
  { q: "ইসমাইল (আ.) কে ছিলেন?", opts: ["ইব্রাহিমের পুত্র", "ইসহাকের পুত্র", "ইয়াকুবের পুত্র", "নূহের পুত্র"], ans: 0, cat: "নবীগণ" },
  { q: "নবী (সা.)-এর দাদার নাম?", opts: ["আবু তালিব", "আবদুল মুত্তালিব", "আবদুল্লাহ", "আবু লাহাব"], ans: 1, cat: "নবীগণ" },
  { q: "নবী (সা.) কত বছর বয়সে নবুয়ত পান?", opts: ["৩০", "৩৫", "৪০", "৪৫"], ans: 2, cat: "নবীগণ" },
  { q: "নবী (সা.) কত বছর বয়সে ইন্তেকাল করেন?", opts: ["৬০", "৬৩", "৬৫", "৭০"], ans: 1, cat: "নবীগণ" },
];

const CATEGORIES = ['কুরআন', 'হাদিস', 'নামাজ', 'রোজা', 'হজ', 'নবীগণ'];

const THEMES = [
  { id: 'green', name: 'সবুজ', emoji: '🟢' },
  { id: 'black', name: 'কালো', emoji: '⚫' },
  { id: 'pink', name: 'গোলাপি', emoji: '🌸' },
  { id: 'white', name: 'সাদা', emoji: '⚪' },
  { id: 'red', name: 'লাল', emoji: '🔴' },
  { id: 'blue', name: 'নীল', emoji: '🔵' },
  { id: 'yellow', name: 'হলুদ', emoji: '🟡' },
  { id: 'purple', name: 'বেগুনি', emoji: '🟣' },
];

const CORRECT_MSGS = [
  "মাশাআল্লাহ! 🎉", "একদম ঠিক! 🔥", "তুমি তো জিনিয়াস! 🧠",
  "সাবাশ! ⭐", "এইটা তো সহজ ছিল! 😎", "বাহ! 🤲",
  "তুমি তো আলেম হয়ে যাচ্ছো! 📚", "চমৎকার! 🏆", "একদম ঠিক! 💯",
  "কি দারুণ! 🌟"
];

const WRONG_MSGS = [
  "উফফ! ভুল হয়ে গেল 😅", "আরে না! 🙈", "এটা তো জানা উচিত ছিল! 🤔",
  "হায় হায়! 😂", "ভুল! আরেকবার পড়ো! 📖", "না রে ভাই! 😆",
  "গুগল করে আসো! 🤣", "উফফ! সঠিক উত্তর ছিল", "মন খারাপ করো না 🥺",
  "পরেরবার হবে! 💪"
];

const FUNNY_FACTS = [
  "💡 কুরআন প্রথম নাজিল হয় রমজান মাসে!",
  "💡 নবী (সা.) ৬৩ বছর বেঁচে ছিলেন!",
  "💡 কুরআনের ১১৪টি সূরার ৮৬টি মক্কায় নাজিল!",
  "💡 আল-বাকারা কুরআনের সবচেয়ে বড় সূরা!",
  "💡 আবু হুরায়রা (রা.) ৫৩৭৪টি হাদিস বর্ণনা করেছেন!",
  "💡 তাওয়াফ হয় কাবার চারপাশে ৭ বার!",
  "💡 ইসলামে ৬টি ঈমান আনা ফরজ!",
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}function App() {
  const [screen, setScreen] = useState('home')
  const [selectedCat, setSelectedCat] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAns, setSelectedAns] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [theme, setTheme] = useState('green')
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [seenQuestions, setSeenQuestions] = useState([])
  const [bestScore, setBestScore] = useState({})
  const [funnyMsg, setFunnyMsg] = useState('')
  const [showAdPrompt, setShowAdPrompt] = useState(false)
  const [adPromptType, setAdPromptType] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [funnyFact, setFunnyFact] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('iq_theme')
    if (savedTheme) setTheme(savedTheme)
    const savedSeen = localStorage.getItem('iq_seen')
    if (savedSeen) setSeenQuestions(JSON.parse(savedSeen))
    const savedBest = localStorage.getItem('iq_best')
    if (savedBest) setBestScore(JSON.parse(savedBest))
    const initAd = () => {
      if (window.Adsgram) {
        try {
          window.AdController = window.Adsgram.init({ blockId: "54202" })
        } catch (e) { console.log(e) }
      } else {
        setTimeout(initAd, 500)
      }
    }
    initAd()
  }, [])

  useEffect(() => {
    localStorage.setItem('iq_theme', theme)
  }, [theme])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && screen === 'result' && adPromptType === 'complete') {
      if (selectedCat) startQuiz(selectedCat)
    }
  }, [countdown])

  const showAdNow = () => {
    if (window.AdController) {
      window.AdController.show().catch(() => {})
    }
  }

  const startQuiz = (category) => {
    let pool = ALL_QUESTIONS.filter(q => q.cat === category)
    const unseen = pool.filter(q => !seenQuestions.includes(q.q))
    const fresh = unseen.length >= 5 ? unseen : pool
    const shuffled = shuffleArray(fresh).slice(0, 10)
    const finalQs = shuffled.map(q => {
      const indexed = q.opts.map((opt, i) => ({ opt, orig: i }))
      const mixed = shuffleArray(indexed)
      return {
        ...q,
        opts: mixed.map(x => x.opt),
        ans: mixed.findIndex(x => x.orig === q.ans)
      }
    })
    setQuestions(finalQs)
    setSelectedCat(category)
    setCurrentQ(0)
    setScore(0)
    setSelectedAns(null)
    setAnswered(false)
    setCountdown(0)
    setFunnyMsg('')
    setScreen('quiz')
  }

  const handleAnswer = (idx) => {
    if (answered) return
    setSelectedAns(idx)
    setAnswered(true)
    const correct = idx === questions[currentQ].ans
    if (correct) {
      setScore(s => s + 1)
      setFunnyMsg(CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)])
    } else {
      setFunnyMsg(WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)])
    }
    const qText = questions[currentQ].q
    if (!seenQuestions.includes(qText)) {
      const updated = [...seenQuestions, qText]
      setSeenQuestions(updated)
      localStorage.setItem('iq_seen', JSON.stringify(updated))
    }
    const isLast = currentQ + 1 >= questions.length
    const nextQNum = currentQ + 1
    const shouldShowAd = !correct || (nextQNum % 3 === 0 && !isLast)
    setTimeout(() => {
      if (isLast) {
        const finalScore = correct ? score + 1 : score
        const prev = bestScore[selectedCat] || 0
        if (finalScore > prev) {
          const updated = { ...bestScore, [selectedCat]: finalScore }
          setBestScore(updated)
          localStorage.setItem('iq_best', JSON.stringify(updated))
        }
        setFunnyFact(FUNNY_FACTS[Math.floor(Math.random() * FUNNY_FACTS.length)])
        setScreen('result')
        setAdPromptType('complete')
        setCountdown(8)
      } else if (shouldShowAd) {
        setAdPromptType(correct ? 'progress' : 'wrong')
        setShowAdPrompt(true)
      } else {
        setCurrentQ(c => c + 1)
        setSelectedAns(null)
        setAnswered(false)
        setFunnyMsg('')
      }
    }, 1500)
  }

  const handleAdPromptClose = () => {
    setShowAdPrompt(false)
    showAdNow()
    setTimeout(() => {
      setCurrentQ(c => c + 1)
      setSelectedAns(null)
      setAnswered(false)
      setFunnyMsg('')
      setAdPromptType('')
    }, 500)
  }

  const handleSkipAd = () => {
    setShowAdPrompt(false)
    setCurrentQ(c => c + 1)
    setSelectedAns(null)
    setAnswered(false)
    setFunnyMsg('')
    setAdPromptType('')
  }

  const renderHome = () => (
    <div className="home">
      <div className="header">
        <div className="title-wrap">
          <span className="icon">🕌</span>
          <h1>Islamic Quiz BD</h1>
          <p>ইসলামিক জ্ঞান পরীক্ষা করুন</p>
        </div>
        <button className="theme-btn" onClick={() => setShowThemeMenu(!showThemeMenu)}>
          {THEMES.find(t => t.id === theme)?.emoji}
        </button>
      </div>

      {showThemeMenu && (
        <div className="theme-menu">
          <p className="theme-title">🎨 থিম সিলেক্ট করুন</p>
          <div className="theme-grid">
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`theme-option ${theme === t.id ? 'active' : ''}`}
                onClick={() => { setTheme(t.id); setShowThemeMenu(false) }}
              >
                <span className="theme-emoji">{t.emoji}</span>
                <span className="theme-name">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-box">
          <h3>{seenQuestions.length}</h3>
          <p>দেখা হয়েছে</p>
        </div>
        <div className="stat-box">
          <h3>{ALL_QUESTIONS.length}</h3>
          <p>মোট প্রশ্ন</p>
        </div>
      </div>

      <h2 className="section-heading">📚 ক্যাটাগরি সিলেক্ট করুন</h2>
      <div className="cat-grid">
        {CATEGORIES.map(cat => {
          const best = bestScore[cat] || 0
          const total = ALL_QUESTIONS.filter(q => q.cat === cat).length
          return (
            <button key={cat} className="cat-card" onClick={() => startQuiz(cat)}>
              <span className="cat-name">{cat}</span>
              <span className="cat-info">{total}টি প্রশ্ন</span>
              {best > 0 && <span className="cat-best">⭐ Best: {best}/10</span>}
            </button>
          )
        })}
      </div>

      <button className="watch-ad-btn" onClick={showAdNow}>
        📺 Ad দেখে সাপোর্ট করুন
      </button>
    </div>
  )

  const renderQuiz = () => {
    const q = questions[currentQ]
    if (!q) return null
    const progress = ((currentQ + 1) / questions.length) * 100
    return (
      <div className="quiz">
        <div className="quiz-header">
          <button className="back-btn" onClick={() => setScreen('home')}>←</button>
          <div className="quiz-info">
            <span>{selectedCat}</span>
            <span>প্রশ্ন {currentQ + 1}/{questions.length}</span>
          </div>
          <div className="score-badge">⭐ {score}</div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="question-box">
          <p className="question-text">{q.q}</p>
        </div>

        <div className="options">
          {q.opts.map((opt, idx) => {
            let cls = 'option'
            if (answered) {
              if (idx === q.ans) cls += ' correct'
              else if (idx === selectedAns) cls += ' wrong'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                <span className="opt-letter">{['ক', 'খ', 'গ', 'ঘ'][idx]}</span>
                <span className="opt-text">{opt}</span>
              </button>
            )
          })}
        </div>

        {funnyMsg && (
          <div className={`funny-toast ${selectedAns === questions[currentQ].ans ? 'correct-toast' : 'wrong-toast'}`}>
            {funnyMsg}
          </div>
        )}

        {showAdPrompt && (
          <div className="ad-modal">
            <div className="ad-modal-content">
              <span className="ad-modal-icon">{adPromptType === 'wrong' ? '😅' : '🎯'}</span>
              <h3>{adPromptType === 'wrong' ? 'ভুল উত্তর!' : 'সাবাশ!'}</h3>
              <p>পরের প্রশ্নে যেতে ছোট একটা Ad দেখুন</p>
              <button className="ad-btn-primary" onClick={handleAdPromptClose}>
                📺 Ad দেখুন
              </button>
              <button className="ad-btn-skip" onClick={handleSkipAd}>
                Ad Skip করুন →
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderResult = () => {
    const percent = (score / questions.length) * 100
    let message = ''
    let emoji = ''
    if (percent >= 80) { message = 'মাশাআল্লাহ! তুমি তো জিনিয়াস! 🧠'; emoji = '🌟' }
    else if (percent >= 60) { message = 'ভালো করেছ! আরও চেষ্টা কর!'; emoji = '👏' }
    else if (percent >= 40) { message = 'হুম, আরও পড়াশোনা দরকার!'; emoji = '📖' }
    else { message = 'উফফ! আরও শিখতে হবে ভাই! 😅'; emoji = '💪' }

    return (
      <div className="result">
        <div className="result-card">
          <span className="result-emoji">{emoji}</span>
          <h2>Quiz সম্পূর্ণ!</h2>
          <div className="score-circle">
            <span className="score-num">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <p className="result-msg">{message}</p>

          {funnyFact && (
            <div className="funny-fact">
              <p>{funnyFact}</p>
            </div>
          )}

          {countdown > 0 && (
            <div className="auto-restart">
              <p>⏱️ নতুন Quiz শুরু হবে {countdown} সেকেন্ডে...</p>
            </div>
          )}

          <div className="result-actions">
            <button className="btn-primary" onClick={() => startQuiz(selectedCat)}>
              🔄 আবার খেলুন
            </button>
            <button className="btn-secondary" onClick={() => { setCountdown(0); setScreen('home') }}>
              🏠 হোম
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`app theme-${theme}`}>
      {screen === 'home' && renderHome()}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'result' && renderResult()}
    </div>
  )
}

export default App
