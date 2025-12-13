import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please add your OpenAI API key to .env.local')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate a personal journal entry using OpenAI
 */
export async function generateJournalEntry(prompt: string, tone = 'warm and intimate') {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a thoughtful personal journal writer. Write in a ${tone} tone that feels authentic,
          vulnerable, and reflective. Use natural, conversational language as if writing in a personal diary.
          Include sensory details, personal observations, and genuine emotions. Avoid cliches and write with
          sincerity and depth.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating journal entry:', error)
    throw new Error('Failed to generate journal entry')
  }
}

/**
 * Generate an excerpt from full journal content
 */
export async function generateExcerpt(content: string, maxLength = 150) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Create a compelling excerpt that captures the essence of this journal entry. Make it intriguing and personal.'
        },
        {
          role: 'user',
          content: `Create a ${maxLength}-character excerpt from this journal entry:\n\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating excerpt:', error)
    throw new Error('Failed to generate excerpt')
  }
}

/**
 * Suggest tags for a journal entry
 */
export async function suggestTags(title: string, content: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Suggest 3-5 relevant tags for this journal entry. Return only the tags as a comma-separated list.'
        },
        {
          role: 'user',
          content: `Title: ${title}\n\nContent: ${content}`
        }
      ],
      temperature: 0.5,
      max_tokens: 50,
    })

    const tagsString = completion.choices[0].message.content || ''
    return tagsString.split(',').map(tag => tag.trim())
  } catch (error) {
    console.error('Error suggesting tags:', error)
    throw new Error('Failed to suggest tags')
  }
}

/**
 * Generate a journal entry title from a prompt or content
 */
export async function generateTitle(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Create a thoughtful, personal journal entry title. Make it intimate and reflective, not clickbait-y. Keep it under 60 characters.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 30,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating title:', error)
    throw new Error('Failed to generate title')
  }
}

/**
 * Enhance journal writing with AI suggestions
 */
export async function enhanceWriting(content: string, instruction: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful writing assistant for personal journaling. Maintain the author\'s authentic voice while providing thoughtful enhancements.'
        },
        {
          role: 'user',
          content: `${instruction}\n\nOriginal text:\n${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error enhancing writing:', error)
    throw new Error('Failed to enhance writing')
  }
}

/**
 * Generate reflective prompts for journaling
 */
export async function generateJournalPrompts(category = 'general', count = 5) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Generate thoughtful, introspective journal prompts that encourage deep reflection and personal growth.'
        },
        {
          role: 'user',
          content: `Generate ${count} journal prompts for the category: ${category}`
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating prompts:', error)
    throw new Error('Failed to generate journal prompts')
  }
}
