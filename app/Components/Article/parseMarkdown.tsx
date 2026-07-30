import React from 'react';

/* ============================================================
   Markdown → HTML парсер для контента статей

   Поддерживает:
   - **жирный** → <strong>
   - *курсив* → <em>
   - `код` → <code>
   - [текст](url) → <a>
   - | таблицы | → <table>
   - --- → <hr>
   ============================================================ */

/**
 * Парсит inline markdown в массив React-элементов.
 * Обрабатывает: **bold**, *italic*, `code`, [link](url)
 */
export const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    // Regex для inline markdown: bold, italic, code, link
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        // Добавляем текст до совпадения
        if (match.index > lastIndex) {
            elements.push(text.slice(lastIndex, match.index));
        }

        if (match[1]) {
            // **bold**
            elements.push(<strong key={key++} style={{ color: 'var(--lp-text)', fontWeight: 700 }}>{match[2]}</strong>);
        } else if (match[3]) {
            // *italic*
            elements.push(<em key={key++} style={{ color: 'var(--lp-text)', fontStyle: 'italic' }}>{match[4]}</em>);
        } else if (match[5]) {
            // `code`
            elements.push(
                <code key={key++} style={{
                    background: 'rgba(0, 200, 255, 0.08)',
                    color: 'var(--lp-cyan)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.9em',
                    fontFamily: 'monospace',
                }}>{match[6]}</code>
            );
        } else if (match[7]) {
            // [text](url)
            elements.push(
                <a key={key++} href={match[9]} style={{
                    color: 'var(--lp-cyan)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                }}>{match[8]}</a>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    // Добавляем оставшийся текст
    if (lastIndex < text.length) {
        elements.push(text.slice(lastIndex));
    }

    return elements.length > 0 ? elements : [text];
};

/**
 * Проверяет, является ли параграф таблицей (содержит |)
 */
export const isTable = (text: string): boolean => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return false;
    // Проверяем что хотя бы 2 строки содержат |
    const pipeLines = lines.filter(l => l.trim().startsWith('|') || l.includes(' | '));
    return pipeLines.length >= 2;
};

/**
 * Рендерит markdown-таблицу в HTML <table>
 */
export const renderTable = (text: string, key: number): React.ReactElement => {
    const lines = text.trim().split('\n').filter(l => l.trim());

    // Убираем строку разделитель (|---|---|)
    const dataLines = lines.filter(l => !/^\|[\s\-:|]+\|$/.test(l.trim()));

    if (dataLines.length === 0) return <div key={key}>{text}</div>;

    const parseRow = (line: string): string[] => {
        return line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
    };

    const headers = parseRow(dataLines[0]);
    const rows = dataLines.slice(1).map(parseRow);

    return (
        <div key={key} style={{ overflowX: 'auto', margin: '20px 0' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '15px',
                lineHeight: 1.6,
            }}>
                <thead>
                    <tr>
                        {headers.map((h, idx) => (
                            <th key={idx} style={{
                                padding: '12px 16px',
                                textAlign: 'left',
                                borderBottom: '2px solid var(--lp-cyan)',
                                color: 'var(--lp-text)',
                                fontWeight: 700,
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                background: 'rgba(0, 200, 255, 0.04)',
                            }}>
                                {parseInlineMarkdown(h)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIdx) => (
                        <tr key={rowIdx} style={{
                            borderBottom: '1px solid var(--lp-glass-border)',
                        }}>
                            {row.map((cell, cellIdx) => (
                                <td key={cellIdx} style={{
                                    padding: '10px 16px',
                                    color: 'var(--lp-text-muted)',
                                    fontSize: '15px',
                                }}>
                                    {parseInlineMarkdown(cell)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/**
 * Проверяет, является ли параграф горизонтальным разделителем
 */
export const isHr = (text: string): boolean => {
    return /^-{3,}$/.test(text.trim()) || /^\*{3,}$/.test(text.trim());
};
