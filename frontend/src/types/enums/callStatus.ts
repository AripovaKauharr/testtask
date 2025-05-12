export enum CallStatus {
  completed = "completed",
  rejected = "rejected",
  missed = "missed",
}

export const callStatuses = {
  [CallStatus.completed]: "Завершен",
  [CallStatus.rejected]: "Отклонен",
  [CallStatus.missed]: "Пропущен",
};