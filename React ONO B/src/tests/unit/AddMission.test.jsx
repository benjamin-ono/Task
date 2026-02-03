import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Add from "../../components/add/Add";

describe('Add Component', () => {
    it('renders the component correctly', () => {
        render(<Add addMission={vi.fn()} />);
        expect(screen.getByPlaceholderText(/What is the next task/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
    });

    it('updates input value on change', () => {
        render(<Add addMission={vi.fn()} />);
        const input = screen.getByPlaceholderText(/What is the next task/i);
        fireEvent.change(input, { target: { value: 'New Mission' } });
        expect(input.value).toBe('New Mission');
    });

    it('calls addMission with correct text and clears input on button click', () => {
        const addMissionMock = vi.fn();
        render(<Add addMission={addMissionMock} />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const button = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(input, { target: { value: 'Test Mission' } });
        fireEvent.click(button);

        expect(addMissionMock).toHaveBeenCalledWith('Test Mission');
        expect(input.value).toBe('');
    });
});
