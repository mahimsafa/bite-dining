import type { Meta, StoryObj } from '@storybook/react-vite';
import PopularDishes from './PopularDishes';

const meta: Meta<typeof PopularDishes> = {
  title: 'Components/PopularDishes',
  component: PopularDishes,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PopularDishes>;

export const Default: Story = {
  args: {},
};
