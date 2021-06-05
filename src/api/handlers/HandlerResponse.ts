export function success (message: string, data: any) {
  return {
    success: true,
    message: message,
    errors: [],
    content: data
  }
}

export function error (message: string, errors = []) {
  return {
    success: false,
    message: message,
    errors: errors,
    content: []
  }
}
