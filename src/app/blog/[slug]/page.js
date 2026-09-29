import { notFound } from 'next/navigation'
import Navbar from '@/Components/Navbar/Navbar'
import Footer from '@/Components/Footer/Footer'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL

async function getPost(slug) {
  try {
    const res = await fetch(
      `${STRAPI}/api/posts?filters[slug][$eq]=${slug}&populate=cover`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    const { data } = await res.json()
    return data?.[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.meta_title || post.blog_title || post.title,
    description: post.meta_description || post.excerpt || '',
    openGraph: {
      title: post.meta_title || post.blog_title || post.title,
      description: post.meta_description || post.excerpt || '',
      images: post.cover?.url ? [`${STRAPI}${post.cover.url}`] : [],
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const { blog_title, title, content, bofu, faq, published_date, cover } = post
  const coverUrl = cover?.url ? `${STRAPI}${cover.url}` : null

  const faqItems = Array.isArray(faq) ? faq : []

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  } : null

  return (
    <>
      <Navbar />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="blog-post">
        <div className="blog-post__inner">

          {/* Header */}
          <header className="blog-post__header">
            {published_date && (
              <time className="blog-post__date">
                {new Date(published_date).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            )}
            <h1 className="blog-post__title">{blog_title || title}</h1>
          </header>

          {coverUrl && (
            <img src={coverUrl} alt={blog_title || title} className="blog-post__cover" />
          )}

          {/* Main content */}
          {content && (
            <section className="blog-post__content">
              <BlocksRenderer content={content} />
            </section>
          )}

          {/* BOFU */}
          {bofu && (
            <section className="blog-post__bofu">
              <BlocksRenderer content={bofu} />
            </section>
          )}

          {/* FAQ */}
          {faqItems.length > 0 && (
            <section className="blog-post__faq">
              <h2>Frequently Asked Questions</h2>
              {faqItems.map(({ question, answer }, i) => (
                <details key={i} className="blog-post__faq-item">
                  <summary className="blog-post__faq-q">{question}</summary>
                  <p className="blog-post__faq-a">{answer}</p>
                </details>
              ))}
            </section>
          )}

        </div>
      </article>

      <Footer />
    </>
  )
}
