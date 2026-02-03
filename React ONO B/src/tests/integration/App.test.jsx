import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from "../../App";

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
        clear: vi.fn(() => { store = {}; }),
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App Integration Tests', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.clearAllMocks();
    });

    it('adds a new mission to the list', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const addButton = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(input, { target: { value: 'New App Mission' } });
        fireEvent.click(addButton);

        expect(screen.getByText(/New App Mission/i)).toBeInTheDocument();
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('toggles mission status', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const addButton = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(input, { target: { value: 'Toggle Mission' } });
        fireEvent.click(addButton);

        const missionItem = screen.getByRole('listitem');
        const finishButton = within(missionItem).getByRole('button', { name: /Mark as finished/i });

        fireEvent.click(finishButton);

        expect(within(missionItem).getByRole('button', { name: /Mark as unfinished/i })).toBeInTheDocument();
        expect(missionItem.className).toContain('finished');
    });

    it('deletes a mission', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const addButton = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(input, { target: { value: 'Delete Me' } });
        fireEvent.click(addButton);

        const missionItem = screen.getByRole('listitem');
        const deleteButton = within(missionItem).getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButton);

        expect(screen.queryByText(/Delete Me/i)).not.toBeInTheDocument();
    });

    it('filters missions', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const addButton = screen.getByRole('button', { name: /Add/i });

        // Add two missions
        fireEvent.change(input, { target: { value: 'Finished Mission' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'Pending Mission' } });
        fireEvent.click(addButton);

        // Finish one
        const items = screen.getAllByRole('listitem');
        const finishButton = within(items[0]).getByRole('button', { name: /Mark as finished/i });
        fireEvent.click(finishButton);

        // Filter for finished
        const finishFilter = screen.getByRole('button', { name: /Done/i });
        fireEvent.click(finishFilter);

        expect(screen.getByText(/Finished Mission/i)).toBeInTheDocument();
        expect(screen.queryByText(/Pending Mission/i)).not.toBeInTheDocument();

        // Filter for all
        const allFilter = screen.getByRole('button', { name: /All/i });
        fireEvent.click(allFilter);

        expect(screen.getByText(/Finished Mission/i)).toBeInTheDocument();
        expect(screen.getByText(/Pending Mission/i)).toBeInTheDocument();
    });

    it('deletes all finished missions immediately (Bonus)', () => {
        render(<App />);

        const input = screen.getByPlaceholderText(/What is the next task/i);
        const addButton = screen.getByRole('button', { name: /Add/i });

        // Add and finish a mission
        fireEvent.change(input, { target: { value: 'Finished Mission' } });
        fireEvent.click(addButton);
        const missionItem = screen.getByRole('listitem');
        const finishButton = within(missionItem).getByRole('button', { name: /Mark as finished/i });
        fireEvent.click(finishButton);

        // Click bulk delete (Bonus)
        const bulkDeleteButton = screen.getByRole('button', { name: /Clear Completed/i });
        fireEvent.click(bulkDeleteButton);

        expect(screen.queryByText(/Finished Mission/i)).not.toBeInTheDocument();
    });
});
