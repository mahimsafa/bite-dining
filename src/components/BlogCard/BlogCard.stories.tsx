import type { Meta, StoryObj } from '@storybook/react-vite';
import BlogCard from './BlogCard';
import type { BlogPost } from './BlogCard';

const samplePost: BlogPost = {
  id: 1,
  title: 'The Secret to Perfect Pasta',
  excerpt: 'Learn the techniques that make our pasta truly exceptional.',
  image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
  date: 'March 1, 2026',
  author: 'Chef Gordon',
  category: 'Recipes',
};

const meta: Meta<typeof BlogCard> = {
  title: 'Components/BlogCard',
  component: BlogCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    post: samplePost,
  },
};

export default meta;
type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {};

export const NewsPost: Story = {
  args: {
    post: {
      id: 2,
      title: 'Seasonal Menu Highlights',
      excerpt: 'Discover the fresh ingredients we are using this spring.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      date: 'February 25, 2026',
      author: 'Team Bites',
      category: 'News',
    },
  },
};

export const BehindTheScenes: Story = {
  args: {
    post: {
      id: 3,
      title: 'Behind the Scenes: Our Kitchen',
      excerpt: 'A look at how we maintain the highest hygiene standards.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop',
      date: 'February 20, 2026',
      author: 'Manager',
      category: 'Behind the Scenes',
    },
  },
};
