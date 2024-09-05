import { Action } from "@prisma/client";

export function generateLogMessage({ action, entityTitle, entityType }) {

  switch (action) {
    case Action.CREATE:
      return `created ${entityType.toLowerCase()} "${entityTitle}"`

    case Action.UPDATE:
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`

    case Action.DELETE:
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`

    default:
      return `uknown action ${entityType.toLowerCase()} "${entityTitle}"`

  }
}