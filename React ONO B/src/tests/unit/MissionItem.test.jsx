import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Item from "../../components/item/Item";

describe('Item Component', () => {
    const mockMission = {
        id: 1,
        text: 'Test Mission',
        finish: false,
        isShow: true
    };

    it('renders mission text and status correctly', () => {
        render(<Item mission={mockMission} changeStatus={vi.fn()} deleteMission={vi.fn()} editMission={vi.fn()} />);
        expect(screen.getByText(/Test Mission/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Mark as finished/i })).toBeInTheDocument();
    });

    it('renders finished state correctly', () => {
        const finishedMission = { ...mockMission, finish: true };
        render(<Item mission={finishedMission} changeStatus={vi.fn()} deleteMission={vi.fn()} editMission={vi.fn()} />);
        const li = screen.getByRole('listitem');
        expect(li.className).toContain('finished');
        expect(screen.getByRole('button', { name: /Mark as unfinished/i })).toBeInTheDocument();
    });

    it('calls changeStatus when status button is clicked', () => {
        const changeStatusMock = vi.fn();
        render(<Item mission={mockMission} changeStatus={changeStatusMock} deleteMission={vi.fn()} editMission={vi.fn()} />);
        fireEvent.click(screen.getByRole('button', { name: /Mark as finished/i }));
        expect(changeStatusMock).toHaveBeenCalledWith(1);
    });

    it('calls deleteMission when delete button is clicked', () => {
        const deleteMissionMock = vi.fn();
        render(<Item mission={mockMission} changeStatus={vi.fn()} deleteMission={deleteMissionMock} editMission={vi.fn()} />);
        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
        expect(deleteMissionMock).toHaveBeenCalledWith(1);
    });

    it('enters inline editing mode when edit button is clicked', () => {
        render(<Item mission={mockMission} changeStatus={vi.fn()} deleteMission={vi.fn()} editMission={vi.fn()} />);
        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));

        // Should show input field with the current text
        const input = screen.getByDisplayValue('Test Mission');
        expect(input).toBeInTheDocument();

        // Should show Save and Cancel buttons
        expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    it('calls editMission and exits editing mode on save', () => {
        const editMissionMock = vi.fn();
        render(<Item mission={mockMission} changeStatus={vi.fn()} deleteMission={vi.fn()} editMission={editMissionMock} />);

        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
        const input = screen.getByDisplayValue('Test Mission');

        fireEvent.change(input, { target: { value: 'Updated Text' } });
        fireEvent.click(screen.getByRole('button', { name: /Save/i }));

        expect(editMissionMock).toHaveBeenCalledWith(1, 'Updated Text');
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
});
