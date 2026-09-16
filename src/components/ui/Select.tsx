'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export type SelectOption = {
    value: string;
    label: string;
};

export function Select({
    id,
    name,
    value,
    onChange,
    options,
    placeholder = '—',
    invalid = false,
    disabled = false,
    className = '',
}: {
    id?: string;
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const listId = useId();

    const selected = options.find((o) => o.value === value) ?? null;

    useEffect(() => {
        if (!open) return;
        function onPointerDown(event: PointerEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [open]);

    useEffect(() => {
        if (open) {
            const current = options.findIndex((o) => o.value === value);
            setActiveIndex(current >= 0 ? current : 0);
        }
    }, [open, options, value]);

    useEffect(() => {
        if (!open || activeIndex < 0) return;
        const node = listRef.current?.children[activeIndex] as HTMLElement | undefined;
        node?.scrollIntoView({ block: 'nearest' });
    }, [open, activeIndex]);

    function commit(index: number) {
        const option = options[index];
        if (!option) return;
        onChange(option.value);
        setOpen(false);
    }

    function onKeyDown(event: React.KeyboardEvent) {
        if (disabled) return;
        if (event.key === 'Escape') {
            setOpen(false);
            return;
        }
        if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setOpen(true);
            return;
        }
        if (!open) return;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((i) => Math.max(0, i - 1));
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            commit(activeIndex);
        }
    }

    return (
        <div ref={rootRef} className="relative">
            {name && <input type="hidden" name={name} value={value} />}
            <button
                type="button"
                id={id}
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                onKeyDown={onKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={open ? listId : undefined}
                className={`field flex items-center justify-between gap-2 text-start ${invalid ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
            >
                <span className={`truncate ${selected ? '' : 'text-[color:var(--ink-soft)]'}`}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[color:var(--ink-soft)] transition-transform ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                />
            </button>

            {open && (
                <ul
                    ref={listRef}
                    id={listId}
                    role="listbox"
                    className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-xl border border-black/10 bg-[color:var(--surface)] p-1 shadow-xl shadow-black/10 dark:border-white/10"
                >
                    {options.map((option, index) => {
                        const isSelected = option.value === value;
                        const isActive = index === activeIndex;
                        return (
                            <li key={option.value} role="option" aria-selected={isSelected}>
                                <button
                                    type="button"
                                    onClick={() => commit(index)}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-start text-sm transition ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-white/5 dark:text-brand-200' : ''
                                        }`}
                                >
                                    <span className="truncate">{option.label}</span>
                                    {isSelected && <Check className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden="true" />}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
