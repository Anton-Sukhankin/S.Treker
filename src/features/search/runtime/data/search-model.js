export const TREE_DATA = [
        {
            id: 'acts',
            name: 'Акты выполненных работ',
            children: [
                { id: 'acts-2026', name: 'Акты 2026', children: [{ id: 'a-q1', name: '1 Квартал' }, { id: 'a-q2', name: '2 Квартал' }] },
                { id: 'acts-archive', name: 'Архив актов' }
            ]
        },
        {
            id: 'fin-docs',
            name: 'Финансовые договоры',
            children: [
                { id: 'fin-bank', name: 'Банковское сопровождение' },
                { id: 'fin-credit', name: 'Кредитные линии', children: [{ id: 'cr-sber', name: 'Сбербанк' }, { id: 'cr-vtb', name: 'ВТБ' }] }
            ]
        },
        {
            id: 'const-docs',
            name: 'Строительная документация',
            children: [
                {
                    id: 'concepts',
                    name: 'Концепции',
                    children: [{ id: 'c-order', name: 'Распоряжение' }, { id: 'c-viz', name: '3D Визуализация' }]
                },
                { id: 'working-docs', name: 'Рабочая документация' },
                {
                    id: 'permits',
                    name: 'Разрешительные документы',
                    children: [{ id: 'expertise', name: 'Экспертиза' }, { id: 'rns', name: 'РНС' }]
                }
            ]
        },
        { id: 'ord', name: 'ОРД (Организационно-распорядительные)' },
        { id: 'hr-docs', name: 'Кадровая документация' },
        { id: 'archive-docs', name: 'Архив проектов' },
        { id: 'legal-docs', name: 'Юридический блок' },
        { id: 'tender-docs', name: 'Тендерные файлы' }
    ];

    export const DOCUMENT_TYPES = [
        'Приказ',
        'Договор',
        'Заявка',
        'Акт',
        'Доп. соглашение',
        'Инструкция',
        'Письмо',
        'Служебная записка'
    ];

    export const COLUMN_ORDER = [
        'date',
        'number',
        'name',
        'changed',
        'type',
        'doCode',
        'docKind',
        'isTerminated',
        'prepaymentAmount',
        'mainContractNotFound',
        'fileName',
        'sectionNumber',
        'sectionName',
        'itemNumber',
        'itemText',
        'bank',
        'traceability',
        'covenantGroup',
        'covenantGroupCode',
        'covenant',
        'covenantCode',
        'tagCode',
        'trigger',
        'bankInn',
        'orgInn'
    ];

export const BASE_STATE = Object.freeze({
    active: ['date', 'number', 'name', 'changed', 'type'],
    pinned: [],
    order: [...COLUMN_ORDER]
});
