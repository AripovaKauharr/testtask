import { CallStatus, callStatuses } from "../types/enums/callStatus"

export const formatCallStatus = (status: CallStatus): string => {
  return callStatuses[status]

}