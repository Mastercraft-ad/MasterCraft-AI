# ToolVerse Design Guidelines

## Design Approach
**Reference-Based Design** drawing inspiration from ProductHunt's discovery-focused layout, Linear's clean typography, and Stripe's polished interactions. This platform prioritizes visual discovery and community engagement.

## Typography System

### Font Families
- **Primary:** Inter (headers, UI elements, navigation)
- **Secondary:** System-ui fallback for body text
- Load via Google Fonts CDN

### Type Scale
- **Hero/Page Titles:** text-4xl to text-5xl, font-bold (tracking-tight)
- **Tool Titles:** text-xl to text-2xl, font-semibold
- **Section Headers:** text-lg, font-semibold
- **Body Text:** text-base, font-normal
- **Metadata/Tags:** text-sm, font-medium
- **Captions:** text-xs, font-normal

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Small gaps: p-2, gap-2
- Standard spacing: p-4, gap-4, m-4
- Section padding: py-8, py-12, py-16
- Large sections: py-20, py-24

### Container Strategy
- **Max Width:** max-w-7xl for main content
- **Tool Cards Container:** max-w-6xl
- **Forms/Details:** max-w-3xl
- **Horizontal Padding:** px-4 (mobile), px-6 (tablet), px-8 (desktop)

### Grid Layouts
- **Tools Feed:** Single column (mobile) → 2 columns (md:) → 3 columns (lg:)
- **Categories/Tags:** grid-cols-2 (mobile) → grid-cols-4 (md:) → grid-cols-6 (lg:)
- **Tool Details:** Single column with sidebar breakout at lg:

## Component Library

### Navigation
**Desktop Header:**
- Fixed top navigation with backdrop-blur
- Logo + primary links (horizontal) + auth buttons (right-aligned)
- Search bar integrated in center on larger screens
- Height: h-16

**Mobile Navigation:**
- Hamburger menu icon (top-right)
- Full-screen overlay menu when opened
- Large touch targets (min-height: h-12 for menu items)
- Bottom-fixed submit button for authenticated users

### Tool Cards (Primary Component)
**Card Structure:**
- Rounded corners: rounded-xl
- Padding: p-6
- Shadow: shadow-sm with hover:shadow-md transition
- Border: border with subtle treatment

**Card Layout:**
- Tool logo (square, w-12 h-12, rounded-lg) aligned top-left
- Title and description stack vertically
- Tags displayed as horizontal pill list (gap-2, flex-wrap)
- Footer row: Upvote button (left) + metadata (right)

**Upvote Button:**
- Pill-shaped with icon + count
- Compact size: px-3 py-2
- Positioned prominently but not overwhelming
- Clear active/voted state differentiation

### Tool Details Page
**Hero Section:**
- Large tool logo (w-24 h-24, centered or left-aligned)
- Tool name, tagline, launch date metadata
- Primary CTA button ("Visit Tool") + Upvote button side-by-side
- Category tags below

**Screenshots Gallery:**
- Horizontal scroll on mobile
- Grid layout (2-3 columns) on desktop
- Rounded corners, shadow treatment
- Aspect ratio maintained (16:9 or 4:3)

**Description Section:**
- Full-width text with max-w-prose for readability
- Generous line-height (leading-relaxed)
- Whitespace between paragraphs

**Comment Section:**
- Threaded layout with indentation for replies
- User avatar (w-10 h-10, rounded-full) + username + timestamp
- Comment text in separate block below user info
- Reply/React actions with text-sm

### Submit Tool Form
**Form Layout:**
- Single column, max-w-2xl centered
- Generous spacing between fields (space-y-6)
- Labels above inputs (text-sm, font-medium)
- Input fields: h-12 for text inputs, larger for textareas
- Upload area for logo: dashed border, min-h-32, drag-drop visual cues

**Field Groups:**
- Basic Info (title, tagline, description)
- Links & Media (website URL, logo upload, screenshots upload)
- Classification (category checkboxes, pricing type radio)
- Submit button: full-width on mobile, auto width (centered) on desktop

### Pagination Controls
**Layout:**
- Centered horizontally below tools grid
- Spacing: mt-12, mb-8
- Horizontal arrangement of page numbers

**Page Numbers:**
- Individual buttons with min-w-10, h-10
- Current page highlighted with distinct treatment
- Previous/Next buttons with arrow icons
- Show ellipsis (...) for large page counts
- Max 7 visible page numbers at once

### Search & Filter Bar
**Desktop:**
- Search input (w-full max-w-md) with icon prefix
- Filter dropdown buttons side-by-side
- Sticky positioning below main nav (top-16)

**Mobile:**
- Search expands to full width
- Filter button triggers bottom sheet/modal
- Active filters shown as removable pills below search

### Category Pills/Tags
- Rounded-full shape
- Padding: px-3 py-1
- Text: text-xs or text-sm font-medium
- Display inline-flex with gap-2
- Truncate long category names

## Framer Motion Animation Strategy

### Page Transitions
- Fade in with subtle upward motion (y: 20 → 0)
- Duration: 0.3-0.4s
- Ease: easeOut

### Tool Cards
**On Initial Load:**
- Stagger fade-in for cards (delay increments of 0.05s)
- Animate from opacity: 0, y: 20

**On Hover (Desktop):**
- Scale: 1.02 with smooth transition
- Shadow elevation increase
- Duration: 0.2s

**On Upvote Click:**
- Brief scale pulse (scale: 1 → 1.1 → 1)
- Icon color shift
- Counter increment with slide-up animation

### Navigation Menu (Mobile)
- Slide from right with backdrop fade-in
- Menu items stagger animate in (top to bottom)
- Duration: 0.3s with spring physics

### Form Interactions
- Input focus: subtle scale (1.01) and shadow enhancement
- Submit button: Loading spinner rotation
- Success state: checkmark icon with scale bounce

### Minimal Use Philosophy
- Avoid continuous/looping animations
- No parallax scrolling effects
- Limit animations to meaningful interactions and state changes
- Prefer micro-interactions over large motion graphics

## Mobile-First Responsiveness

### Breakpoint Strategy
- **Mobile:** Base styles (320px+)
- **Tablet:** md: (768px+)
- **Desktop:** lg: (1024px+)
- **Large Desktop:** xl: (1280px+)

### Touch Targets
- Minimum height: h-12 (48px) for all interactive elements
- Increased padding for buttons on mobile
- Larger tap area for upvote buttons and icons

### Mobile Optimizations
- Stack all multi-column layouts to single column
- Full-width buttons on mobile, auto-width on desktop
- Hide secondary metadata on small screens
- Expand cards to full width with small horizontal margins
- Bottom navigation for primary actions on mobile

### Image Handling
- Responsive images with object-fit: cover
- Lazy loading for screenshots and tool logos
- Optimize for mobile bandwidth

## Images

### Logo/Tool Logos
**Placement:** Tool cards, tool details hero, search results
**Specifications:** Square format, 96px-256px, rounded corners, clean background
**Treatment:** Contained within defined dimensions, shadow-sm, border for definition

### Screenshots (Tool Details Page)
**Placement:** Below hero section in gallery layout
**Specifications:** 16:9 or 4:3 aspect ratio, high quality, showing actual product interface
**Quantity:** 3-5 screenshots per tool
**Treatment:** Rounded-lg, shadow-md, responsive grid

### Hero Section (Homepage)
**No large hero image** - ToolVerse uses a clean, content-first approach. The homepage leads directly with:
- Brief tagline section (py-12)
- Filter/sort bar
- Immediate tools grid

This creates a ProductHunt-like experience prioritizing discovery over marketing imagery.

## Admin Dashboard
- Table layout for tool submissions
- Action buttons (Approve/Reject/Edit) with icon + text
- Status indicators (pending/approved) with pill badges
- Quick filters above table
- Mobile: Convert table to card list with action dropdown