import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countByStatus', standalone: false })
export class CountByStatusPipe implements PipeTransform {
  transform(items: any[] | null, status: string): number {
    if (!items) return 0;
    return items.filter(item => item.status === status).length;
  }
}

@Pipe({ name: 'countBy', standalone: false })
export class CountByPipe implements PipeTransform {
  transform(items: any[] | null, status: string): number {
    if (!items) return 0;
    return items.filter(item => item.status === status).length;
  }
}
