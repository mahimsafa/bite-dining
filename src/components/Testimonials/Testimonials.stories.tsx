import type { Meta, StoryObj } from '@storybook/react-vite';
import Testimonials from './Testimonials';

const meta: Meta<typeof Testimonials> = {
  title: 'Components/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Testimonials>;

export const Default: Story = {
  args: {},
};
