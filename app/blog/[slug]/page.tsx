import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Sample journal entries data - replace with your actual data source
const journalEntries: Record<string, {
  title: string;
  date: string;
  mood: string;
  content: string;
  tags: string[];
}> = {
  'autumn-reflections': {
    title: 'Autumn Reflections',
    date: '2024-11-15',
    mood: 'Contemplative',
    content: `The leaves are falling, and I find myself thinking about change and letting go. There is something beautiful about how nature embraces transformation without resistance.

I walked through the park this morning, watching the golden and crimson leaves dance their way to the ground. Each one had its moment of glory on the branch, and now it surrenders to a new purpose. There is no clinging, no fear of the unknown. Just acceptance.

Why is it so hard for us humans to do the same? We hold onto things long past their season - relationships that no longer serve us, jobs that drain our spirit, versions of ourselves that we have outgrown. We fight change tooth and nail, as if staying the same could somehow keep us safe.

But safety is an illusion. The only constant is change, as cliche as that sounds. And maybe, just maybe, there is freedom in accepting that. In letting our own leaves fall when the time comes. In trusting that winter will give way to spring, and new growth will come in ways we cannot yet imagine.

I am learning to let go. Not perfectly, not gracefully, but intentionally. One leaf at a time.`,
    tags: ['life', 'nature', 'reflection']
  },
  'coffee-shop-moments': {
    title: 'Coffee Shop Moments',
    date: '2024-11-10',
    mood: 'Content',
    content: `Today I spent three hours at my favorite corner cafe, just watching the world go by. Sometimes the best moments are the quiet ones.

There is something magical about being alone in a crowded place. The gentle hum of conversation around you, the hiss of the espresso machine, the clinking of cups and spoons. You are separate, but still connected to the collective energy of human life happening all around you.

I ordered my usual - a cappuccino with oat milk and a chocolate croissant. The barista knows me now, just gives me a knowing smile when I walk in. These small rituals, these tiny recognitions, they matter more than we think.

I watched a young couple share a slice of cake, feeding each other bites and laughing. An elderly man sat in the corner doing a crossword puzzle, his brow furrowed in concentration. A woman with paint-stained fingers sketched in her notebook, lost in her own world.

All these little worlds, all these stories unfolding. And here I am, just observing, sipping my coffee, feeling grateful to witness it all. Not every day needs to be an adventure. Sometimes the adventure is in the stillness, in the noticing, in just being present.

This was a good day. A simple, quiet, perfect day.`,
    tags: ['daily life', 'moments', 'gratitude']
  },
  'on-creativity': {
    title: 'On Creativity and Fear',
    date: '2024-11-05',
    mood: 'Inspired',
    content: `I have been thinking a lot about what holds us back from creating. Is it fear of judgment? Fear of imperfection? Today I decided to let go.

For weeks, I have been staring at a blank canvas - literally and metaphorically. I had all these ideas swirling in my head, but every time I tried to bring them into reality, they felt inadequate. Not good enough. Not original enough. Not worthy of being seen.

But who decides what is worthy? Who gets to judge whether something deserves to exist? The answer, I realized, is that the act of creation itself is enough. The thing does not have to be perfect. It does not have to be revolutionary. It just has to be honest.

So today, I painted. Not well, not skillfully, but truthfully. I let my hand move without overthinking every brushstroke. I used colors that felt right, even if they clashed. I created something that probably would not win any awards or impress any critics.

And it felt liberating.

We have been taught to believe that only the best should be shared, that only expertise deserves a platform. But what if we are all just figuring it out as we go? What if the messy, imperfect attempts are just as valuable as the polished final products?

I am choosing to create anyway. Despite the fear, despite the doubt, despite the voice that says I am not ready yet. Because waiting for perfect conditions is just another form of hiding.

Start messy. Start scared. Just start.`,
    tags: ['creativity', 'personal growth', 'thoughts']
  },
  'rainy-sunday': {
    title: 'A Rainy Sunday',
    date: '2024-10-28',
    mood: 'Peaceful',
    content: `Rain tapping on the windows, a warm blanket, and a good book. Some days do not need to be productive to be meaningful.

We live in a world that glorifies hustle, that measures worth in output and achievement. But today, I rebelled against all of that. I did nothing, and it was everything.

I woke up to the sound of rain. Not the angry, thunderous kind, but the gentle, persistent rhythm that seems to slow time itself. I made tea, wrapped myself in my coziest blanket, and settled into the window seat with a novel I have been meaning to read for months.

No agenda. No to-do list. No guilt about the emails I was not answering or the chores I was not doing. Just me, the rain, and the story unfolding in my hands.

There is a particular kind of peace that comes with giving yourself permission to rest. Not the exhausted collapse at the end of a draining week, but the intentional choice to simply be. To let the world keep spinning without your participation for a few hours.

I watched raindrops race down the window pane. I listened to the way the rain changed pitch against different surfaces. I got lost in someone else's imagination and found pieces of myself there.

By evening, I had not accomplished anything tangible. No crossed-off tasks, no progress reports. But I felt full. Restored. Ready to meet the week ahead.

Maybe that is the most productive thing we can do sometimes - nothing at all.`,
    tags: ['weekend', 'self-care', 'simple pleasures']
  },
  'conversations-with-strangers': {
    title: 'Conversations with Strangers',
    date: '2024-10-20',
    mood: 'Curious',
    content: `Had the most unexpected conversation with someone at the bus stop today. It reminded me that everyone has a story worth hearing.

I was running late, annoyed at having to take the bus because my car was in the shop. Standing there checking my phone impatiently when an older woman next to me commented on the weather. I almost gave her a polite but dismissive response - you know, the kind that shuts down further conversation.

But something made me pause. Maybe it was the kindness in her eyes, or the fact that she seemed genuinely interested in connection rather than just filling silence. So I put my phone away and actually talked to her.

Turns out, she was a retired teacher who had taught for 35 years. She told me about students she still thinks about, about the letters she has kept from kids who thanked her years later. About how the education system has changed, but the fundamental need for someone to believe in you stays the same.

She asked about my life with genuine curiosity. Not the superficial "what do you do" questions, but real questions. What makes me happy? What am I afraid of? What did I want to be when I was little?

We talked for 20 minutes, maybe more. By the time her bus came, I felt like I had known her for years. We exchanged warm goodbyes, knowing we would probably never see each other again, but grateful for this unexpected moment of true connection.

It made me think about all the conversations I avoid, all the connections I miss because I am too buried in my own world. How many stories am I walking past every day? How many opportunities for perspective, for wisdom, for simply remembering that we are all just humans trying to figure this out?

I want to be more open. More present. More willing to see the person behind the stranger.`,
    tags: ['people', 'connection', 'life lessons']
  },
  'midnight-thoughts': {
    title: 'Midnight Thoughts',
    date: '2024-10-12',
    mood: 'Introspective',
    content: `It is 2 AM and sleep evades me. My mind wanders through memories and dreams, weaving them together in ways that only the quiet hours allow.

There is something about the night that makes you more honest with yourself. Maybe it is the darkness that feels safe, like a confessional. Maybe it is the exhaustion that lowers your defenses. Whatever it is, I find myself thinking thoughts I usually keep at bay during daylight hours.

I am thinking about the person I thought I would become versus the person I actually am. Not in a disappointed way, just observing the divergence. The dreams I have let go of, the new ones that have taken their place. The parts of myself that remain constant and the parts that are unrecognizable from ten years ago.

I am thinking about love - the romantic kind, the friendship kind, the love for yourself kind. How they all require different things from you. How you can be so full of love for others and still struggle to offer that same grace to yourself.

I am thinking about my parents getting older, about time passing in a way that feels both too fast and too slow. About legacy and what we leave behind. About whether any of it matters or if that is the wrong question entirely.

The house is silent except for the hum of the refrigerator downstairs. The world feels very small and very large at the same time. I am just one person, lying awake in one room, in one city, on one planet. And yet my thoughts can travel anywhere.

I wonder if anyone else is awake right now, having their own midnight reckoning with existence. Probably. That is somehow comforting - the idea that insomnia connects us all in this strange, invisible way.

Maybe I will sleep soon. Or maybe I will just be tired tomorrow and that will be okay too. Not everything needs to be fixed or solved or understood. Sometimes you just sit with the questions and let them be.

The night holds space for all of it.`,
    tags: ['thoughts', 'night', 'reflection']
  }
};

export async function generateStaticParams() {
  return Object.keys(journalEntries).map((slug) => ({
    slug,
  }));
}

export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = journalEntries[params.slug];

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf8f5' }}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm mb-8 hover:underline"
          style={{ color: '#c67b5c' }}
        >
          ← Back to all entries
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <time dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className="px-3 py-1 rounded-full text-xs" style={{
                backgroundColor: '#c67b5c',
                color: '#faf8f5'
              }}>
                Feeling: {entry.mood}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif mb-6" style={{ color: '#c67b5c' }}>
              {entry.title}
            </h1>

            <div className="h-px" style={{ backgroundColor: '#c67b5c', opacity: 0.3 }} />
          </header>

          <div className="prose prose-lg max-w-none">
            {entry.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-gray-700 leading-relaxed"
                style={{ textAlign: 'justify' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-12 pt-8 border-t" style={{ borderColor: '#c67b5c', opacity: 0.3 }}>
            <div className="flex gap-2 flex-wrap">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded"
                  style={{ backgroundColor: '#f0e8e0', color: '#8b5a3c' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>

        <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: '#f0e8e0' }}>
          <p className="text-sm text-gray-600 italic">
            Thank you for reading my thoughts. If this resonated with you, I would love to hear from you.
            <Link href="/contact" className="ml-1 font-medium hover:underline" style={{ color: '#c67b5c' }}>
              Get in touch
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
