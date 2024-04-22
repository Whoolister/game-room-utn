import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  saveObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  getObject(key: string): any | null {
    const value: string | null = localStorage.getItem(key)

    return value ? JSON.parse(value) : null
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  isKeySet(key: string): boolean {
    return localStorage.getItem(key) !== null
  }

  private clear(): void {
    localStorage.clear()
  }
}
