# Content Blocks Guide

## Overview

This document describes all Payload CMS blocks used in the UAF Asia Pacific website. Blocks are reusable content components that can be added to pages, blogs, grants, reports, and multimedia content to create flexible, dynamic layouts.

## Block Organization

Blocks are organized into several categories:

1. **Content Blocks** - Text, rich content, and information display
2. **Call-to-Action Blocks** - Conversion-focused components
3. **Card & Grid Blocks** - Card-based layouts and grids
4. **Interactive Blocks** - FAQ, processes, comparisons
5. **Callout Blocks** - Visual callouts with background styles
6. **Media Blocks** - Embedded media content
7. **Utility Blocks** - Supporting blocks (not actively used)

---

## Active Content Blocks

### Rich Content Block

**File:** `src/blocks/RichContentBlock/config.ts`
**Slug:** `richContentBlock`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Full-featured rich text editor with embedded media support.

#### Purpose
- Long-form content
- Article bodies
- Rich formatted text
- Embedded media content

#### Features
- **Rich Text Editor** - Lexical editor with full formatting
- **Headings** - H2 through H6
- **Lists** - Ordered and unordered lists
- **Media Upload** - Inline images
- **Horizontal Rules** - Section dividers
- **Fixed Toolbar** - Always visible editing toolbar

#### Embedded Blocks
The Rich Content Block can contain:
- **BlockQuote** - Styled quotations
- **YouTubeBlock** - YouTube video embeds
- **VimeoBlock** - Vimeo video embeds
- **SpotifyTrackBlock** - Spotify track/playlist embeds
- **SoundCloudEmbedBlock** - SoundCloud audio embeds
- **FlourishBlock** - Interactive Flourish data visualisations (charts, maps, surveys)

#### Configuration
```typescript
{
  name: 'richText',
  type: 'richText',
  localized: true,
  // Lexical editor with multiple features
}
```

---

### Multi-Column Info Block

**File:** `src/blocks/MultiColumnInfoBlock/config.ts`
**Slug:** `mcolInfoBlock`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Display information in multiple columns for better content organization.

#### Purpose
- Side-by-side information
- Feature comparisons
- Multi-column layouts
- Organized content presentation

#### Key Fields
- **Columns** - Array of column content
  - Title
  - Description (rich text)
  - Optional icon/image

#### Configuration
- Minimum 2 columns
- Maximum 4 columns
- Responsive layout (stacks on mobile)

---

### Single Column Info Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/SingleColumnInfoBlock/config.ts`
**Slug:** `scolInfoBlk`
**Status:** ⚠️ Available but not enabled in any collection

Single-column information block with title, description, and optional buttons.

#### Purpose
- Simple content sections
- Standalone information
- Call-to-action with context

#### Key Fields
- **Title** - Section title
- **Description** - Rich text content
- **Buttons** - Optional CTA buttons

---

## Call-to-Action Blocks

### Secondary CTA

**File:** `src/blocks/SecondaryCTA/config.ts`
**Slug:** `secondarycta`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Flexible call-to-action block with multiple design variations.

#### Purpose
- Drive user actions
- Convert visitors
- Highlight important information
- Provide contact options

#### Design Variants

1. **Large Text CTA** (`lrg_txt_cta`)
   - H3 title, paragraph subtitle
   - Default style
   - Maximum visual impact

2. **Medium Text CTA** (`md_txt_cta`)
   - H4 title, H5 subtitle
   - Moderate emphasis

3. **Minimal CTA** (`min_cta`)
   - H5 title, paragraph subtitle
   - Top and bottom borders
   - Clean, subtle design

4. **Puffy Beige CTA** (`puffy_beige_cta`)
   - H3 title, paragraph subtitle
   - Beige background with organic shape
   - Warm, approachable feel

#### Key Fields
- **Title** - CTA heading (localized)
- **Subtitle** - Supporting text (localized)
- **UI Type** - Design variant selector
- **Contact** - Optional email contact
  - Label text
  - Email address
- **CTA Buttons** - 1-2 action buttons
  - Link configuration
  - Multiple link types supported

#### Features
- ✅ 4 visual design options
- ✅ 1-2 action buttons
- ✅ Optional contact information
- ✅ Fully localized

---

## Card & Grid Blocks

### Grant Card Grid Block

**File:** `src/blocks/GrantCardGridBlock/config.ts`
**Slug:** `grantCardGridBlock`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Display grant opportunities in a responsive grid layout.

#### Purpose
- Showcase grant programs
- Grant opportunity listings
- Program overviews
- Filterable grant displays

#### Key Fields
- **Title** - Grid section title
- **Description** - Section description
- **Grant Cards** - Relationship to GrantCards collection
  - Filters out closed grants automatically
  - Supports multiple cards
  - Reorderable

#### Features
- ✅ Auto-filters active grants only
- ✅ Responsive grid layout
- ✅ Relationship to GrantCards collection
- ✅ Drag-and-drop reordering

---

### Yellow Card Deck

**File:** `src/blocks/YellowCardDeck/config.ts`
**Slug:** `ylwDeck`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Display information cards with yellow/gold styling.

#### Purpose
- Highlight key points
- Feature lists
- Service offerings
- Information categories

#### Key Fields
- **Block Name** - Internal identifier
- **Title** - Deck title
- **Description** - Deck description
- **Alignment** - Left or center
- **Cards** - Array of card items
  - Card title
  - Card description
  - Optional icon

#### Features
- ✅ Flexible card count
- ✅ Alignment options
- ✅ Icon support
- ✅ Brand-colored styling

---

### Feature Card

**File:** `src/blocks/FeatureCard/config.ts`
**Slug:** `featCrd`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Large feature card with image, content, and call-to-action.

#### Purpose
- Highlight major features
- Story telling
- Impact showcases
- Featured content

#### Key Fields
- **Image** - Hero image for the card
- **Block Title** - Overall section title
- **Card Title** - Specific card title
- **Tags** - Content categorization tags
- **Description** - Rich text content
- **Link** - Optional CTA link

#### Features
- ✅ Full-width display
- ✅ Rich text support
- ✅ Multiple tags
- ✅ Image upload
- ✅ Link integration

---

### Feature Card Accordion

**File:** `src/blocks/FeatureCardAccordion/config.ts`
**Slug:** `featCrdAcc`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Collapsible accordion of feature cards.

#### Purpose
- Space-efficient content display
- Multiple feature presentation
- Progressive disclosure
- Organized information

#### Key Fields
- **Title** - Accordion section title
- **Block Name** - Internal identifier
- **Feature Cards** - Array of accordion items
  - Item title
  - Item content
  - Expandable/collapsible

#### Features
- ✅ Accordion interaction
- ✅ Multiple items
- ✅ Compact display
- ✅ Progressive disclosure

---

### Listing Card Deck

**File:** `src/blocks/ListingCardDeck/config.ts`
**Slug:** `listCrdDck`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Deck of listing cards with optional call-to-action buttons.

#### Purpose
- Resource listings
- Link collections
- Directory displays
- Content catalogs

#### Key Fields
- **Title** - Deck title
- **Cards** - Array of listing cards
  - Card title
  - Card description
  - Optional links
- **Buttons** - Optional CTA buttons

#### Features
- ✅ Multiple listing cards
- ✅ Optional buttons
- ✅ Grid or list layout
- ✅ Link support

---

## Interactive Blocks

### FAQ Block

**File:** `src/blocks/FaqBlock/config.ts`
**Slug:** `faqBlk`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Frequently Asked Questions accordion.

#### Purpose
- Answer common questions
- Self-service support
- Information architecture
- User guidance

#### Key Fields
- **Title** - FAQ section title
- **Description** - Section description
- **Link** - Optional external link
- **FAQs** - Array of Q&A pairs
  - Question text
  - Answer (rich text with links)

#### Features
- ✅ Accordion interface
- ✅ Rich text answers
- ✅ Internal linking support
- ✅ Unlimited Q&A pairs
- ✅ Localized content

---

### Multi-Step Process Block

**File:** `src/blocks/MultiStepProcessBlock/config.ts`
**Slug:** `mstepProcess`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Display processes, workflows, or step-by-step instructions.

#### Purpose
- Application processes
- How-to guides
- Workflow documentation
- Step-by-step instructions

#### Key Fields
- **Title** - Process title
- **Subtitle** - Process description
- **Steps** - Array of process steps
  - Step title
  - Step content
    - Content title
    - Icon selection
    - Details (bullet points in rich text)
    - Tips (additional info in rich text)

#### Icon Options
- Document (FileText)
- Time (Clock)
- Verification (ShieldCheck)
- Notification (Vote)
- Documentation (ScrollText)
- Funds (Banknote)
- Action (Rocket)
- Report (FileCheck)

#### Features
- ✅ Sequential numbering
- ✅ Icon support
- ✅ Rich text details
- ✅ Optional tips
- ✅ Internal linking
- ✅ Custom row labels

---

### Comparison Block

**File:** `src/blocks/ComparisonBlock/config.ts`
**Slug:** `comparisonBlk`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Side-by-side comparison of two options.

#### Purpose
- Feature comparisons
- Before/After
- Option evaluation
- Decision support

#### Key Fields
- **Title** - Comparison title
- **Description** - Context description
- **Buttons** - Optional CTA buttons
- **Left Column** - First comparison group
  - Column items
- **Right Column** - Second comparison group
  - Column items

#### Features
- ✅ Two-column layout
- ✅ Multiple comparison points
- ✅ Optional buttons
- ✅ Responsive (stacks on mobile)

---

## Callout Blocks

### Pink Puffy CallOut

**File:** `src/blocks/PinkPuffyCallOut/config.ts`
**Slug:** `pinkPuffy`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Eye-catching callout with pink organic background shape.

#### Purpose
- Highlight important information
- Statistics display
- Key metrics
- Attention-grabbing content

#### Key Fields
- **Title** - Main callout title
- **Subtitle** - Supporting text
- **Alignment** - Center or left aligned
- **Top Row** - Array of top items (max 3)
  - Item title
  - Item subtitle
  - Item description
- **Bottom Row** - Array of bottom items (max 3)
  - Item title
  - Item description
- **Links** - Optional CTA links (max 2)

#### Features
- ✅ Organic background shape
- ✅ Two-row layout
- ✅ Alignment options
- ✅ Multiple content items
- ✅ Optional links
- ✅ Responsive design

---

### Beige Puffy CallOut

**File:** `src/blocks/BeigePuffyCallOut/config.ts`
**Slug:** `beigePuffy`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Warm beige callout with organic background shape.

#### Purpose
- Soft highlighting
- Warm emphasis
- Alternative to pink callout
- Accessible attention-grabbing

#### Key Fields
- **Title** - Main callout title
- **Subtitle** - Supporting text
- **Alignment** - Center or left aligned
- **Items** - Array of content items
  - Item title
  - Item description

#### Features
- ✅ Beige organic background
- ✅ Alignment options
- ✅ Multiple items
- ✅ Warm, approachable design
- ✅ Responsive layout

---

### Funding Map

**File:** `src/blocks/FundingMap/config.ts`
**Slug:** `fundingMap`
**Used by:** Pages, Grants, Blog, Reports, MMedia

Interactive map displaying funding statistics by region.

#### Purpose
- Geographic funding data
- Regional statistics
- Impact visualization
- Data presentation

#### Regions Supported
- Asia & Pacific (uaf-asia-pacific)
- Afghanistan
- Australia
- Bangladesh
- Cambodia
- China
- India
- Indonesia
- Korea
- Laos
- Malaysia
- Mongolia
- Myanmar
- Nepal
- Pakistan
- Papua New Guinea
- Philippines
- Sri Lanka
- Thailand
- Vietnam

#### Key Fields
- **Title** - Map section title
- **Subtitle** - Description
- **Selector Label** - Dropdown label
- **Regions** - Array of funding regions
  - Region name (selector)
  - Statistics (1-3 items)
    - Stat number
    - Stat description

#### Features
- ✅ Interactive region selector
- ✅ Dynamic statistics display
- ✅ Map visualization
- ✅ Up to 3 stats per region
- ✅ Localized content

---

## Media Embed Blocks

These blocks are embedded within the Rich Content Block and cannot be used standalone.

### BlockQuote

**File:** `src/blocks/BlockQuote/config.ts`
**Slug:** `blockquote`
**Used within:** RichContentBlock only

Styled quotation block for emphasis.

#### Purpose
- Quote highlights
- Testimonials
- Pull quotes
- Emphasis

---

### YouTube Block

**File:** `src/blocks/YouTubeBlock/config.ts`
**Slug:** `youtubeEmbed`
**Used within:** RichContentBlock only

Embed YouTube videos inline.

#### Key Fields
- **Video URL** - YouTube video link
- **Video ID** - Extracted automatically

---

### Vimeo Block

**File:** `src/blocks/VimeoBlock/config.ts`
**Slug:** `vimeoEmbed`
**Used within:** RichContentBlock only

Embed Vimeo videos inline.

#### Key Fields
- **Video URL** - Vimeo video link
- **Video ID** - Extracted automatically

---

### Spotify Track Block

**File:** `src/blocks/SpotifyTrackBlock/config.ts`
**Slug:** `spotifyEmbed`
**Used within:** RichContentBlock only

Embed Spotify tracks, albums, or playlists.

#### Key Fields
- **Spotify URL** - Track/album/playlist link
- **Embed type** - Automatically detected

---

### SoundCloud Embed Block

**File:** `src/blocks/SoundCloudEmbedBlock/config.ts`
**Slug:** `soundcloudEmbed`
**Used within:** RichContentBlock only

Embed SoundCloud audio tracks.

#### Key Fields
- **Track URL** - SoundCloud track link
- **Track ID** - Extracted automatically

---

### Flourish Block

**File:** `src/blocks/FlourishBlock/config.ts`
**Slug:** `flourish-embed`
**Renderer:** `src/components/FlourishRenderer/index.tsx`
**Used within:** RichContentBlock only

Embed interactive Flourish data visualisations — charts, maps, surveys, and more.

#### Key Fields
- **Visualisation ID** - Numeric ID from the Flourish embed snippet (e.g. `28711202` from `data-src="visualisation/28711202"`)
- **Visualisation Type** - CSS class from the embed code (`flourish-chart`, `flourish-map`, `flourish-survey`, etc.)
- **Caption** - Optional localised caption below the chart
- **Height Override** - Optional fixed height (e.g. `600px`); leave blank for Flourish's responsive default

#### Behaviour
- Chart loads only when it scrolls into view (15% visibility threshold via `IntersectionObserver`)
- Scroll-in fade + slide-up CSS animation wraps Flourish's own chart entrance animation
- Flourish's "Made with Flourish" attribution link is hidden via `.flourish-credit { display: none }` in `globals.scss`
- Multiple Flourish blocks on one page share a single `embed.js` load; subsequent blocks call `window.Flourish.loadEmbeds()`

#### Editor Instructions
1. In a Rich Content Block, click `+` and select **"Flourish Visualisation"**
2. Paste only the **numeric ID** from the embed code (not the full URL)
3. Set Visualisation Type if it differs from `flourish-chart`
4. Optionally add a Caption or Height Override

See: [flourish-block-implementation-plan.md](./flourish-block-implementation-plan.md)

---

## Inactive/Unused Blocks

The following blocks exist in the codebase but are **NOT currently enabled** in any collection:

### CallToAction 🚫 NOT CURRENTLY USED

**File:** `src/blocks/CallToAction/config.ts`
**Status:** ⚠️ Available but not enabled

Legacy CTA block. Use **SecondaryCTA** instead, which offers more design options.

---

### Code Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/Code/config.ts`
**Status:** ⚠️ Available but not enabled

Code syntax highlighting block.

#### Potential Use
- Technical documentation
- Code examples
- Developer resources

---

### Content Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/Content/config.ts`
**Status:** ⚠️ Available but not enabled

Generic content block. Replaced by **RichContentBlock**.

---

### Form Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/Form/config.ts`
**Status:** ⚠️ Available but not enabled

Form builder block for custom forms.

#### Potential Use
- Contact forms
- Application forms
- Surveys
- Data collection

---

### Hero Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/HeroBlock/config.ts`
**Status:** ⚠️ Available but not enabled

Hero section block. Hero sections are configured at the collection level instead.

---

### Single Column Info Block 🚫 NOT CURRENTLY USED

**File:** `src/blocks/SingleColumnInfoBlock/config.ts`
**Status:** ⚠️ Available but not enabled

Single-column information display. Consider **MultiColumnInfoBlock** with one column or **RichContentBlock** instead.

---

## Block Usage by Collection

### All Collections (Pages, Grants, Blog, Reports, MMedia)

These blocks are available across all main content collections:

✅ **Rich Content Block** - Primary content editor
✅ **Secondary CTA** - Call-to-action blocks
✅ **Multi-Column Info Block** - Column layouts
✅ **Grant Card Grid Block** - Grant displays
✅ **Multi-Step Process** - Process workflows
✅ **Comparison Block** - Side-by-side comparisons
✅ **Yellow Card Deck** - Highlighted cards
✅ **Feature Card** - Large feature displays
✅ **Feature Card Accordion** - Collapsible features
✅ **Listing Card Deck** - List displays
✅ **FAQ Block** - Question & answer sections
✅ **Pink Puffy CallOut** - Eye-catching callouts
✅ **Beige Puffy CallOut** - Warm callouts
✅ **Funding Map** - Geographic data visualization

### Collection-Specific Notes

#### Pages
- Full block access
- Most flexible for custom layouts
- Used for landing pages and general content

#### Grants
- Same blocks as Pages
- Commonly uses Grant Card Grid and Multi-Step Process
- Process-focused layouts

#### Blog
- Same blocks as Pages
- Commonly uses Rich Content Block
- Feature Cards for story highlighting

#### Reports
- Same blocks as Pages
- Emphasis on data visualization
- Funding Map commonly used

#### MMedia
- Same blocks as Pages
- Rich Content Block for embedded media
- Feature Cards for media highlights

---

## Common Block Features

All blocks support these features:

### Localization
- ✅ Multi-language content
- ✅ Language fallback
- ✅ Per-field localization

### Admin Interface
- ✅ Block icons for quick identification
- ✅ Drag-and-drop reordering
- ✅ Collapsible block editor
- ✅ Custom row labels
- ✅ Field descriptions

### Responsive Design
- ✅ Mobile-first approach
- ✅ Automatic stacking on small screens
- ✅ Flexible grid systems
- ✅ Optimized touch interactions

---

## Best Practices

### Block Selection

1. **Use Rich Content Block for:**
   - Article content
   - Long-form text
   - Embedded media
   - General content

2. **Use Secondary CTA for:**
   - Conversion points
   - Newsletter signups
   - Contact prompts
   - Action triggers

3. **Use Callout Blocks for:**
   - Key statistics
   - Important announcements
   - Visual emphasis
   - Brand moments

4. **Use Card Blocks for:**
   - Feature lists
   - Service offerings
   - Content catalogs
   - Grid layouts

### Content Organization

1. **Start with structure**
   - Plan your page layout
   - Choose appropriate blocks
   - Consider user flow

2. **Use headings hierarchy**
   - Maintain logical heading order
   - Don't skip heading levels
   - Use semantic structure

3. **Optimize for scanning**
   - Break up long content
   - Use visual blocks
   - Add white space

4. **Think mobile-first**
   - Test on mobile devices
   - Ensure readability
   - Verify tap targets

### Performance

1. **Limit block count**
   - Fewer blocks = faster pages
   - Combine related content
   - Use efficient blocks

2. **Optimize images**
   - Compress before upload
   - Use appropriate sizes
   - Consider WebP format

3. **Test load times**
   - Check page speed
   - Optimize as needed
   - Monitor performance

---

## Block Development

### Adding New Blocks

1. Create block config in `src/blocks/[BlockName]/config.ts`
2. Define block schema and fields
3. Add to collections in `src/collections/[Collection]/index.ts`
4. Create React component in `src/components/[BlockName]/`
5. Add rendering logic in page components
6. Update this documentation

### Block Configuration Pattern

```typescript
import { Block } from 'payload'

export const MyBlock: Block = {
  slug: 'myBlock',
  labels: {
    singular: 'My Block',
    plural: 'My Blocks',
  },
  imageURL: '/block_icons/my-block-icon.png',
  fields: [
    // Block fields configuration
  ],
}
```

---

## Related Documentation

- [Collections Guide](./COLLECTIONS.md) - Collection structure and usage
- [Project Overview](./PROJECT_OVERVIEW.md) - Overall project architecture
- [URL Validation](./URL_VALIDATION.md) - Link validation system

## Support

- [Payload CMS Blocks Docs](https://payloadcms.com/docs/configuration/blocks)
- [Payload Discord](https://discord.gg/payload)
- Project repository issues
