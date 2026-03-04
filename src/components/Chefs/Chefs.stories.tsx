import type { Meta, StoryObj } from '@storybook/react-vite';
import Chefs from './Chefs';

const meta: Meta<typeof Chefs> = {
  title: 'Components/Chefs',
  component: Chefs,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chefs>;

export const Default: Story = {
  args: {},
};
