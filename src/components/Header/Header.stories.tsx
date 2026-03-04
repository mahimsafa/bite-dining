import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const Scrolled: Story = {
  parameters: {
    backgrounds: { default: 'cream' },
  },
  decorators: [
    (Story) => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      return <Story />;
    },
  ],
};
