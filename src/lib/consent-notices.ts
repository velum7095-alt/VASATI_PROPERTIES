export type ConsentLanguage = 'en' | 'kn' | 'hi';

export const CURRENT_CONSENT_VERSION = 'v1.0-2026-03';

export interface ConsentTextDefinition {
  title: string;
  summary: string;
  checkboxLabel: string;
  dataCollected: string;
  purpose: string;
  contactParty: string;
  withdrawalNotice: string;
}

export const CONSENT_NOTICES: Record<ConsentLanguage, {
  enquiry: ConsentTextDefinition;
  siteVisit: ConsentTextDefinition;
  whatsapp: ConsentTextDefinition;
}> = {
  en: {
    enquiry: {
      title: 'Consent for Property Enquiry (DPDP Act, 2023 Notice)',
      summary: 'Under the Digital Personal Data Protection Act, 2023, we require your explicit and unbundled consent before processing your contact details.',
      dataCollected: 'Data Collected: Your Full Name, Phone Number, and optional Email Address.',
      purpose: 'Specific Purpose: To answer your enquiry, share verified pricing/floor plans, and provide consultation strictly regarding this property/enquiry.',
      contactParty: 'Who will contact you: Authorized property advisors representing our Bangalore advisory team or verified RERA developer desk.',
      withdrawalNotice: 'Your Rights: You may withdraw this consent or request data erasure at any time via our User Rights portal (/contact) without penalty.',
      checkboxLabel: 'I give explicit consent for my name and phone number to be collected and used solely to contact me regarding this property enquiry in accordance with the DPDP Act, 2023.'
    },
    siteVisit: {
      title: 'Consent for Site Visit Scheduling',
      summary: 'Your contact details and preferred inspection schedule will be used exclusively to coordinate your physical or virtual property tour.',
      dataCollected: 'Data Collected: Full Name, Phone Number, optional Email, and Preferred Visit Date.',
      purpose: 'Specific Purpose: Booking and coordinating a verified on-site inspection with security gate pass clearance.',
      contactParty: 'Who will contact you: The site coordinator or authorized RERA relationship manager for this project.',
      withdrawalNotice: 'Your Rights: You may reschedule, cancel, or withdraw consent at any time via our User Rights portal.',
      checkboxLabel: 'I give explicit consent for my contact and visit details to be processed solely for coordinating this Bangalore property site visit under DPDP Act, 2023.'
    },
    whatsapp: {
      title: 'WhatsApp Click-to-Chat Opt-In Notice',
      summary: 'Before opening WhatsApp, please confirm that you wish to initiate a direct chat with our Bangalore advisory team.',
      dataCollected: 'Data Processed: Your WhatsApp mobile number and profile name during direct chat.',
      purpose: 'Specific Purpose: Instant chat support, sharing PDF brochures, and answering queries directly on WhatsApp.',
      contactParty: 'Who will message you: Official WhatsApp Business account of our Bangalore advisory team.',
      withdrawalNotice: 'TRAI DND & Opt-out: You can stop messages at any time by simply replying "STOP" or submitting a withdrawal request at /contact.',
      checkboxLabel: 'I opt-in to initiate communication via WhatsApp and confirm I want to receive property details on WhatsApp.'
    }
  },
  kn: {
    enquiry: {
      title: 'ಆಸ್ತಿ ವಿಚಾರಣೆಗಾಗಿ ಸಮ್ಮತಿ (ಡಿಪಿಡಿಪಿ ಕಾಯಿದೆ, 2023 ಸೂಚನೆ)',
      summary: 'ಡಿಜಿಟಲ್ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ 2023 ರ ಅಡಿಯಲ್ಲಿ, ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವ ಮೊದಲು ನಮಗೆ ನಿಮ್ಮ ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ ಅಗತ್ಯವಿದೆ.',
      dataCollected: 'ಸಂಗ್ರಹಿಸಲಾದ ವಿವರಗಳು: ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಐಚ್ಛಿಕ ಇಮೇಲ್.',
      purpose: 'ಉದ್ದೇಶ: ಈ ಆಸ್ತಿಯ ಬೆಲೆ, ವಿವರಗಳು ಮತ್ತು ಮಾಹಿತಿಯನ್ನು ನಿಮಗೆ ಒದಗಿಸಲು ಮಾತ್ರ.',
      contactParty: 'ಯಾರು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ: ನಮ್ಮ ಬೆಂಗಳೂರು ಆಸ್ತಿ ಸಲಹಾ ತಂಡದ ಅಧಿಕೃತ ಪ್ರತಿನಿಧಿಗಳು.',
      withdrawalNotice: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳು: ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ (/contact) ನಿಮ್ಮ ಸಮ್ಮತಿಯನ್ನು ಹಿಂಪಡೆಯಬಹುದು ಅಥವಾ ಡೇಟಾ ಅಳಿಸಲು ವಿನಂತಿಸಬಹುದು.',
      checkboxLabel: 'ಡಿಪಿಡಿಪಿ ಕಾಯಿದೆ 2023 ರ ಪ್ರಕಾರ ಈ ಆಸ್ತಿ ವಿಚಾರಣೆಗಾಗಿ ಮಾತ್ರ ನನ್ನ ಹೆಸರು ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಲು ನಾನು ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ ನೀಡುತ್ತೇನೆ.'
    },
    siteVisit: {
      title: 'ಸ್ಥಳ ಭೇಟಿ ನಿಗದಿಗಾಗಿ ಸಮ್ಮತಿ',
      summary: 'ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಸಂಘಟಿಸಲು ಮಾತ್ರ ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.',
      dataCollected: 'ಸಂಗ್ರಹಿಸಲಾದ ವಿವರಗಳು: ಹೆಸರು, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಆದ್ಯತೆಯ ದಿನಾಂಕ.',
      purpose: 'ಉದ್ದೇಶ: ಆಸ್ತಿ ಪರಿಶೀಲನೆ ಮತ್ತು ಗೇಟ್ ಪಾಸ್ ವ್ಯವಸ್ಥೆ ಮಾಡಲು.',
      contactParty: 'ಯಾರು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ: ಅಧಿಕೃತ ಪ್ರಾಜೆಕ್ಟ್ ಸೈಟ್ ಸಂಯೋಜಕರು.',
      withdrawalNotice: 'ನಿಮ್ಮ ಹಕ್ಕುಗಳು: ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸಮ್ಮತಿಯನ್ನು ಹಿಂಪಡೆಯಬಹುದು.',
      checkboxLabel: 'ಬೆಂಗಳೂರು ಆಸ್ತಿ ಸೈಟ್ ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಲು ನನ್ನ ವಿವರಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ನಾನು ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ ನೀಡುತ್ತೇನೆ.'
    },
    whatsapp: {
      title: 'WhatsApp ಚಾಟ್ ಸಮ್ಮತಿ ಸೂಚನೆ',
      summary: 'WhatsApp ನಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಲು ದಯವಿಟ್ಟು ಸಮ್ಮತಿ ದೃಢೀಕರಿಸಿ.',
      dataCollected: 'ಡೇಟಾ: ನಿಮ್ಮ WhatsApp ಮೊಬೈಲ್ ಸಂಖ್ಯೆ.',
      purpose: 'ಉದ್ದೇಶ: ತ್ವರಿತ ಚಾಟ್ ಮತ್ತು ಬ್ರೋಷರ್ ಹಂಚಿಕೊಳ್ಳಲು ಮಾತ್ರ.',
      contactParty: 'ಯಾರು ಸಂದೇಶ ಕಳುಹಿಸುತ್ತಾರೆ: ನಮ್ಮ ಅಧಿಕೃತ ಬೆಂಗಳೂರು ವಾಟ್ಸಾಪ್ ವ್ಯಾಪಾರ ಖಾತೆ.',
      withdrawalNotice: 'ನಿರ್ಗಮನ: "STOP" ಎಂದು ಕಳುಹಿಸುವ ಮೂಲಕ ಅಥವಾ /contact ನಲ್ಲಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಸಂದೇಶಗಳನ್ನು ನಿಲ್ಲಿಸಬಹುದು.',
      checkboxLabel: 'WhatsApp ಮೂಲಕ ಆಸ್ತಿ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ಮತ್ತು ಚಾಟ್ ಪ್ರಾರಂಭಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ.'
    }
  },
  hi: {
    enquiry: {
      title: 'प्रॉपर्टी पूछताछ हेतु सहमति (DPDP अधिनियम, 2023 सूचना)',
      summary: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत, आपके संपर्क विवरण को प्रोसेस करने से पहले हमें आपकी स्पष्ट सहमति की आवश्यकता है।',
      dataCollected: 'एकत्रित डेटा: आपका पूरा नाम, मोबाइल नंबर और वैकल्पिक ईमेल।',
      purpose: 'विशिष्ट उद्देश्य: केवल इस प्रॉपर्टी के बारे में विवरण, मूल्य सूची साझा करने और आपसे संपर्क करने हेतु।',
      contactParty: 'कौन संपर्क करेगा: हमारी बेंगलुरु संपत्ति सलाहकार टीम के अधिकृत प्रतिनिधि।',
      withdrawalNotice: 'आपके अधिकार: आप किसी भी समय हमारे पोर्टल (/contact) पर जाकर अपनी सहमति वापस ले सकते हैं या डेटा हटाने का अनुरोध कर सकते हैं।',
      checkboxLabel: 'मैं DPDP अधिनियम, 2023 के अनुसार केवल इस प्रॉपर्टी पूछताछ के संबंध में अपने नाम और नंबर के उपयोग की स्पष्ट सहमति देता/देती हूँ।'
    },
    siteVisit: {
      title: 'साइट विजिट निर्धारण हेतु सहमति',
      summary: 'आपकी प्रॉपर्टी विजिट को व्यवस्थित करने के लिए आपके संपर्क विवरण का उपयोग किया जाएगा।',
      dataCollected: 'डेटा: नाम, फोन नंबर और पसंदीदा विजिट तिथि।',
      purpose: 'उद्देश्य: ऑन-साइट निरीक्षण और सुरक्षा पास व्यवस्थित करना।',
      contactParty: 'कौन संपर्क करेगा: प्रोजेक्ट के अधिकृत साइट समन्वयक।',
      withdrawalNotice: 'अधिकार: आप कभी भी अपनी सहमति वापस ले सकते हैं।',
      checkboxLabel: 'मैं इस बेंगलुरु प्रॉपर्टी साइट विजिट के समन्वय के लिए अपने विवरण संसाधित करने की स्पष्ट सहमति देता/देती हूँ।'
    },
    whatsapp: {
      title: 'WhatsApp चैट सहमति सूचना',
      summary: 'WhatsApp पर सीधी बातचीत शुरू करने से पहले कृपया अपनी सहमति की पुष्टि करें।',
      dataCollected: 'डेटा: आपका WhatsApp फोन नंबर।',
      purpose: 'उद्देश्य: तुरंत सहायता और पीडीएफ ब्रोशर प्राप्त करना।',
      contactParty: 'कौन संदेश भेजेगा: हमारा आधिकारिक बेंगलुरु व्हाट्सएप बिजनेस खाता।',
      withdrawalNotice: 'ऑप्ट-आउट: आप कभी भी "STOP" लिखकर या /contact पर संदेश रोक सकते हैं।',
      checkboxLabel: 'मैं WhatsApp पर प्रॉपर्टी विवरण प्राप्त करने और चैट शुरू करने के लिए सहमति देता/देती हूँ।'
    }
  }
};

export function getVerbatimConsentText(
  type: 'enquiry' | 'siteVisit' | 'whatsapp',
  lang: ConsentLanguage,
  propertyTitle?: string
): string {
  const notice = CONSENT_NOTICES[lang][type];
  const propRef = propertyTitle ? ` Property: "${propertyTitle}".` : '';
  return `[Version: ${CURRENT_CONSENT_VERSION} | Language: ${lang.toUpperCase()}] ${notice.title}.${propRef} ${notice.dataCollected} ${notice.purpose} ${notice.contactParty} ${notice.withdrawalNotice} Checkbox Text: "${notice.checkboxLabel}"`;
}

