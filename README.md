# Dear Diary - Personal Journal Blog Template

A warm, intimate personal blog design built with Next.js 14, featuring a cozy aesthetic perfect for personal journaling and storytelling.

## Features

- **Warm, Intimate Design**: Cream, brown, and terracotta color palette
- **Handwritten Typography**: Custom fonts for a personal touch
- **Responsive Layout**: Beautiful on all devices
- **MongoDB Integration**: Store journal entries and comments
- **AI-Powered Content**: OpenAI integration for content generation and writing assistance
- **Journal Entry Cards**: Beautifully styled entry previews
- **Author Introduction**: Personal bio section
- **Category Organization**: Organize entries by topic
- **Reading Time Estimates**: Help readers know what to expect
- **SEO Optimized**: Built-in metadata and semantic HTML

## Design Philosophy

This template embraces:
- Vulnerability and authenticity
- The beauty of everyday moments
- Slow, mindful living
- Personal growth and reflection
- Warm, welcoming aesthetics

## Color Palette

- **Cream** (#faf8f5) - Background, soft and inviting
- **Brown** (#8b7355) - Primary text and accents
- **Terracotta** (#c67b5c) - Links and highlights
- **Sage** (#a8b5a0) - Subtle accents
- **Charcoal** (#3a3a3a) - Body text

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Typography**: Google Fonts (Crimson Text, Caveat)
- **Database**: MongoDB
- **AI**: OpenAI GPT-4
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- OpenAI API key (optional, for AI features)

### Installation

1. Clone or download this template
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Add your environment variables:
   - MongoDB connection string
   - OpenAI API key (if using AI features)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
personal-journal/
├── app/
│   ├── layout.tsx          # Root layout with fonts and theme
│   ├── page.tsx            # Home page with intro and entries
│   └── globals.css         # Global styles and custom CSS
├── components/
│   ├── Header.tsx          # Navigation with handwritten branding
│   ├── Footer.tsx          # Footer with bio and links
│   ├── BlogCard.tsx        # Journal entry card component
│   └── AuthorIntro.tsx     # Personal introduction section
├── lib/
│   ├── db.ts              # MongoDB connection and helpers
│   └── openai.ts          # OpenAI integration for AI features
├── public/                # Static assets
└── Configuration files
```

## Key Components

### Header
- Handwritten "Dear Diary" branding
- Clean navigation
- Mobile-responsive menu

### BlogCard
- Journal entry style with dates
- Category tags
- Read more links
- Hover effects

### AuthorIntro
- Personal bio section
- Author image placeholder
- Interest tags
- Inspirational quote

### Footer
- Extended bio
- Social links
- Quick navigation
- Handwritten thank you message

## Customization

### Colors
Edit `tailwind.config.ts` and `app/globals.css` to change the color scheme.

### Fonts
Modify `app/layout.tsx` to use different Google Fonts or custom fonts.

### Content
Update sample content in `app/page.tsx` with your own journal entries.

### Author Info
Personalize `components/AuthorIntro.tsx` and `components/Footer.tsx` with your bio.

## Database Schema

### Journal Entries
```typescript
{
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: Date
  readTime: string
  slug: string
}
```

## AI Features

The template includes OpenAI integration for:
- Generate journal entries from prompts
- Create excerpts automatically
- Suggest relevant tags
- Generate titles
- Enhance writing
- Create journal prompts

See `lib/openai.ts` for all AI functions.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
This is a standard Next.js app and can be deployed to any platform that supports Node.js.

## Best Practices

- Write authentically and vulnerably
- Use sensory details in your entries
- Include personal observations
- Share both profound and mundane moments
- Be consistent with posting
- Engage with readers in comments

## Performance

- Optimized images with Next.js Image
- Server-side rendering for fast initial loads
- Static generation where possible
- Efficient MongoDB queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is free to use for personal and commercial projects.

## Support

For issues or questions about this template, please refer to the Next.js documentation or MongoDB guides.

## Credits

- Built with Next.js and Tailwind CSS
- Fonts from Google Fonts
- Icons from Heroicons

---

**Happy Journaling!** May your words flow freely and your stories touch hearts.
