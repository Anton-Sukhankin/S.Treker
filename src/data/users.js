export const CURRENT_USER_ID = 'user-current';

export const USERS = [
  {
    id: CURRENT_USER_ID,
    firstName: 'Елена',
    lastName: 'Кузнецова',
    patronymic: 'Константиновна',
    gender: 'female',
    email: 'elena.kuznetsova@s-tracker.local',
    avatarUrl: './avatars/elena-kuznetsova.webp',
    position: 'Менеджер договоров',
    department: 'Договорной отдел',
    isActive: true
  },
  {
    id: 'user-ivan',
    firstName: 'Иван',
    lastName: 'Петров',
    patronymic: 'Павлович',
    gender: 'male',
    email: 'ivan.petrov@s-tracker.local',
    avatarUrl: './avatars/ivan-petrov.webp',
    position: 'Руководитель проекта',
    department: 'Строительный контроль',
    isActive: true
  },
  {
    id: 'user-alex',
    firstName: 'Алексей',
    lastName: 'Смирнов',
    patronymic: 'Сергеевич',
    gender: 'male',
    email: 'alexey.smirnov@s-tracker.local',
    avatarUrl: './avatars/alexey-smirnov.webp',
    position: 'Специалист по закупкам',
    department: 'Закупки ТМЦ',
    isActive: true
  },
  {
    id: 'user-maria',
    firstName: 'Мария',
    lastName: 'Иванова',
    patronymic: 'Игоревна',
    gender: 'female',
    email: 'maria.ivanova@s-tracker.local',
    avatarUrl: './avatars/maria-ivanova.webp',
    position: 'Аналитик договоров',
    department: 'Договорной отдел',
    isActive: true
  },
  {
    id: 'user-dmitry',
    firstName: 'Дмитрий',
    lastName: 'Волков',
    patronymic: 'Викторович',
    gender: 'male',
    email: 'dmitry.volkov@s-tracker.local',
    avatarUrl: './avatars/dmitry-volkov.webp',
    position: 'Инженер контроля',
    department: 'Поручения СД',
    isActive: true
  },
  {
    id: 'user-olga',
    firstName: 'Ольга',
    lastName: 'Николаева',
    patronymic: 'Николаевна',
    gender: 'female',
    email: 'olga.nikolaeva@s-tracker.local',
    avatarUrl: './avatars/olga-nikolaeva.webp',
    position: 'Координатор задач',
    department: 'Операционный офис',
    isActive: true
  },
  {
    id: 'user-sergey',
    firstName: 'Сергей',
    lastName: 'Морозов',
    patronymic: 'Михайлович',
    gender: 'male',
    email: 'sergey.morozov@s-tracker.local',
    avatarUrl: './avatars/sergey-morozov.webp',
    position: 'Главный специалист',
    department: 'Строительный контроль',
    isActive: true
  },
  {
    id: 'user-anna',
    firstName: 'Анна',
    lastName: 'Королева',
    patronymic: 'Кирилловна',
    gender: 'female',
    email: 'anna.koroleva@s-tracker.local',
    avatarUrl: './avatars/anna-koroleva.webp',
    position: 'Специалист по документам',
    department: 'Документооборот',
    isActive: true
  }
];

export function formatUserShortLabel(user) {
  if (!user) return '';
  return `${user.firstName} ${user.lastName.slice(0, 1)}.`;
}

export function formatUserDisplayName(user) {
  if (!user) return '';
  return `${user.lastName} ${user.firstName} ${user.patronymic}`;
}

export function formatUserFullName(user) {
  if (!user) return '';
  return `${user.lastName} ${user.firstName} ${user.patronymic}`;
}

export const USER_DICTIONARY_OPTIONS = USERS.map(user => ({
  id: user.id,
  label: formatUserDisplayName(user)
}));
