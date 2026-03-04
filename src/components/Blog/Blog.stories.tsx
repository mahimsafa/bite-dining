import type { Meta, StoryObj } from '@storybook/react-vite';
import Blog from './Blog';

const meta: Meta<typeof Blog> = {
  title: 'Components/Blog',
  component: Blog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Blog>;

export const Default: Story = {};
