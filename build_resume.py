from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

pdf_path = "assets/Andrew_Satil_Resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# Custom styles matching the elegant resume styling
name_style = ParagraphStyle(
    'NameStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#111111')
)

title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=15,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#222222'),
    spaceAfter=4
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#444444'),
    spaceAfter=12
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#111111'),
    spaceBefore=10,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#222222'),
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    alignment=TA_LEFT,
    leftIndent=15,
    firstLineIndent=-10,
    textColor=colors.HexColor('#222222'),
    spaceAfter=4
)

role_heading_style = ParagraphStyle(
    'RoleHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=13,
    alignment=TA_LEFT,
    textColor=colors.HexColor('#111111'),
    spaceBefore=6,
    spaceAfter=2
)

story = []

# Header
story.append(Paragraph("ANDREW GABRIEL SATIL ROSA", name_style))
story.append(Paragraph("MARKETING DESIGNER & CREATIVE STRATEGIST", title_style))
story.append(Paragraph("Santa Catarina, Brazil &nbsp;|&nbsp; <a href='mailto:andrewgsatil@gmail.com' color='#444444'>andrewgsatil@gmail.com</a> &nbsp;|&nbsp; +55 47 98435-4539<br/><a href='https://andrew-portfolio-en.vercel.app' color='#444444'>andrew-portfolio-en.vercel.app</a> &nbsp;|&nbsp; <a href='https://linkedin.com/in/andrewsatil' color='#444444'>linkedin.com/in/andrewsatil</a> &nbsp;|&nbsp; <a href='https://behance.net/drewsatil' color='#444444'>behance.net/drewsatil</a>", contact_style))

# Section Divider
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#111111'), spaceAfter=8))

# Professional Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=6))
story.append(Paragraph("Marketing Designer & Creative Strategist specializing in <b>DTC, e-commerce, and premium consumer brands</b>. I bridge the gap between high-end aesthetic identity and <b>data-driven performance</b>, designing <b>conversion-optimized landing pages</b> and scalable creative assets. With advanced proficiency in <b>Figma</b> and <b>UI/UX</b> best practices, combined with an <b>AI-assisted workflow</b>, I accelerate production and iteration speed while maintaining absolute control over art direction and brand consistency.", body_style))

# Skills & Tech Stack
story.append(Paragraph("SKILLS & TECH STACK", section_heading_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=6))
story.append(Paragraph("• <b>Strategy & Analytics:</b> Creative Strategy, CRO, A/B Testing, Google Analytics (GA4), LTV & ROAS Optimization.", bullet_style))
story.append(Paragraph("• <b>Design & UI/UX:</b> UI/UX Design, Landing Page Design, Brand Identity Systems, Direct-Response Creative, Art Direction.", bullet_style))
story.append(Paragraph("• <b>Platforms & Tools:</b> Figma, Adobe CC (Photoshop, Premiere, After Effects), Meta Ads Manager, Shopify, Klaviyo.", bullet_style))
story.append(Paragraph("• <b>Web & AI Tech:</b> HTML/CSS, Vercel, Framer, Midjourney, ElevenLabs, Claude.", bullet_style))

# Professional Experience
story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=6))

# Experience 1
story.append(Paragraph("Freelance Marketing Designer | Self-Employed", role_heading_style))
story.append(Paragraph("<i>Jun 2020 – Present | Brazil – Remote</i>", ParagraphStyle('DateSub', parent=body_style, fontSize=8.5, textColor=colors.HexColor('#555555'), spaceAfter=4)))
story.append(Paragraph("Over the past 5+ years, I've partnered with agencies, startups, SaaS companies, and e-commerce brands, creating strategic design solutions that strengthen brand positioning and support business growth.", body_style))
story.append(Paragraph("• <b>Brand Identity:</b> Lead end-to-end projects as a solo designer, developing logos, typography, color palettes, and full brand guidelines (including a comprehensive manual for Lumiar, a psychoanalysis consultancy).", bullet_style))
story.append(Paragraph("• <b>Landing Pages & CRO:</b> Architect and develop high-converting, mobile-first web pages with custom CSS, applying rigorous <b>UI/UX</b> best practices. Developed a dynamic 6-section page for an aesthetics clinic featuring interactive carousels and marquee banners.", bullet_style))
story.append(Paragraph("• <b>Performance Creative:</b> Produce AI-generated VSLs (Video Sales Letters) for international wellness brands (e.g., Fem8) and design high-impact corporate presentations for B2B companies (e.g., Tivea Geradores).", bullet_style))

# Experience 2
story.append(Paragraph("Creative Strategy & Performance Designer (Independent Contractor) | R4 Assessoria", role_heading_style))
story.append(Paragraph("<i>Apr 2026 – Present | Itapema, SC – Remote</i>", ParagraphStyle('DateSub2', parent=body_style, fontSize=8.5, textColor=colors.HexColor('#555555'), spaceAfter=4)))
story.append(Paragraph("• Spearhead creative strategy for paid media campaigns (<b>Meta Ads Manager, Google Ads</b>) across real estate, labor law, and hospitality, successfully driving down the average CPA for key clients through iterative, data-backed <b>A/B testing</b>.", bullet_style))
story.append(Paragraph("• Revamped and took full ownership of the agency's internal social media presence, significantly accelerating audience growth and engagement through a cohesive design and content strategy.", bullet_style))
story.append(Paragraph("• Partner directly with traffic managers to translate performance data into new visual angles, while also writing compelling direct-response ad copy and video scripts.", bullet_style))

# Experience 3
story.append(Paragraph("Brand & Creative Designer (Independent Contractor) | Mizz Dermocosméticos", role_heading_style))
story.append(Paragraph("<i>Feb 2026 – May 2026 | Balneário Camboriú, SC – Remote</i>", ParagraphStyle('DateSub3', parent=body_style, fontSize=8.5, textColor=colors.HexColor('#555555'), spaceAfter=4)))
story.append(Paragraph("• Spearheaded the visual rebrand and creative strategy for a rapidly scaling dermocosmetics e-commerce brand, supporting a successful product launch that coincided with the client doubling production capacity.", bullet_style))
story.append(Paragraph("• Slashed traditional product photography costs by an estimated 60-70% by integrating AI-generation tools into the workflow, meticulously art-directing and manually refining assets for premium brand alignment.", bullet_style))
story.append(Paragraph("• Designed, developed, and deployed a high-converting landing page via Vercel, implementing continuous <b>A/B testing</b> to optimize the <b>UI/UX</b> and map the customer journey from ad touchpoint to final conversion.", bullet_style))

# Experience 4
story.append(Paragraph("Marketing Designer (Independent Contractor) | V4 Company", role_heading_style))
story.append(Paragraph("<i>Apr 2025 – Dec 2025 | Brazil – Hybrid</i>", ParagraphStyle('DateSub4', parent=body_style, fontSize=8.5, textColor=colors.HexColor('#555555'), spaceAfter=4)))
story.append(Paragraph("• Operated as the sole Marketing Designer within a high-performance squad at one of Brazil's largest marketing agencies, successfully managing end-to-end creative execution for 18 simultaneous enterprise accounts across B2B and B2C sectors.", bullet_style))
story.append(Paragraph("• Translated real-time paid media metrics (CTR, CPC, CPA) extracted from <b>Google Analytics (GA4)</b> and <b>Meta Ads Manager</b> into iterative creative optimizations, ensuring assets met aggressive CPA targets.", bullet_style))
story.append(Paragraph("• Designed and launched lead-generation creatives and landing pages for the real estate sector that directly contributed to a R$ 700,000 property sale.", bullet_style))
story.append(Paragraph("• Led comprehensive brand identity overhauls and developed high-stakes corporate presentations and pitch decks for client meetings and strategic project alignments.", bullet_style))

# Experience 5
story.append(Paragraph("E-commerce Founder & Creative Lead | Independent Shopify Business", role_heading_style))
story.append(Paragraph("<i>Jan 2021 – Dec 2022 | Remote</i>", ParagraphStyle('DateSub5', parent=body_style, fontSize=8.5, textColor=colors.HexColor('#555555'), spaceAfter=4)))
story.append(Paragraph("• Operated a profitable dropshipping <b>Shopify</b> e-commerce business, managing end-to-end operations spanning multiple niches (sports apparel and imported fashion).", bullet_style))
story.append(Paragraph("• Directed and executed all performance creative and paid media buying (Meta Ads, Google Ads), directly linking design and copy decisions to store revenue and customer acquisition.", bullet_style))
story.append(Paragraph("• Designed and continuously optimized the storefront <b>UI/UX</b>, applying CRO best practices, <b>A/B testing</b>, and retention strategies (e.g., <b>Klaviyo</b>) to maximize the return on ad spend (ROAS).", bullet_style))

# Education & Languages
story.append(Paragraph("EDUCATION & LANGUAGES", section_heading_style))
story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#666666'), spaceAfter=6))
story.append(Paragraph("• <b>Degree:</b> Tecnólogo, Graphic Design - UniEVANGÉLICA (Jan 2018 - Nov 2019)", bullet_style))
story.append(Paragraph("• <b>Languages:</b> Portuguese (Native), English (Professional Working Proficiency), Spanish (Professional Working Proficiency)", bullet_style))

doc.build(story)
print("Successfully generated Andrew_Satil_Resume.pdf")
