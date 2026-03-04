import { FiArrowRight, FiClock, FiUser } from 'react-icons/fi';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm tracking-wide">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-taupe mb-4">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiUser className="w-3.5 h-3.5" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold font-display text-charcoal mb-3 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-taupe text-sm mb-5 leading-relaxed">{post.excerpt}</p>
        <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group/btn">
          Read More
          <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
