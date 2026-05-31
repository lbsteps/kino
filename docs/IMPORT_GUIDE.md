# Content Import Guide

## Legal Data Sources

Before importing content, ensure you have:

### 1. TMDB (The Movie Database)

**Advantages:**
- Free API access
- Comprehensive movie metadata
- Multi-language support
- Legal to use metadata

**How to use:**
1. Register at https://www.themoviedb.org/settings/api
2. Get your API key
3. Use the search and detail endpoints

**Terms:**
- Free for non-commercial use
- Must attribute TMDB in your app
- Rate limit: 40 requests/10 seconds

### 2. Wikidata

**Advantages:**
- Open knowledge base
- CC0 license (public domain)
- Structured movie data
- Multi-language descriptions

**How to use:**
```bash
https://www.wikidata.org/w/api.php?action=wbsearchentities&search=movie_title&language=en&format=json
```

### 3. Your Own Content

**Requirements:**
- Proof of ownership or distribution rights
- Copyright certificate or license agreement
- Metadata in your own language

**Process:**
1. Upload content via admin dashboard
2. Verify copyright information
3. Set appropriate restrictions
4. Publish when ready

### 4. Licensed Third-party APIs

**Examples:**
- Netflix-provided catalog (if you're a partner)
- Studio APIs (Disney+, Amazon Prime Video partner programs)
- Legal streaming platforms

**Requirements:**
- Written agreement
- API documentation
- Compliance with terms of service

## Import Methods

### 1. Manual Entry

**Use Case:** Small number of movies, precise control

1. Go to Admin Dashboard > Movies
2. Click "Add New Movie"
3. Fill in details in all languages
4. Upload media (posters, screenshots)
5. Add playback sources
6. Mark as "Legal Source"
7. Publish

### 2. TMDB Import

**Use Case:** Quick metadata import

```bash
POST /api/movies/import/tmdb
{
  "tmdbId": 550,
  "languages": ["en", "zh-CN", "kk", "ug"]
}
```

**What gets imported:**
- Title
- Description
- Rating
- Release date
- Cast and crew
- Genres
- Posters and backdrops

**What you must add:**
- Playback sources
- Kazakh/Uyghur translations
- Copyright information

### 3. Bulk Import

**Format:** CSV or JSON

**CSV Example:**
```csv
title_en,title_kk,title_ug,year,genre,tmdb_id,legal_source
The Matrix,The Matrix,The Matrix,1999,Sci-Fi,603,true
```

**JSON Example:**
```json
[
  {
    "title": {
      "en": "The Matrix",
      "kk": "The Matrix",
      "ug": "The Matrix"
    },
    "releaseDate": "1999-03-31",
    "genres": ["Sci-Fi", "Action"],
    "tmdbId": 603,
    "isLegal": true
  }
]
```

## Compliance Checklist

- [ ] Content source is legal and authorized
- [ ] Copyright/license information is documented
- [ ] Metadata accuracy verified
- [ ] All playback sources are legal
- [ ] No DRM bypassing techniques used
- [ ] Terms of service of external APIs followed
- [ ] Proper attribution given where required
- [ ] Content marked correctly (movie/tv)
- [ ] Rating/age classification added
- [ ] Language tags completed

## Language Codes

- `en` - English
- `zh-CN` - Simplified Chinese
- `zh-TW` - Traditional Chinese
- `kk` - Kazakh
- `ug` - Uyghur
- `ru` - Russian

## Troubleshooting

### TMDB API Errors

**Issue:** 401 Unauthorized
- **Solution:** Check your TMDB_API_KEY in .env

**Issue:** 404 Movie not found
- **Solution:** Verify the TMDB ID is correct

**Issue:** Rate limit exceeded
- **Solution:** Wait 10 seconds, then retry

### Import Failures

**Issue:** Validation errors
- **Solution:** Ensure all required fields are filled

**Issue:** Duplicate content
- **Solution:** Check if content already exists using title search
