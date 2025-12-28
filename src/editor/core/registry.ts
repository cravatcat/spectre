import type { MaterialDefinition } from './types';

class Registry {
  private materials: Record<string, MaterialDefinition> = {};

  register(material: MaterialDefinition) {
    if (this.materials[material.type]) {
      console.warn(`Material type "${material.type}" is already registered. Overwriting.`);
    }
    this.materials[material.type] = material;
  }

  get(type: string): MaterialDefinition | undefined {
    return this.materials[type];
  }

  getAll(): MaterialDefinition[] {
    return Object.values(this.materials);
  }
}

export const registry = new Registry();
