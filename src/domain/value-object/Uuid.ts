export class Uuid {
  constructor(
    private readonly value: string,
  ) {
    // Validar que el valor es un UUID válido
    if (!Uuid.isValid(value)) {
      throw new Error(`Invalid UUID value: ${value}`);
    }

    this.value = value;
  }

  // Validar si un valor es un UUID válido
  static isValid(value: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(value);
  }

  // Obtener el valor del UUID
  getValue(): string {
    return this.value;
  }

  // Comparar dos UUIDs para determinar si son iguales
  equals(uuid: Uuid): boolean {
    return this.value === uuid.getValue();
  }
}
