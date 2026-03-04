import type { Meta, StoryObj } from '@storybook/react-vite';
import AppDownload from './AppDownload';

const meta: Meta<typeof AppDownload> = {
  title: 'Components/AppDownload',
  component: AppDownload,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppDownload>;

export const Default: Story = {
  args: {},
};
