/**
 * База данных документов системы ESM
 * Итерация 6.1 (Добавление статусов и дат окончания)
 */

let esmSeed = 20260731;

function esmRandom() {
  esmSeed = (esmSeed * 1664525 + 1013904223) % 4294967296;
  return esmSeed / 4294967296;
}

export const esmDocuments = [
  { 
    docDate: "16.05.2026", 
    number: "180/26", 
    name: "Об организации обработки персональных данных в ООО «Самолет Плюс Гарантия»", 
    lastChange: "17.05.2026", 
    docType: "Приказ", 
    contractor: "ООО Самолет Плюс Гарантия",
    packageId: "ord",
    amount: 0,
    specialist: "Иванов И.И.",
    department: "HR",
    status: "Подписан",
    endDate: "2027-05-16"
  },
  { 
    docDate: "19.05.2026", 
    number: "25/19", 
    name: "Об осуществлении закупки у единственного поставщика СПАО «РЕСО-Гарантия» ДМС", 
    lastChange: "20.05.2026", 
    docType: "Приказ", 
    contractor: "СПАО РЕСО-Гарантия",
    packageId: "a-q1",
    amount: 150000,
    specialist: "Петров П.П.",
    department: "Закупки",
    status: "Согласование",
    endDate: "2026-12-31"
  }
];

// Генерация документов
(function() {
  const contractors = ["Рокетсофт", "Альфа-Групп", "МТС", "Яндекс", "Газпром"];
  const specialists = ["Иванов И.И.", "Николаев Н.Н.", "Степанов С.С.", "Веневцев А."];
  const departments = ["Закупки", "IT", "HR", "Юристы", "Тендерный отдел"];
  const types = ["Приказ", "Договор", "Заявка", "Акт", "Письмо"];
  const statuses = ["Проект", "Согласование", "Подписан", "В архиве"];
  
  const allNodeIds = [
    'a-q1', 'a-q2', 'acts-archive', 'fin-bank', 'cr-sber', 'cr-vtb', 
    'c-order', 'c-viz', 'working-docs', 'expertise', 'rns', 
    'ord', 'hr-docs', 'archive-docs', 'legal-docs', 'tender-docs'
  ];
  
  const nameTemplates = {
    "Приказ": ["Об организации обработки персональных данных", "О назначении ответственных лиц", "О проведении ежегодной инвентаризации", "Об утверждении графика отпусков", "О вводе в эксплуатацию программного обеспечения"],
    "Договор": ["Договор поставки строительных материалов", "Лицензионный договор на использование ПО", "Договор аренды нежилого помещения", "Договор об оказании консультационных услуг", "Договор подряда на выполнение проектных работ"],
    "Заявка": ["Заявка на закупку офисной мебели", "Заявка на предоставление удаленного доступа", "Заявка на проведение технического обслуживания", "Заявка на подбор персонала", "Заявка на командирование сотрудников"],
    "Акт": ["Акт приема-передачи оказанных услуг", "Акт сверки взаимных расчетов", "Акт выполненных работ по этапу №1", "Акт инвентаризации основных средств", "Акт о списании материальных запасов"],
    "Доп. соглашение": ["Дополнительное соглашение об изменении стоимости", "Доп. соглашение о пролонгации сроков", "Дополнительное соглашение к договору аренды", "Доп. соглашение об изменении реквизитов", "Дополнительное соглашение о расширении перечня услуг"],
    "Инструкция": ["Должностная инструкция ведущего специалиста", "Инструкция по технике безопасности на объекте", "Инструкция пользователя СЭД", "Инструкция по пожарной безопасности", "Регламент взаимодействия департаментов"],
    "Письмо": ["Информационное письмо о смене адреса", "Письмо-запрос о предоставлении документов", "Ответ на претензию контрагента", "Письмо о подтверждении сотрудничества", "Сопроводительное письмо к отчету"],
    "Служебная записка": ["Служебная записка о премировании сотрудника", "Служебная записка на приобретение оборудования", "Служебная записка об изменении графика работы", "Служебная записка на ремонт кабинета", "Служебка о необходимости обучения"]
  };

  const getRandomName = (type) => {
      const templates = nameTemplates[type] || ["Общий документ системы"];
      const base = templates[Math.floor(esmRandom() * templates.length)];
      const suffixes = [" (ООО «Вектор»)", " (Проект «Север»)", " за 2026 год", " (срочно)", "", " (редакция 2.1)"];
      return base + suffixes[Math.floor(esmRandom() * suffixes.length)];
  };

  allNodeIds.forEach((pid, idx) => {
    for (let i = 1; i <= 5; i++) {
        const type = types[Math.floor(esmRandom() * types.length)];
        esmDocuments.push({
            docDate: `${10 + i}.${(idx % 12) + 1 > 9 ? '' : '0'}${(idx % 12) + 1}.2026`,
            number: `${300 + idx * 5 + i}/26`,
            name: getRandomName(type),
            lastChange: `${11 + i}.${(idx % 12) + 1 > 9 ? '' : '0'}${(idx % 12) + 1}.2026`,
            docType: type,
            contractor: contractors[Math.floor(esmRandom() * contractors.length)],
            packageId: pid,
            amount: Math.floor(esmRandom() * 500000),
            specialist: specialists[Math.floor(esmRandom() * specialists.length)],
            department: departments[Math.floor(esmRandom() * departments.length)],
            status: statuses[Math.floor(esmRandom() * statuses.length)],
            endDate: `2027-${(idx % 12) + 1 > 9 ? '' : '0'}${(idx % 12) + 1}-01`
        });
    }
  });

  // Добавление 30 дополнительных документов для разнообразия
  for (let i = 1; i <= 30; i++) {
      const pid = allNodeIds[i % allNodeIds.length];
      const type = types[Math.floor(esmRandom() * types.length)];
      esmDocuments.push({
          docDate: `${Math.floor(esmRandom() * 20) + 10}.05.2026`,
          number: `${1000 + i}/26`,
          name: getRandomName(type),
          lastChange: `25.05.2026`,
          docType: type,
          contractor: contractors[Math.floor(esmRandom() * contractors.length)],
          packageId: pid,
          amount: Math.floor(esmRandom() * 1000000),
          specialist: specialists[Math.floor(esmRandom() * specialists.length)],
          department: departments[Math.floor(esmRandom() * departments.length)],
          status: statuses[Math.floor(esmRandom() * statuses.length)],
          endDate: `2027-06-01`
      });
  }

  // Обновление логики связей: у ВСЕХ документов должно быть от 5 до 12 связей
  esmDocuments.forEach((doc, idx) => {
      const others = esmDocuments.filter(d => d.number !== doc.number);
      // Определяем случайное количество связей от 5 до 12 для большего разнообразия
      const count = Math.min(others.length, Math.floor(esmRandom() * 8) + 5);
      
      const relations = others
          .sort(() => 0.5 - esmRandom())
          .slice(0, count)
          .map(d => d.number);
          
      doc.relatedDocs = relations;
  });

    // Итерация 7.1: Добавление признака "Мои документы" / "Доступные мне"
    // Устанавливаем доступность для ~70% документов
    esmDocuments.forEach((doc, idx) => {
        // Делаем первый документ всегда недоступным для наглядности (чтобы было видно сразу)
        if (idx === 0) {
            doc.hasAccess = false;
        } else {
            doc.hasAccess = esmRandom() < 0.7;
        }
        
        doc.myDocument = doc.hasAccess; // Фильтр "Доступные мне" работает по этому полю
        
        // Mock data for additional attributes
        doc.doCode = "DO-00" + (idx + 1);
        doc.docKind = "Договор с физ. лицом";
        doc.isTerminated = esmRandom() > 0.8 ? "Да" : "Нет";
        doc.prepaymentAmount = (Math.floor(esmRandom() * 50) * 1000) + " руб.";
        doc.mainContractNotFound = esmRandom() > 0.9 ? "Да" : "Нет";
        doc.fileName = "document_" + doc.number.replace('/', '_') + ".pdf";
        doc.sectionNumber = "1." + (idx % 5 + 1);
        doc.sectionName = "Общие положения";
        doc.itemNumber = "1.1." + (idx % 3 + 1);
        doc.itemText = "Исполнитель обязуется оказать услуги...";
        doc.bank = "Альфа-Банк";
        doc.traceability = "Да";
        doc.covenantGroup = "Финансовые ковенанты";
        doc.covenantGroupCode = "COV-FIN";
        doc.covenant = "Net Debt/EBITDA < 3.0";
        doc.covenantCode = "FIN-001";
        doc.tagCode = "TAG-" + (idx % 100);
        doc.trigger = "Нарушение срока";
        doc.bankInn = "7701351234";
        doc.orgInn = "7705432100";
    });
})();


