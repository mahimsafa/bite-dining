import type { Meta, StoryObj } from '@storybook/react-vite';
import ReservationCTA from './ReservationCTA';

const meta: Meta<typeof ReservationCTA> = {
  title: 'Components/ReservationCTA',
  component: ReservationCTA,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ReservationCTA>;

export const Default: Story = {
  args: {},
};
