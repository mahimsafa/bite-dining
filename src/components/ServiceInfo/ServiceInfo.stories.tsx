import type { Meta, StoryObj } from '@storybook/react-vite';
import ServiceInfo from './ServiceInfo';

const meta: Meta<typeof ServiceInfo> = {
  title: 'Components/ServiceInfo',
  component: ServiceInfo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceInfo>;

export const Default: Story = {
  args: {},
};
