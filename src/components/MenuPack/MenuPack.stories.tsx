import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuPack from './MenuPack';

const meta: Meta<typeof MenuPack> = {
  title: 'Components/MenuPack',
  component: MenuPack,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuPack>;

export const Default: Story = {
  args: {},
};
