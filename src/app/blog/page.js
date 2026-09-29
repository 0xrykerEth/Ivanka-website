import Link from 'next/link'
import Navbar from '@/Components/Navbar/Navbar'
import Footer from '@/Components/Footer/Footer'
import { strapiMedia } from '@/lib/strapiMedia'

export const metadata = {
  title: 'Blog | Ivanka Rent a Car Dubai',
  description: 'Luxury car rental tips, guides and news from Ivanka Rent a Car Dubai.',
}

const PER_PAGE = 6

async function getPosts(page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/posts?sort=published_date:desc&populate=cover&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return { posts: [], total: 0, pageCount: 1 }
    const { data, meta } = await res.json()
    return {
      posts: data || [],
      total: meta?.pagination?.total || 0,
      pageCount: meta?.pagination?.pageCount || 1,
    }
  } catch {
    return { posts: [], total: 0, pageCount: 1 }
  }
}

export default async function BlogPage({ searchParams }) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam) || 1)
  const { posts, total, pageCount } = await getPosts(currentPage)

  const showPagination = total > PER_PAGE

  return (
    <>
      <Navbar />
      <main className="blog-list-page">
        <div className="blog-list-inner">
          <h1 className="blog-list__heading">Blog</h1>
          <p className="blog-list__sub">Tips, guides and news from Ivanka Rent a Car.</p>

          {posts.length === 0 ? (
            <p className="blog-list__empty">No posts yet — check back soon.</p>
          ) : (
            <>
              <div className="blog-list__grid">
                {posts.map((post) => {
                  const { slug, blog_title, title, excerpt, published_date, cover } = post
                  const coverUrl = strapiMedia(cover?.url)

                  return (
                    <Link key={post.documentId} href={`/blog/${slug}`} className="blog-card">
                      {coverUrl && (
                        <div className="blog-card__img-wrap">
                          <img src={coverUrl} alt={blog_title || title} className="blog-card__img" />
                        </div>
                      )}
                      <div className="blog-card__body">
                        {published_date && (
                          <time className="blog-card__date">
                            {new Date(published_date).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </time>
                        )}
                        <h2 className="blog-card__title">{blog_title || title}</h2>
                        {excerpt && <p className="blog-card__excerpt">{excerpt}</p>}
                        <span className="blog-card__read">Read more →</span>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {showPagination && (
                <nav className="blog-pagination" aria-label="Blog pages">
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className={`blog-pagination__btn${currentPage === 1 ? ' blog-pagination__btn--disabled' : ''}`}
                    aria-disabled={currentPage === 1}
                  >
                    ←
                  </Link>

                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?page=${p}`}
                      className={`blog-pagination__num${p === currentPage ? ' blog-pagination__num--active' : ''}`}
                    >
                      {p}
                    </Link>
                  ))}

                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className={`blog-pagination__btn${currentPage === pageCount ? ' blog-pagination__btn--disabled' : ''}`}
                    aria-disabled={currentPage === pageCount}
                  >
                    →
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
