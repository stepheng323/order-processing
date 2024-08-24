import { Model } from 'objection';

export default class _baseModel extends Model {
  id: string;
  created_at!: string;
  updated_at!: string;

  $beforeInsert(): void | Promise<any> {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate(): void | Promise<any> {
    this.updated_at = new Date().toISOString();
  }
}
