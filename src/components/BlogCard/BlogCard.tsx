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
    <div className="group bg-cream rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiUser className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-5">{post.excerpt}</p>
        <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group/btn">
          Read More
          <FiArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
