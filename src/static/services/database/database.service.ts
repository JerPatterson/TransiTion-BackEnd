import { Injectable } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';

@Injectable()
export class DatabaseService {
  private database: Db;
  private client = new MongoClient(process.env.MONGO_URL);

  constructor() {
    this.connectToDB();
  }

  get shapesCollection(): Collection {
    return this.database.collection(process.env.MONGO_SHAPES_COLLECTION);
  }

  get timesCollection(): Collection {
    return this.database.collection(process.env.MONGO_TIMES_COLLECTION);
  }

  private async connectToDB(): Promise<void> {
    try {
      await this.client.connect();
      this.database = this.client.db(process.env.MONGO_NAME);
    } catch {
      throw new Error('Database connection error');
    }
  }
}
