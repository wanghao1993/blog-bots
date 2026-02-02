# AI Features Guide

This blog includes powerful AI features powered by DeepSeek, including content translation and summarization.

## 🔧 Setup

### 1. Get Your DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Add your API key to `.env`:

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

**Important**: Never commit your API key to version control. The `.env` file is already in `.gitignore`.

## ✨ Features

### 🌐 AI Translation

The AI translation feature allows readers to translate blog posts between English and Chinese with a single click.

**How it works:**
1. Click the "AI Translate" button on any blog post
2. DeepSeek AI translates the entire content while preserving:
   - Markdown formatting
   - Code blocks
   - Links and images
   - Headings and lists
3. The translated content replaces the original on the page
4. Click "Reset to Original" to restore the original content

**Translation Quality:**
- Uses DeepSeek's `deepseek-chat` model
- Optimized prompts for technical content
- Preserves all formatting and code syntax
- Natural, fluent translations

### 📝 AI Summary

Generate concise summaries of blog posts instantly.

**How it works:**
1. Click the "AI Summary" button on any blog post
2. DeepSeek AI analyzes the content and generates a 150-word summary
3. The summary appears below the buttons
4. Multiple summaries can be generated for the same post

**Summary Quality:**
- Captures key points and main ideas
- Respects the content language (English/Chinese)
- Concise and informative
- Perfect for quick content overview

## 🛠️ Technical Details

### API Routes

Two API routes handle AI features:

1. **`/api/ai/translate`**
   - Endpoint: `POST /api/ai/translate`
   - Input: `{ content: string, targetLocale: 'en' | 'zh' }`
   - Output: `{ translation: string }`

2. **`/api/ai/summary`**
   - Endpoint: `POST /api/ai/summary`
   - Input: `{ content: string, locale: 'en' | 'zh' }`
   - Output: `{ summary: string }`

### DeepSeek Configuration

```typescript
const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});
```

We use the OpenAI SDK with DeepSeek's base URL for compatibility.

### Model Used

- **Model**: `deepseek-chat`
- **Temperature**: 0.3 (for consistent, accurate results)
- **Max Tokens**: 300 (for summaries)

## 🎨 User Experience

### Translation Flow

1. **Before Translation**: Original content is displayed
2. **During Translation**: Loading state with disabled buttons
3. **After Translation**: 
   - Translated content replaces original
   - "Reset to Original" button appears
   - Info banner shows translation status
   - "AI Translate" button is disabled

### Summary Flow

1. **Click Summary**: Button shows "Loading..."
2. **Response Received**: Summary appears in a styled card below buttons
3. **Summary Displayed**: Professional card with icon and formatted text

## 💡 Best Practices

### For Users

- **Translation**: Best for reading content in your preferred language
- **Summary**: Quick overview before reading full article
- **Cost**: Each translation/summary uses AI credits

### For Developers

1. **Error Handling**: All API routes include try-catch blocks
2. **Loading States**: Prevent duplicate requests during processing
3. **API Key Security**: Always use environment variables
4. **Rate Limiting**: Consider implementing rate limiting for production

## 🔒 Security

- API keys are stored securely in environment variables
- Never exposed to client-side code
- All API calls are server-side only
- No user data is stored or logged

## 📊 Cost Management

DeepSeek pricing is very competitive:
- Translation: ~0.1-0.3 credits per post
- Summary: ~0.05-0.1 credits per post

**Tips to manage costs:**
1. Set up API usage alerts in DeepSeek dashboard
2. Implement caching for frequently requested translations
3. Consider rate limiting per user/IP
4. Monitor API usage regularly

## 🐛 Troubleshooting

### "DeepSeek API key not configured" Error

**Solution**: Add `DEEPSEEK_API_KEY` to your `.env` file and restart the dev server.

### Translation Fails Silently

**Check:**
1. API key is valid and has credits
2. Content is not too long (DeepSeek has token limits)
3. Check browser console for errors
4. Verify network connectivity

### Poor Translation Quality

**Solutions:**
1. Adjust temperature in API route (lower = more consistent)
2. Modify system prompts for better context
3. Consider breaking very long posts into chunks

## 🚀 Future Enhancements

Possible improvements:
- [ ] Cache translations to reduce API calls
- [ ] Support more languages
- [ ] Streaming responses for better UX
- [ ] Translation history
- [ ] User preferences for translation style
- [ ] SEO optimization for translated content

## 📚 Resources

- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [DeepSeek Pricing](https://platform.deepseek.com/pricing)
- [OpenAI SDK Documentation](https://github.com/openai/openai-node)

---

Built with 🤖 DeepSeek AI
