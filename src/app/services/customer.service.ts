import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Customer } from "../models/customer.model";
import { Observable, map } from "rxjs";

@Injectable()
export class CustomerService {
  customerCollection: AngularFirestoreCollection<Customer>;
  customerDoc: AngularFirestoreDocument<Customer>;
  customers: Observable<Customer[]>;
  customer: Observable<Customer>;

  constructor(private db: AngularFirestore) {
    this.customerCollection = db.collection('customers', ref => ref.orderBy('name', 'asc'));
  }

  getCustomers(): Observable<Customer[]> {
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Customer;
          data.id = action.payload.doc.id;
          return data;
        })
      })
    );

    return this.customers;
  }

  createCustomer(customer: Customer): void {
    this.customerCollection.add(customer);
  }

  getCustomer(id: string) {
    this.customerDoc = this.db.doc<Customer>(`customers/${id}`);
    this.customer = this.customerDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists == false){
          return null;
        } else {
          const data = action.payload.data() as Customer;
          data.id = action.payload.id;
          return data as any;
        }
      })
    );

    return this.customer;
  }
}