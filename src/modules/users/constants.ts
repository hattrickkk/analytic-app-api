// опции для ответа юзера
export const DEFAULT_FIND_USER_OPTIONS = {
  omit: {
    createdAt: true,
    updatedAt: true,
    teacherId: true,
  },
  include: {
    teacher: {
      omit: { createdAt: true, updatedAt: true, positionId: true },
      include: {
        position: {
          select: { code: true, name: true },
        },
      },
    },
  },
};
