# Social Media Embeds Guide

This document explains how social media embeds work in the Gold Phantom tools and how to optimize them for better link previews.

## How Social Media Embeds Work

When you share a link to Discord, Twitter, Facebook, or other platforms, they automatically scrape the webpage for metadata to create rich previews. This includes:

- **Title**: The page title that appears in the preview
- **Description**: A brief description of the content
- **Image**: A thumbnail image for the preview
- **URL**: The canonical URL of the page
- **Site Name**: The name of your website

## Current Implementation

The Gold Phantom tools use enhanced Open Graph and Twitter Card metadata to provide rich social media embeds:

### Enhanced Metadata Includes:

1. **Open Graph Tags** (Facebook, Discord, LinkedIn):

   - `og:title` - Tool title with game context
   - `og:description` - Detailed tool description
   - `og:image` - Tool-specific icon or hero image
   - `og:url` - Canonical URL
   - `og:site_name` - "Gold Phantom"
   - `og:type` - "website"
   - `og:locale` - "en_US"

2. **Twitter Card Tags**:

   - `twitter:card` - "summary_large_image"
   - `twitter:title` - Tool title
   - `twitter:description` - Tool description
   - `twitter:image` - Tool image
   - `twitter:site` - "@goldphantom"

3. **Additional Tags**:
   - `article:author` - "Gold Phantom"
   - `article:published_time` - Tool creation date
   - `article:modified_time` - Last updated date
   - `article:section` - Tool category
   - `article:tag` - Tool tags

## Tool Configuration

Each tool has enhanced SEO configuration in its `tool.config.ts` file:

```typescript
export const config: ToolConfig = {
  title: "Tool Name",
  description: "Basic description",
  // ... other config
  seo: {
    title: "Enhanced Title - Game Name | Gold Phantom",
    description: "Detailed description for social media embeds...",
    keywords: ["keyword1", "keyword2", "keyword3"],
    ogImage: "public/tool-icon.png",
  },
};
```

## Image Optimization

For best results, tool icons should be:

- **Square format** (1:1 aspect ratio)
- **Minimum 1200x1200 pixels** for high-quality embeds
- **PNG format** for transparency support
- **Under 1MB** for fast loading

## Testing Social Media Embeds

You can test how your links will appear using these tools:

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Discord**: Paste the link in a Discord channel to see the preview

## Best Practices

### 1. Descriptive Titles

Use titles that clearly indicate what the tool does:

- ✅ "Soul Level Calculator - Dark Souls Remastered | Gold Phantom"
- ❌ "Calculator"

### 2. Detailed Descriptions

Include specific functionality and benefits:

- ✅ "Calculate exactly how many souls you need to level up in Dark Souls Remastered. Find the total souls required to reach any level from your current level."
- ❌ "Calculate souls"

### 3. Relevant Keywords

Include game-specific and tool-specific keywords:

- `dark souls remastered`, `soul level`, `calculator`, `character progression`

### 4. High-Quality Images

Use clear, recognizable icons that represent the tool's function.

## Example Enhanced Config

```typescript
export const config: ToolConfig = {
  title: "Starting Class Optimizer",
  description:
    "Find the optimal starting class for your desired character stats and equipment",
  icon: "public/weapons.png",
  category: "planner",
  tags: ["starting-class-optimizer", "character-planner", "ds1", "planner"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "2025-06-22",
  gameCategory: "ds1",
  seo: {
    title: "Starting Class Optimizer - Dark Souls Remastered | Gold Phantom",
    description:
      "Find the optimal starting class for your Dark Souls Remastered build. Compare all 10 starting classes and see which one requires the fewest soul levels to reach your desired stats and equipment requirements.",
    keywords: [
      "starting class",
      "optimizer",
      "character planner",
      "dark souls",
      "ds1",
      "build planner",
      "soul level calculator",
      "character optimization",
      "dark souls remastered",
      "starting class comparison",
    ],
    ogImage: "public/weapons.png",
  },
};
```

## Troubleshooting

### Links Show Basic Preview

- Check that the tool config has enhanced SEO metadata
- Verify the `useToolLayout` composable is being called with the correct parameters
- Ensure the tool icon path is correct and accessible

### Images Not Showing

- Verify the image path is correct (should start with `/` for public files)
- Check that the image is accessible via direct URL
- Ensure the image meets size and format requirements

### Wrong Title/Description

- Check the tool config's SEO section
- Verify the `useToolLayout` call uses the correct title and description
- Clear any cached metadata using the social media debugging tools

## Future Enhancements

Potential improvements for even better social media embeds:

1. **Dynamic Images**: Generate custom preview images with tool results
2. **Rich Snippets**: Add structured data for better search engine results
3. **Video Previews**: Include short demo videos for complex tools
4. **Interactive Previews**: Add interactive elements to the preview cards
