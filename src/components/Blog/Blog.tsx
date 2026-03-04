import BlogCard from '../BlogCard/BlogCard';
import type { BlogPost } from '../BlogCard/BlogCard';

const posts: BlogPost[] = [
  {
    id: 1,
    title: 'The Secret to Perfect Pasta',
    excerpt: 'Learn the techniques that make our pasta truly exceptional.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    date: 'March 1, 2026',
    author: 'Chef Gordon',
    category: 'Recipes',
  },
  {
    id: 2,
    title: 'Seasonal Menu Highlights',
    excerpt: 'Discover the fresh ingredients we are using this spring.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    date: 'February 25, 2026',
    author: 'Team Bites',
    category: 'News',
  },
  {
    id: 3,
    title: 'Behind the Scenes: Our Kitchen',
    excerpt: 'A look at how we maintain the highest hygiene standards.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop',
    date: 'February 20, 2026',
    author: 'Manager',
    category: 'Behind the Scenes',
  },
];

export default function Blog() {
  return (
    <section className="py-28 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            From Our Blog
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            News, tips, and culinary insights from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
