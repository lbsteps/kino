# Multi-Language Configuration

## Supported Languages

| Code | Name | Native Name | Status |
|------|------|-------------|--------|
| en | English | English | ✅ Full |
| zh-CN | Simplified Chinese | 简体中文 | ✅ Full |
| kk | Kazakh | Қазақ | ✅ Full |
| ug | Uyghur | ئۇيغۇرچە | ✅ Full |
| ru | Russian | Русский | ⚠️ Partial |

## Backend i18n Configuration

### Adding Translations

**File:** `backend/src/i18n/translations.json`

```json
{
  "en": {
    "common": {
      "welcome": "Welcome to Kino CMS",
      "error": "An error occurred"
    }
  },
  "kk": {
    "common": {
      "welcome": "Kino CMS қосымшасына қош келдіңіз",
      "error": "Қате орын алды"
    }
  },
  "ug": {
    "common": {
      "welcome": "Kino CMS پروگراممىسىغا خوش كېلىپسىز",
      "error": "خاتالىق يۈز بەردى"
    }
  }
}
```

### Using Translations in Code

```typescript
import i18next from 'i18next';

// Get translation
const message = i18next.t('common.welcome', { lng: 'kk' });

// Change language
i18next.changeLanguage('ug');
```

## Frontend i18n Configuration

### React i18next Setup

**File:** `frontend/src/i18n/config.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import zhCnTranslations from './locales/zh-CN.json';
import kkTranslations from './locales/kk.json';
import ugTranslations from './locales/ug.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      'zh-CN': { translation: zhCnTranslations },
      kk: { translation: kkTranslations },
      ug: { translation: ugTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

function MovieCard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h2>{t('movie.title')}</h2>
      <button onClick={() => i18n.changeLanguage('kk')}>
        {t('languages.kazakh')}
      </button>
    </div>
  );
}
```

## Database Multilingual Fields

### Document Structure

```typescript
{
  title: {
    en: "The Matrix",
    "zh-CN": "黑客帝国",
    kk: "The Matrix",
    ug: "The Matrix"
  },
  description: {
    en: "A hacker discovers...",
    "zh-CN": "一个黑客发现...",
    kk: "Бір хакер табады...",
    ug: "بىر خاكىر تېپىدى..."
  }
}
```

## Kazakh Language Notes

- **Alphabet:** Latin-based (since 2023), formerly Cyrillic
- **Font Support:** Include fonts supporting Latin Kazakh
- **Font Family:** 'Segoe UI', 'Arial Unicode MS', sans-serif

### Common Kazakh Terms

- 🎬 Movie = Фильм
- 🎭 Actor = Актер
- 🎥 Director = Режиссер
- 📺 Series = Сериал
- 🎞️ Trailer = Трейлер

## Uyghur Language Notes

- **Script:** Arabic-based script (UCS)
- **Direction:** Right-to-left (RTL)
- **Font Support:** Include fonts like 'Microsoft YaHei', 'Arial Unicode MS'
- **CSS:** Add `direction: rtl` for Uyghur UI

### Common Uyghur Terms

- 🎬 Movie = فىلىم
- 🎭 Actor = سىنېمتچى
- 🎥 Director = كۆرسەتمىچى
- 📺 Series = سېرىيال
- 🎞️ Trailer = ئىلگىرى كۆرسىتىش

### CSS for RTL Support

```css
.uyghur-text {
  direction: rtl;
  text-align: right;
  font-family: 'Microsoft YaHei', 'Arial Unicode MS', sans-serif;
}

.language-selector {
  direction: ltr; /* Keep selector LTR */
}
```

## Date and Number Formatting

```typescript
const formatter = new Intl.DateTimeFormat('kk-KZ');
const date = formatter.format(new Date());
// Output: "2023-12-31"

const numberFormatter = new Intl.NumberFormat('ug-CN');
const number = numberFormatter.format(1000000);
// Output: "1,000,000"
```

## Testing Translations

### Missing Keys

Add logging to identify untranslated strings:

```typescript
i18next.on('missingKey', (lng, ns, key) => {
  console.warn(`Missing translation: ${lng}.${ns}.${key}`);
});
```

### Language Switching

Test all supported languages in admin panel:

1. Verify UI renders correctly
2. Check RTL support for Uyghur
3. Confirm encoding handles all characters
4. Test form submissions with special characters

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [Unicode Kazakh](https://en.wikipedia.org/wiki/Kazakh_language)
- [Unicode Uyghur](https://en.wikipedia.org/wiki/Uyghur_language)
- [IETF Language Tags](https://www.ietf.org/rfc/rfc5646.txt)
