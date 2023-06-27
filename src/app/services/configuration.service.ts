import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Configuration } from "../models/configuration.model";
import { Observable } from "rxjs";

@Injectable()
export class ConfigurationService {
  configurationDoc: AngularFirestoreDocument<Configuration>;
  configuration: Observable<Configuration>;
  
  // Unique value
  id: number = 1;

  constructor(private db: AngularFirestore) { }

  getConfiguration(): Observable<Configuration> {
    this.configurationDoc = this.db.doc<Configuration>(`configuration/${this.id}`);
    this.configuration = this.configurationDoc.valueChanges() as any;
    return this.configuration;
  }

  updateConfiguration(configuration: Configuration) {
    this.configurationDoc = this.db.doc<Configuration>(`configuration/${this.id}`);
    this.configurationDoc.update(configuration);
  }
}